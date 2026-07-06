Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $projectRoot "public\og-homepage.png"
$logoPath = Join-Path $projectRoot "public\grass-logo.png"

$width = 1200
$height = 630

function ColorFromHex($hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function RoundedRectanglePath($x, $y, $w, $h, $radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $w - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $w - $diameter, $y + $h - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $h - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function FillRoundedRectangle($graphics, $brush, $x, $y, $w, $h, $radius) {
  $path = RoundedRectanglePath $x $y $w $h $radius
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

function DrawRoundedRectangle($graphics, $pen, $x, $y, $w, $h, $radius) {
  $path = RoundedRectanglePath $x $y $w $h $radius
  $graphics.DrawPath($pen, $path)
  $path.Dispose()
}

function DrawText($graphics, $text, $fontName, $size, $style, $color, $x, $y, $w, $h) {
  $font = New-Object System.Drawing.Font($fontName, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush($color)
  $format = New-Object System.Drawing.StringFormat
  $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $format.FormatFlags = [System.Drawing.StringFormatFlags]::LineLimit
  $graphics.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $format)
  $format.Dispose()
  $brush.Dispose()
  $font.Dispose()
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$bounds = [System.Drawing.Rectangle]::new(0, 0, $width, $height)
$background = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bounds, (ColorFromHex "#07100b"), (ColorFromHex "#152318"), 38)
$graphics.FillRectangle($background, $bounds)

$glowGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(42, 166, 255, 77))
$glowSoft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 183, 244, 93))
$graphics.FillEllipse($glowGreen, 780, -170, 560, 560)
$graphics.FillEllipse($glowSoft, -180, 350, 520, 520)

$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(42, 166, 255, 77), 1)
for ($i = 0; $i -lt 6; $i++) {
  $offset = $i * 82
  $graphics.DrawLine($linePen, 0, 120 + $offset, $width, 36 + $offset)
}

$paper = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(238, 16, 25, 18))
$panel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(232, 239, 248, 237))
$softPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(23, 166, 255, 77))
$green = ColorFromHex "#a6ff4d"
$greenDark = ColorFromHex "#172019"
$muted = ColorFromHex "#aeb8b0"
$white = ColorFromHex "#eff8ed"

FillRoundedRectangle $graphics $paper 52 46 1096 538 26
DrawRoundedRectangle $graphics (New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(46, 166, 255, 77), 1)) 52 46 1096 538 26

FillRoundedRectangle $graphics (New-Object System.Drawing.SolidBrush($green)) 92 86 58 58 15
if (Test-Path $logoPath) {
  $logo = [System.Drawing.Image]::FromFile($logoPath)
  $graphics.DrawImage($logo, 106, 100, 31, 31)
  $logo.Dispose()
}
DrawText $graphics "Airdrop Atlas" "Segoe UI" 31 ([System.Drawing.FontStyle]::Bold) $white 166 84 320 40
DrawText $graphics "Independent airdrop research" "Segoe UI" 18 ([System.Drawing.FontStyle]::Regular) $muted 168 121 360 30

DrawText $graphics "One hub for" "Segoe UI" 70 ([System.Drawing.FontStyle]::Bold) $white 92 183 560 82
DrawText $graphics "airdrop estimates." "Segoe UI" 70 ([System.Drawing.FontStyle]::Bold) $green 92 258 650 86
DrawText $graphics "Transparent allocation models for supported airdrop projects. Start with the live Grass checker." "Segoe UI" 25 ([System.Drawing.FontStyle]::Regular) $muted 96 365 650 92

FillRoundedRectangle $graphics (New-Object System.Drawing.SolidBrush($green)) 96 480 268 58 12
DrawText $graphics "Browse checkers" "Segoe UI" 23 ([System.Drawing.FontStyle]::Bold) $greenDark 126 494 220 34
DrawRoundedRectangle $graphics (New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 166, 255, 77), 2)) 384 480 275 58 12
DrawText $graphics "Open Grass checker" "Segoe UI" 21 ([System.Drawing.FontStyle]::Bold) $white 414 496 230 30

FillRoundedRectangle $graphics $softPanel 740 112 340 390 22
DrawRoundedRectangle $graphics (New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(70, 166, 255, 77), 1)) 740 112 340 390 22
DrawText $graphics "Grass" "Segoe UI" 27 ([System.Drawing.FontStyle]::Bold) $white 780 152 180 38
DrawText $graphics "S2 allocation checker" "Segoe UI" 18 ([System.Drawing.FontStyle]::Regular) $muted 780 188 240 30

$barBack = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(37, 239, 248, 237))
$barFill = New-Object System.Drawing.SolidBrush($green)
$barWidths = @(235, 185, 278, 220)
for ($i = 0; $i -lt 4; $i++) {
  $y = 242 + ($i * 47)
  FillRoundedRectangle $graphics $barBack 780 $y 250 14 7
  FillRoundedRectangle $graphics $barFill 780 $y $barWidths[$i] 14 7
}

FillRoundedRectangle $graphics (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(242, 5, 9, 6))) 780 433 248 48 12
DrawText $graphics "Projected GRASS allocation" "Segoe UI" 14 ([System.Drawing.FontStyle]::Regular) $muted 802 441 210 18
DrawText $graphics "20 uptime epochs" "Segoe UI" 20 ([System.Drawing.FontStyle]::Bold) $green 802 459 200 26

$featureY = 548
DrawText $graphics "Project inputs" "Segoe UI" 17 ([System.Drawing.FontStyle]::Bold) $white 95 $featureY 180 26
DrawText $graphics "Clear calculation" "Segoe UI" 17 ([System.Drawing.FontStyle]::Bold) $white 345 $featureY 200 26
DrawText $graphics "Privacy first" "Segoe UI" 17 ([System.Drawing.FontStyle]::Bold) $white 615 $featureY 160 26

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$background.Dispose()
$glowGreen.Dispose()
$glowSoft.Dispose()
$linePen.Dispose()
$paper.Dispose()
$panel.Dispose()
$softPanel.Dispose()
$barBack.Dispose()
$barFill.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Generated $outputPath"
