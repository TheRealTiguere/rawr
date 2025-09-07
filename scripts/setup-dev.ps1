# Script de configuration du développement local RAWRAGENCY
Write-Host "🔧 Configuration du développement local RAWRAGENCY..." -ForegroundColor Green

# Vérifier que Node.js est installé
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ ERREUR: Node.js n'est pas installé" -ForegroundColor Red
    Write-Host "📥 Téléchargez Node.js depuis: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js détecté: $(node --version)" -ForegroundColor Green

# Vérifier que npm est installé
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ ERREUR: npm n'est pas installé" -ForegroundColor Red
    exit 1
}

Write-Host "✅ npm détecté: $(npm --version)" -ForegroundColor Green

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec de l'installation des dépendances" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dépendances installées" -ForegroundColor Green

# Copier le fichier d'environnement
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Création du fichier .env.local..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env.local"
    Write-Host "✅ Fichier .env.local créé" -ForegroundColor Green
    Write-Host "⚠️  N'oubliez pas de configurer vos variables d'environnement !" -ForegroundColor Yellow
} else {
    Write-Host "✅ Fichier .env.local existe déjà" -ForegroundColor Green
}

# Générer le client Prisma
Write-Host "🗄️ Génération du client Prisma..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec de la génération Prisma" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Client Prisma généré" -ForegroundColor Green

# Pousser le schéma vers la base de données
Write-Host "🗄️ Configuration de la base de données..." -ForegroundColor Yellow
npx prisma db push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Échec de la configuration de la base de données" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Base de données configurée" -ForegroundColor Green

# Vérifier le linting (optionnel)
Write-Host "🔍 Vérification du linting..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Avertissement: Problèmes de linting détectés (non bloquant)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Linting OK" -ForegroundColor Green
}

Write-Host "🎉 Configuration terminée avec succès !" -ForegroundColor Green
Write-Host "🚀 Vous pouvez maintenant lancer l'application avec: npm run dev" -ForegroundColor Green
Write-Host "📚 Consultez le README.md pour plus d'informations" -ForegroundColor Cyan
