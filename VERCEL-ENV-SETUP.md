# 🔧 Configuration Variables d'Environnement Vercel

## ❌ Problème actuel
```
Invalid `prisma.inquiry.create()` invocation: Error querying the database: Error code 14: Unable to open the database file
```

**Cause** : La variable `DATABASE_URL` n'est pas configurée sur Vercel ou pointe vers SQLite.

## ✅ Solution

### 1. Aller sur Vercel Dashboard

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet **RAWRAGENCY**
4. Cliquez sur **Settings** (onglet)
5. Cliquez sur **Environment Variables** (menu de gauche)

### 2. Ajouter les variables d'environnement

Cliquez sur **Add New** et ajoutez ces variables :

#### Variable 1 : DATABASE_URL
- **Name** : `DATABASE_URL`
- **Value** : `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
- **Environment** : Production, Preview, Development (cochez tout)

#### Variable 2 : JWT_SECRET
- **Name** : `JWT_SECRET`
- **Value** : `your-super-secret-jwt-key-production-very-long-and-secure`
- **Environment** : Production, Preview, Development

#### Variable 3 : SMTP_HOST
- **Name** : `SMTP_HOST`
- **Value** : `arolle.o2switch.net`
- **Environment** : Production, Preview, Development

#### Variable 4 : SMTP_PORT
- **Name** : `SMTP_PORT`
- **Value** : `465`
- **Environment** : Production, Preview, Development

#### Variable 5 : SMTP_USER
- **Name** : `SMTP_USER`
- **Value** : `contact@rawragency.fr`
- **Environment** : Production, Preview, Development

#### Variable 6 : SMTP_PASS
- **Name** : `SMTP_PASS`
- **Value** : `votre-mot-de-passe-email`
- **Environment** : Production, Preview, Development

#### Variable 7 : TO_EMAIL
- **Name** : `TO_EMAIL`
- **Value** : `contact@rawragency.fr`
- **Environment** : Production, Preview, Development

#### Variable 8 : NEXTAUTH_URL
- **Name** : `NEXTAUTH_URL`
- **Value** : `https://votre-app.vercel.app`
- **Environment** : Production, Preview, Development

#### Variable 9 : NEXTAUTH_SECRET
- **Name** : `NEXTAUTH_SECRET`
- **Value** : `your-nextauth-secret-production-very-long-and-secure`
- **Environment** : Production, Preview, Development

#### Variable 10 : NODE_ENV
- **Name** : `NODE_ENV`
- **Value** : `production`
- **Environment** : Production, Preview, Development

### 3. Récupérer l'URL Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans **Settings** → **Database**
4. Copiez la **Connection string** (URI)
5. Remplacez `[YOUR-PASSWORD]` et `[YOUR-PROJECT-REF]` dans `DATABASE_URL`

### 4. Redéployer

1. Après avoir ajouté toutes les variables
2. Allez dans l'onglet **Deployments**
3. Cliquez sur **Redeploy** sur le dernier déploiement
4. Ou faites un nouveau push Git

### 5. Vérifier le déploiement

1. Allez sur votre site Vercel
2. Testez le formulaire de contact
3. Vérifiez que les données arrivent dans Supabase

## 🔍 Vérification

### Dans Vercel Dashboard :
- ✅ Toutes les variables sont définies
- ✅ `DATABASE_URL` pointe vers Supabase (pas localhost)
- ✅ Variables disponibles pour Production, Preview, Development

### Dans Supabase :
- ✅ Les données du formulaire apparaissent
- ✅ Tables créées correctement

## 🚨 Points importants

1. **DATABASE_URL** doit pointer vers Supabase, pas localhost
2. **Toutes les variables** doivent être ajoutées
3. **Redéployer** après avoir ajouté les variables
4. **Vérifier** que les variables sont bien prises en compte

---

**Une fois configuré, votre site Vercel fonctionnera comme en local !** 🎉
