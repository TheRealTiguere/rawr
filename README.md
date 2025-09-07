# 🦾 RAWRAGENCY - Agence Web Moderne

Site vitrine professionnel avec design glassmorphism, background bokeh animé et système de contact intégré.

## 🚀 **Technologies**

- **Next.js 14** + TypeScript + TailwindCSS
- **Prisma ORM** + SQLite (dev) / PostgreSQL (prod)
- **Authentification JWT** sécurisée
- **Email SMTP** avec Nodemailer
- **Déploiement** Docker + Vercel ready

## ✨ **Fonctionnalités**

- 🎨 **Design moderne** : Glassmorphism + background bokeh animé
- 📱 **Responsive** : Mobile-first, optimisé tous écrans
- 📧 **Contact intégré** : Formulaire avec envoi SMTP
- 🛡️ **Sécurisé** : Validation Zod, anti-spam, variables env
- 👤 **Admin dashboard** : Gestion des demandes, export CSV
- 🚀 **Performance** : Optimisé Lighthouse, animations fluides

## 🛠️ **Installation Rapide**

### 1️⃣ **Setup automatique** (Windows)
```bash
git clone https://github.com/TheRealTiguere/rawr.git
cd rawr
./scripts/setup-dev.ps1
```

### 2️⃣ **Setup manuel**
```bash
# Installation
npm install

# Configuration
copy env.example .env.local
# ⚠️ Modifiez .env.local avec vos paramètres SMTP

# Base de données
npx prisma db push
npx prisma generate

# Lancement
npm run dev
```

## 📧 **Configuration Email**

Dans `.env.local` :
```env
# SMTP Configuration
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="votre-mot-de-passe"
TO_EMAIL="contact@rawragency.fr"
```

> 📖 Guide complet : `EMAIL-SETUP.md`

## 🎯 **Structure du Projet**

```
├── app/                    # Pages Next.js 14
│   ├── api/               # API Routes
│   ├── admin/             # Dashboard admin
│   └── globals.css        # Styles globaux + animations
├── components/            # Composants React
├── lib/                   # Utilitaires (auth, email, db)
├── prisma/               # Schéma base de données
├── public/               # Assets statiques
└── scripts/              # Scripts d'automatisation
```

## 🚀 **Déploiement**

### **Vercel** (Recommandé)
```bash
# Push sur GitHub puis connecter à Vercel
# Variables d'environnement à configurer :
DATABASE_URL=postgresql://...
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=***
```

### **Docker**
```bash
# Production
docker-compose -f docker-compose.prod.yml up -d

# Développement
docker-compose up -d
```

## 🔧 **Scripts Disponibles**

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Linting ESLint

# Base de données
npm run db:generate  # Générer client Prisma
npm run db:push      # Pousser schéma
npm run db:studio    # Interface Prisma Studio

# Scripts PowerShell
./scripts/setup-dev.ps1   # Configuration automatique
./scripts/clean.ps1       # Nettoyage projet
./scripts/deploy.ps1      # Déploiement production
```

## 🛡️ **Sécurité**

- ✅ Variables d'environnement protégées
- ✅ Validation stricte avec Zod
- ✅ Protection anti-spam honeypot
- ✅ JWT httpOnly cookies
- ✅ Rate limiting API
- ✅ Headers sécurisés

> 📖 Guide sécurité : `SECURITY.md`

## 🎨 **Design System**

### **Couleurs**
- **Background** : Bokeh animé (bleu, violet, orange, rouge)
- **Accents** : Ambre/Orange (#f59e0b → #ea580c)
- **Glassmorphism** : `bg-white/10 backdrop-blur-md`

### **Animations**
- **Background** : Bokeh flottant (35s cycle)
- **Interactions** : Hover effects, transitions fluides
- **Performance** : `will-change`, `transform3d`

## 📞 **Support**

- **Email** : contact@rawragency.fr
- **Documentation** : Fichiers `*.md` du projet
- **Issues** : GitHub Issues

---

**Made with ❤️ by RAWRAGENCY**  
*Votre présence digitale exceptionnelle*