# 🚀 Déploiement RAWRAGENCY sur Vercel

## 🎯 Pourquoi Vercel ?

- ✅ **Optimisé pour Next.js** (créé par la même équipe)
- ✅ **Déploiement automatique** depuis Git
- ✅ **HTTPS automatique** et CDN mondial
- ✅ **Scaling automatique** et performance
- ✅ **Gratuit** pour votre usage
- ✅ **Domaine personnalisé** rawragency.fr

## 📋 Étapes de déploiement

### 1. Préparer le repository Git

```bash
# Ajouter tous les fichiers
git add .

# Commit avec un message descriptif
git commit -m "feat: Complete RAWRAGENCY website with SEO, reCAPTCHA, email"

# Pousser sur GitHub/GitLab
git push origin main
```

### 2. Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec **GitHub** (recommandé)
3. Autorisez Vercel à accéder à vos repositories

### 3. Importer votre projet

1. Cliquez sur **"New Project"**
2. Sélectionnez votre repository **RAWRAGENCY**
3. Vercel détecte automatiquement Next.js ✅
4. Cliquez sur **"Deploy"**

### 4. Configuration automatique

Vercel configure automatiquement :
- ✅ **Framework** : Next.js
- ✅ **Build Command** : `npm run build`
- ✅ **Output Directory** : `.next`
- ✅ **Install Command** : `npm install`

## 🔧 Variables d'environnement

Dans **Vercel Dashboard → Settings → Environment Variables**, ajoutez :

### Variables de base
```bash
NODE_ENV=production
NEXTAUTH_URL=https://votre-app.vercel.app
NEXTAUTH_SECRET=votre-nextauth-secret-production-tres-long
JWT_SECRET=votre-jwt-secret-production-tres-long
```

### Configuration email (O2Switch SMTP)
```bash
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe-email
TO_EMAIL=contact@rawragency.fr
```

### reCAPTCHA Google
```bash
RECAPTCHA_SECRET_KEY=votre-secret-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre-site-key
```

### Base de données (choisir une option)

**Option A : Vercel Postgres (Recommandé)**
```bash
# Vercel génère automatiquement ces variables
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
```

**Option B : Supabase (Gratuit)**
```bash
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

**Option C : PlanetScale (MySQL)**
```bash
DATABASE_URL=mysql://[user]:[password]@[host]/[database]?sslaccept=strict
```

## 🗄️ Configuration de la base de données

### Option A : Vercel Postgres

1. Dans votre projet Vercel → **Storage**
2. Cliquez sur **"Create Database"**
3. Choisissez **"Postgres"**
4. Les variables sont automatiquement ajoutées

### Option B : Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez la **Database URL** dans les variables Vercel

### Migration de la base

Après avoir configuré la base, dans votre terminal local :

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma
npx prisma db push

# (Optionnel) Seed initial
npx prisma db seed
```

## 🔐 Configuration reCAPTCHA

1. Allez sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Créez un nouveau site :
   - **Type** : reCAPTCHA v3
   - **Domaines** : 
     - `votre-app.vercel.app`
     - `rawragency.fr` (si domaine personnalisé)
3. Copiez les clés dans les variables Vercel

## 🌐 Domaine personnalisé

### Configurer rawragency.fr

1. **Dans Vercel** → Settings → Domains
2. Ajoutez `rawragency.fr` et `www.rawragency.fr`
3. Vercel vous donne les enregistrements DNS

### Configurer chez O2Switch

Dans votre panel O2Switch → **Gestion DNS** :

```
Type    Nom     Valeur
A       @       76.76.19.61 (IP fournie par Vercel)
CNAME   www     cname.vercel-dns.com
```

## 🚀 Déploiement automatique

Une fois configuré, **chaque push Git** déclenche automatiquement :
1. ✅ **Build** de votre application
2. ✅ **Tests** automatiques
3. ✅ **Déploiement** en production
4. ✅ **Invalidation** du cache CDN

## 📊 Monitoring et Analytics

Vercel fournit automatiquement :
- 📈 **Analytics** de performance
- 🔍 **Logs** en temps réel
- 📊 **Métriques** Web Vitals
- 🚨 **Alertes** d'erreur

## 🧪 Test de votre déploiement

1. **Page d'accueil** : https://votre-app.vercel.app
2. **Formulaire de contact** : Test d'envoi d'email
3. **Admin** : https://votre-app.vercel.app/admin
4. **Pages légales** : /legal, /privacy
5. **SEO** : Vérifiez les métadonnées
6. **Performance** : Test Lighthouse

## 🔧 Dépannage

### Build échoue
- Vérifiez les **logs de build** dans Vercel
- Assurez-vous que `npm run build` fonctionne localement

### Variables d'environnement
- Vérifiez qu'elles sont bien définies dans Vercel
- Les variables `NEXT_PUBLIC_*` sont publiques
- Redéployez après avoir ajouté des variables

### Base de données
```bash
# Régénérer le client Prisma
npx prisma generate

# Recréer le schéma
npx prisma db push --force-reset
```

### Domaine personnalisé
- Vérifiez la configuration DNS
- Attendez la propagation (jusqu'à 48h)
- Utilisez [DNS Checker](https://dnschecker.org)

## 📧 Configuration email

Votre configuration SMTP O2Switch fonctionnera parfaitement avec Vercel :

```bash
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe
```

## 🎉 Résultat final

Votre site sera accessible sur :
- 🌐 **https://votre-app.vercel.app** (URL Vercel)
- 🌐 **https://rawragency.fr** (domaine personnalisé)

Avec toutes les fonctionnalités :
- ✅ **Performance optimale** (CDN mondial)
- ✅ **SEO parfait** (métadonnées, sitemap, robots.txt)
- ✅ **Formulaire de contact** avec emails
- ✅ **reCAPTCHA** de sécurité
- ✅ **Admin dashboard**
- ✅ **HTTPS automatique**
- ✅ **Déploiement continu**

---

**Votre site RAWRAGENCY sera en ligne en quelques minutes !** 🚀
