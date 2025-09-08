#!/bin/bash

# Script de build pour Vercel
echo "🚀 Build RAWRAGENCY pour Vercel..."

# Générer le client Prisma
echo "🗄️ Génération du client Prisma..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Échec de la génération Prisma"
    exit 1
fi

echo "✅ Client Prisma généré"

# Build de l'application
echo "🔨 Construction de l'application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ ERREUR: Échec de la construction"
    exit 1
fi

echo "✅ Application construite avec succès"
echo "🎉 Build terminé !"
