Add-Type -AssemblyName System.Drawing
$source=[System.Drawing.Bitmap]::new((Join-Path $PWD 'public/assets/mood-faces/angry-reference.png'))
$faces=@(
 ,@('angry-v2',330,195,510,460,580,800)
)
foreach($f in $faces){
 $bg=$source.GetPixel($f[5],$f[6]);$ink=$bg;$max=0
 for($y=0;$y -lt $f[4];$y++){for($x=0;$x -lt $f[3];$x++){$c=$source.GetPixel($f[1]+$x,$f[2]+$y);$d=($bg.R-$c.R)+($bg.G-$c.G)+($bg.B-$c.B);if($d -gt $max){$max=$d;$ink=$c}}}
 $bitmap=[System.Drawing.Bitmap]::new($f[3],$f[4],[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
 $dr=[double]($bg.R-$ink.R);$dg=[double]($bg.G-$ink.G);$db=[double]($bg.B-$ink.B);$den=$dr*$dr+$dg*$dg+$db*$db
 for($y=0;$y -lt $f[4];$y++){for($x=0;$x -lt $f[3];$x++){
 $c=$source.GetPixel($f[1]+$x,$f[2]+$y);$alpha=[Math]::Clamp((($bg.R-$c.R)*$dr+($bg.G-$c.G)*$dg+($bg.B-$c.B)*$db)/$den,0,1)
 if($alpha -lt .035){$alpha=0};$bitmap.SetPixel($x,$y,[System.Drawing.Color]::FromArgb([int]($alpha*255),$ink.R,$ink.G,$ink.B))
 }}
 $bitmap.Save((Join-Path $PWD ('public/assets/mood-faces/'+$f[0]+'.png')),[System.Drawing.Imaging.ImageFormat]::Png);$bitmap.Dispose()
}
$source.Dispose()
