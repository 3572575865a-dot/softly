Add-Type -AssemblyName System.Drawing
$source=[System.Drawing.Bitmap]::new((Join-Path $PWD 'public/assets/mood-faces/reference.png'))
$faces=@(
 @('happy',134,66,96,59,180,150),@('calm',340,91,105,43,393,150),@('energetic',550,68,125,58,619,145),
 @('content',141,228,96,47,187,305),@('playful',354,233,87,53,392,308),@('sleepy',584,244,104,52,629,305),
 @('stressed',141,417,84,67,190,489),@('numb',347,432,89,49,394,490),@('tired',568,441,100,56,629,497),
 @('sad',143,577,77,74,188,650),@('worried',376,570,85,57,394,650),@('angry',581,555,85,72,631,650)
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
