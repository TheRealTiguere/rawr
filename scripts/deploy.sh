#!/bin/bash

# Script de déploiement RAWRAGENCY
echo "🚀 Déploiement RAWRAGENCY en cours..."

# Vérifier que les variables d'environnement sont définies
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERREUR: DATABASE_URL n'est pas définie"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ ERREUR: JWT_SECRET n'est pas définie"
    exit 1
fi

echo "✅ Variables d'environnement vérifiées"

# Build de l'application
echo "🔨 Construction de l'application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Échec de la construction"
    exit 1
fi

echo "✅ Application construite avec succès"

# Génération du client Prisma
echo "🗄️ Génération du client Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Échec de la génération Prisma"
    exit 1
fi

echo "✅ Client Prisma généré"

# Application des migrations
echo "🔄 Application des migrations..."
npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Échec des migrations"
    exit 1
fi

echo "✅ Migrations appliquées"

# Seed de l'admin si nécessaire
echo "👤 Vérification de l'utilisateur admin..."
npx tsx prisma/seed.ts

echo "🎉 Déploiement terminé avec succès !"
echo "🌐 L'application est prête à être lancée"
