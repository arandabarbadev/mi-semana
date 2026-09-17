Add-Type -AssemblyName System.Drawing

# Colores de la app
$fondo   = [System.Drawing.Color]::FromArgb(255, 13, 16, 23)    # #0d1017
$borde   = [System.Drawing.Color]::FromArgb(255, 38, 44, 58)     # #262c3a
$morado  = [System.Drawing.Color]::FromArgb(255, 124, 92, 255)   # #7c5cff
$texto   = [System.Drawing.Color]::FromArgb(255, 232, 235, 244)  # #e8ebf4

# Helper: rectangulo redondeado como GraphicsPath
function New-RoundRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p.AddArc($x, $y, $r, $r, 180, 90)
    $p.AddArc($x + $w - $r, $y, $r, $r, 270, 90)
    $p.AddArc($x + $w - $r, $y + $h - $r, $r, $r, 0, 90)
    $p.AddArc($x, $y + $h - $r, $r, $r, 90, 90)
    $p.CloseFigure()
    return $p
}

# Dibuja el calendario con el 7 sobre un bitmap de $tam x $tam.
# $completo = $true -> fondo cuadrado sin transparencia (maskable / apple)
function New-Icono([int]$tam, [bool]$completo) {
    $escala = $tam / 512.0
    $bmp = New-Object System.Drawing.Bitmap($tam, $tam)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    if ($completo) {
        $g.Clear($fondo)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
        # fondo redondeado con borde sutil
        $r = 115 * $escala
        $fondoPath = New-RoundRect ($r/2) ($r/2) ($tam - $r) ($tam - $r) $r
        $bgBrush = New-Object System.Drawing.SolidBrush($fondo)
        $g.FillPath($bgBrush, $fondoPath)
        $pen = New-Object System.Drawing.Pen($borde, (3 * $escala))
        $g.DrawPath($pen, $fondoPath)
        $fondoPath.Dispose(); $bgBrush.Dispose(); $pen.Dispose()
    }

    # Margen: en modo completo dejamos zona segura (el motivo se centra en ~82%)
    $m = if ($completo) { 0.09 * $tam } else { 0 }
    $cx = $tam / 2.0

    # Cabecera morada del calendario (barra redondeada)
    $barraW = 0.66 * ($tam - 2 * $m)
    $barraH = 0.062 * ($tam - 2 * $m)
    $barraY = $m + 0.145 * ($tam - 2 * $m)
    $barraPath = New-RoundRect ($cx - $barraW / 2) $barraY $barraW $barraH ($barraH / 2)
    $moradoBrush = New-Object System.Drawing.SolidBrush($morado)
    $g.FillPath($moradoBrush, $barraPath)
    $barraPath.Dispose()

    # Dos anillas encima de la cabecera
    $anW = 0.062 * ($tam - 2 * $m)
    $anH = 0.125 * ($tam - 2 * $m)
    $anY = $barraY - 0.072 * ($tam - 2 * $m)
    foreach ($dx in @(-0.155, 0.155)) {
        $anPath = New-RoundRect ($cx + $dx * ($tam - 2 * $m) - $anW / 2) $anY $anW $anH ($anW / 2)
        $g.FillPath($moradoBrush, $anPath)
        $anPath.Dispose()
    }
    $moradoBrush.Dispose()

    # El 7 grande, centrado bajo la cabecera
    $fontSize = [int](0.62 * ($tam - 2 * $m))
    $font = New-Object System.Drawing.Font('Segoe UI', $fontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF(0, ($barraY + $barraH), $tam, ($tam - $barraY - $barraH - $m))
    $textoBrush = New-Object System.Drawing.SolidBrush($texto)
    $g.DrawString('7', $font, $textoBrush, $rect, $sf)
    $font.Dispose(); $textoBrush.Dispose(); $sf.Dispose()

    $g.Dispose()
    return $bmp
}

$out = "C:\Users\Usuario\mi-semana"
New-Icono 512 $false | ForEach-Object { $_.Save("$out\icono-512.png", [System.Drawing.Imaging.ImageFormat]::Png); $_.Dispose() }
New-Icono 512 $true  | ForEach-Object { $_.Save("$out\icono-512-maskable.png", [System.Drawing.Imaging.ImageFormat]::Png); $_.Dispose() }
New-Icono 192 $false | ForEach-Object { $_.Save("$out\icono-192.png", [System.Drawing.Imaging.ImageFormat]::Png); $_.Dispose() }
New-Icono 180 $true  | ForEach-Object { $_.Save("$out\icono-180.png", [System.Drawing.Imaging.ImageFormat]::Png); $_.Dispose() }

Get-ChildItem "$out\icono-*.png" | Select-Object Name, Length
