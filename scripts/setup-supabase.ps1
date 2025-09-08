# Script de configuration Supabase pour RAWRAGENCY
# Exécutez ce script après avoir configuré votre projet Supabase

Write-Host "🚀 Configuration Supabase pour RAWRAGENCY" -ForegroundColor Green

# Vérifier si .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Fichier .env.local manquant!" -ForegroundColor Red
    Write-Host "📝 Créez d'abord le fichier .env.local avec vos informations Supabase" -ForegroundColor Yellow
    Write-Host "📖 Consultez SUPABASE-SETUP.md pour les instructions détaillées" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Fichier .env.local trouvé" -ForegroundColor Green

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Blue
npm install

# Générer le client Prisma
Write-Host "🔧 Génération du client Prisma..." -ForegroundColor Blue
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la génération du client Prisma" -ForegroundColor Red
    exit 1
}

# Appliquer le schéma à Supabase
Write-Host "🗄️ Application du schéma à Supabase..." -ForegroundColor Blue
npx prisma db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'application du schéma" -ForegroundColor Red
    Write-Host "🔍 Vérifiez votre DATABASE_URL dans .env.local" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Schéma appliqué avec succès!" -ForegroundColor Green

# Optionnel: Seeder
$seed = Read-Host "Voulez-vous exécuter le seeder initial? (y/N)"
if ($seed -eq "y" -or $seed -eq "Y") {
    Write-Host "🌱 Exécution du seeder..." -ForegroundColor Blue
    npx prisma db seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Seeder exécuté avec succès!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Erreur lors du seeder (non critique)" -ForegroundColor Yellow
    }
}

Write-Host "🎉 Configuration Supabase terminée!" -ForegroundColor Green
Write-Host "🚀 Vous pouvez maintenant lancer: npm run dev" -ForegroundColor Cyan
