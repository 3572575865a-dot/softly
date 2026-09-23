import http from 'node:http';
import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    const size=(await stat(file)).size,type=({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.mp3':'audio/mpeg','.wav':'audio/wav'})[path.extname(file)]||'application/octet-stream',range=req.headers.range;
    if(range){const match=/bytes=(\d*)-(\d*)/.exec(range);const start=Math.min(Number(match?.[1]||0),Math.max(0,size-1)),end=Math.min(Number(match?.[2]||size-1),size-1);if(!match||start>end){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return;}res.writeHead(206,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);return;}
    res.writeHead(200,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Length':size});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(4173, '0.0.0.0', () => console.log('Softly is running at http://localhost:4173'));
