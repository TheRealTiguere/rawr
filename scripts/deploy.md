# 🚀 Guide de déploiement RAWRAGENCY sur O2Switch

## Méthode recommandée : Vercel + Domaine O2Switch

### 1. Préparation

1. **Commitez vos changements :**
```bash
git add .
git commit -m "feat: SEO optimization, reCAPTCHA v3, email templates"
git push origin test
```

2. **Créez une branche main :**
```bash
git checkout -b main
git push origin main
```

### 2. Déploiement Vercel

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Connectez votre GitHub/GitLab**
3. **Cliquez sur "New Project"**
4. **Importez votre repository RAWRAGENCY**
5. **Configurez :**
   - Framework Preset : Next.js
   - Build Command : `npm run build`
   - Output Directory : `.next`

### 3. Variables d'environnement Vercel

Dans les settings de votre projet Vercel, ajoutez :

```bash
# Base de données (PostgreSQL recommandé pour la production)
DATABASE_URL=postgresql://user:password@host:port/rawragency

# SMTP O2Switch
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe-email
TO_EMAIL=contact@rawragency.fr

# reCAPTCHA (créez sur Google reCAPTCHA Admin)
RECAPTCHA_SECRET_KEY=votre-secret-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre-site-key

# JWT & Auth
JWT_SECRET=votre-jwt-secret-production-tres-long
NEXTAUTH_URL=https://rawragency.fr
NEXTAUTH_SECRET=votre-nextauth-secret-production

# Environnement
NODE_ENV=production
```

### 4. Configuration DNS O2Switch

Dans votre panel O2Switch :

1. **Allez dans "Gestion DNS"**
2. **Ajoutez ces enregistrements :**

```
Type    Nom     Valeur
A       @       76.76.19.61 (IP Vercel - vérifiez sur Vercel)
CNAME   www     cname.vercel-dns.com
```

3. **Dans Vercel :**
   - Settings → Domains
   - Ajoutez `rawragency.fr` et `www.rawragency.fr`

### 5. Base de données

**Option A : PostgreSQL O2Switch**
- Créez une base PostgreSQL dans votre panel O2Switch
- Utilisez les identifiants dans DATABASE_URL

**Option B : Vercel Postgres**
- Dans votre projet Vercel → Storage → Create Database
- Choisissez Postgres
- Copiez la DATABASE_URL générée

**Option C : Supabase (Gratuit)**
- Créez un compte sur [supabase.com](https://supabase.com)
- Créez un nouveau projet
- Récupérez la DATABASE_URL

### 6. Migration de la base

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# (Optionnel) Seed initial
npx prisma db seed
```

### 7. Test final

1. **Vérifiez votre site :** https://rawragency.fr
2. **Testez le formulaire de contact**
3. **Vérifiez les emails**
4. **Testez l'admin :** https://rawragency.fr/admin

## Alternative : Export statique

Si vous préférez un site statique sur O2Switch :

### 1. Modifiez next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Supprimez les fonctionnalités serveur
}
module.exports = nextConfig
```

### 2. Build et upload

```bash
npm run build
# Le dossier 'out' contient votre site statique
# Uploadez le contenu de 'out/' dans public_html/ via FTP
```

⚠️ **Limitation :** Pas de formulaire de contact dynamique, pas d'admin, pas de base de données.

---

**Recommandation :** Utilisez Vercel + domaine O2Switch pour une solution complète et performante ! 🚀
