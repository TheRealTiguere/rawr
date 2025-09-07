# Script de nettoyage RAWRAGENCY
Write-Host "🧹 Nettoyage du projet RAWRAGENCY..." -ForegroundColor Green

# Supprimer les fichiers de cache Next.js
if (Test-Path ".next") {
    Write-Host "🗑️ Suppression du cache Next.js..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Cache Next.js supprimé" -ForegroundColor Green
} else {
    Write-Host "✅ Pas de cache Next.js à supprimer" -ForegroundColor Green
}

# Supprimer les fichiers TypeScript build info
Get-ChildItem -Path "." -Filter "*.tsbuildinfo" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

# Supprimer les logs
Get-ChildItem -Path "." -Filter "*debug.log*" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

Get-ChildItem -Path "." -Filter "*error.log*" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

# Supprimer les fichiers temporaires
Get-ChildItem -Path "." -Filter "*.tmp" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

# Supprimer les fichiers de sauvegarde
Get-ChildItem -Path "." -Filter "*.bak" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

# Supprimer les fichiers système Windows
Get-ChildItem -Path "." -Filter "Thumbs.db" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

Get-ChildItem -Path "." -Filter "Desktop.ini" -Recurse | ForEach-Object {
    Write-Host "🗑️ Suppression de $($_.Name)..." -ForegroundColor Yellow
    Remove-Item $_.FullName -Force
}

Write-Host "🎉 Nettoyage terminé !" -ForegroundColor Green
Write-Host "✨ Projet nettoyé et optimisé" -ForegroundColor Cyan
