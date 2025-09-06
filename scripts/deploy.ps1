# Script de déploiement RAWRAGENCY pour Windows
Write-Host "🚀 Déploiement RAWRAGENCY en cours..." -ForegroundColor Green

# Vérifier que les variables d'environnement sont définies
if (-not $env:DATABASE_URL) {
    Write-Host "❌ ERREUR: DATABASE_URL n'est pas définie" -ForegroundColor Red
    exit 1
}

if (-not $env:JWT_SECRET) {
    Write-Host "❌ ERREUR: JWT_SECRET n'est pas définie" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Variables d'environnement vérifiées" -ForegroundColor Green

# Build de l'application
Write-Host "🔨 Construction de l'application..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec de la construction" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Application construite avec succès" -ForegroundColor Green

# Génération du client Prisma
Write-Host "🗄️ Génération du client Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec de la génération Prisma" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Client Prisma généré" -ForegroundColor Green

# Application des migrations
Write-Host "🔄 Application des migrations..." -ForegroundColor Yellow
npx prisma migrate deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec des migrations" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Migrations appliquées" -ForegroundColor Green

# Seed de l'admin si nécessaire
Write-Host "👤 Vérification de l'utilisateur admin..." -ForegroundColor Yellow
npx tsx prisma/seed.ts

Write-Host "🎉 Déploiement terminé avec succès !" -ForegroundColor Green
Write-Host "🌐 L'application est prête à être lancée" -ForegroundColor Green
