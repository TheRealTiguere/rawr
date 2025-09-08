# 🗄️ Configuration Supabase pour RAWRAGENCY

## 📋 Étapes de configuration

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur **"New Project"**
4. Choisissez votre organisation
5. Nom du projet : `rawragency`
6. Mot de passe : `[choisissez un mot de passe fort]`
7. Région : `Europe West (Paris)` ou `Europe West (London)`
8. Cliquez sur **"Create new project"**

### 2. Récupérer les informations de connexion

1. Dans votre projet Supabase → **Settings** → **Database**
2. Copiez la **Connection string** (URI de connexion)
3. Elle ressemble à : `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` avec :

```bash
# Base de données Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# SMTP Configuration - RAWRAGENCY
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="votre-mot-de-passe-email"
TO_EMAIL="contact@rawragency.fr"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Production
NODE_ENV="development"
```

### 4. Générer et appliquer le schéma Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma à Supabase
npx prisma db push

# (Optionnel) Seeder initial
npx prisma db seed
```

### 5. Vérifier la connexion

```bash
# Tester la connexion
npx prisma studio
```

## 🔧 Configuration Vercel

Dans **Vercel Dashboard** → **Settings** → **Environment Variables**, ajoutez :

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-production
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe-email
TO_EMAIL=contact@rawragency.fr
NEXTAUTH_URL=https://votre-app.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-production
NODE_ENV=production
```

## 🚀 Avantages de Supabase

- ✅ **PostgreSQL** performant et fiable
- ✅ **Interface web** pour gérer la base
- ✅ **Backup automatique**
- ✅ **Scaling automatique**
- ✅ **Gratuit** jusqu'à 500MB
- ✅ **API REST** automatique
- ✅ **Authentification** intégrée (optionnel)

## 📊 Monitoring

- **Dashboard Supabase** : Gestion des données
- **Logs** : Monitoring des requêtes
- **Métriques** : Performance et usage

## 🔐 Sécurité

- **SSL** automatique
- **Firewall** configurable
- **Row Level Security** (RLS) disponible
- **Backup** quotidien

---

**Votre base de données sera prête en quelques minutes !** 🎉
