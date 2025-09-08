# 🚀 Déploiement RAWRAGENCY sur O2Switch Node.js

## 📋 Configuration dans le panel O2Switch

### 1. Configuration de l'application Node.js

Dans votre interface O2Switch, configurez :

- **Node.js version** : `10.24.1` ✅ (déjà sélectionné)
- **Application mode** : `Production` ✅ (déjà sélectionné)
- **Application root** : `rawragency` (nom de votre dossier)
- **Application URL** : `rawragency.fr` ✅ (déjà configuré)
- **Application startup file** : `server.js`

### 2. Variables d'environnement

Dans la section "Environment variables", ajoutez :

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./prisma/dev.db
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe-email
TO_EMAIL=contact@rawragency.fr
RECAPTCHA_SECRET_KEY=votre-secret-key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre-site-key
JWT_SECRET=votre-jwt-secret-production-tres-long
NEXTAUTH_URL=https://rawragency.fr
NEXTAUTH_SECRET=votre-nextauth-secret-production
```

## 📁 Préparation des fichiers

### 1. Build de production

Avant d'uploader, créez le build :

```bash
npm run build
```

### 2. Fichiers à uploader

Uploadez ces dossiers/fichiers dans votre dossier `rawragency/` :

```
rawragency/
├── .next/                 (dossier généré par npm run build)
├── public/               (images, favicon, etc.)
├── prisma/               (schéma de base de données)
├── node_modules/         (dépendances - ou npm install sur le serveur)
├── package.json          (modifié avec start: "node server.js")
├── server.js             (fichier de démarrage créé)
├── next.config.js        (configuration Next.js)
├── tailwind.config.ts    (configuration Tailwind)
├── tsconfig.json         (configuration TypeScript)
└── .env.local            (variables d'environnement - optionnel)
```

### 3. Installation des dépendances

Si vous n'uploadez pas `node_modules/`, connectez-vous en SSH et exécutez :

```bash
cd rawragency
npm install --production
```

### 4. Base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer/migrer la base de données
npx prisma db push

# (Optionnel) Seed initial
npx prisma db seed
```

## 🔧 Fichiers de configuration

### server.js (déjà créé)

Ce fichier démarre votre application Next.js sur O2Switch.

### package.json (modifié)

Le script `start` pointe maintenant vers `server.js`.

## 🚀 Démarrage de l'application

1. **Sauvegardez** la configuration dans le panel O2Switch
2. **Cliquez sur "Restart"** pour redémarrer l'application
3. **Testez** votre site sur https://rawragency.fr

## 📊 Monitoring

### Logs de l'application

Dans le panel O2Switch, vous pouvez voir :
- **Logs d'erreur** de votre application
- **Statut** de l'application (Running/Stopped)
- **Utilisation des ressources**

### Test des fonctionnalités

1. ✅ **Page d'accueil** : https://rawragency.fr
2. ✅ **Formulaire de contact** : Test d'envoi d'email
3. ✅ **Admin** : https://rawragency.fr/admin
4. ✅ **Pages légales** : /legal, /privacy

## 🔧 Dépannage

### Application ne démarre pas

1. **Vérifiez les logs** dans le panel O2Switch
2. **Vérifiez server.js** est présent
3. **Vérifiez package.json** script "start"

### Erreurs de base de données

```bash
# Régénérer le client Prisma
npx prisma generate

# Recréer la base
npx prisma db push --force-reset
```

### Erreurs de modules

```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install --production
```

## 📧 Configuration email

Votre configuration SMTP O2Switch devrait fonctionner directement :

```bash
SMTP_HOST=arolle.o2switch.net
SMTP_PORT=465
SMTP_USER=contact@rawragency.fr
SMTP_PASS=votre-mot-de-passe-email
```

## 🔐 reCAPTCHA

1. **Créez un site** sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. **Ajoutez rawragency.fr** dans les domaines
3. **Copiez les clés** dans les variables d'environnement

---

**Votre site RAWRAGENCY sera accessible sur https://rawragency.fr !** 🎉
