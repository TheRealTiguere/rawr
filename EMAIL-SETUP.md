# 📧 Configuration Email - RAWRAGENCY

Ce guide vous explique comment configurer l'envoi d'emails pour recevoir les formulaires de contact sur `contact@rawragency.fr`.

## 🎯 Configuration Actuelle

Le système est configuré pour envoyer les formulaires à : **contact@rawragency.fr**

## ⚙️ Options de Configuration

### Option 1 : SMTP RAWRAGENCY (Recommandé - Votre domaine)

Vous avez votre propre serveur SMTP configuré pour rawragency.fr :

**Paramètres de votre serveur :**
- **Serveur SMTP** : `arolle.o2switch.net`
- **Port SSL** : `465` (sécurisé)
- **Nom d'utilisateur** : `contact@rawragency.fr`
- **Authentification** : Requise

**Configuration dans `.env.local` :**

```bash
# SMTP Configuration RAWRAGENCY
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="votre-mot-de-passe-email"
TO_EMAIL="contact@rawragency.fr"
```

### Option 2 : Gmail SMTP (Alternative)

Si vous préférez utiliser Gmail comme relai :

1. **Créez un compte Gmail** dédié ou utilisez votre compte existant
2. **Activez l'authentification à 2 facteurs** sur votre compte Google
3. **Générez un mot de passe d'application** :
   - Allez dans votre compte Google > Sécurité
   - Authentification à 2 facteurs > Mots de passe des applications
   - Générez un mot de passe pour "Mail"

```bash
# SMTP Configuration Gmail (alternative)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-application"
TO_EMAIL="contact@rawragency.fr"
```

### Option 3 : Resend (Alternative moderne)

Resend est un service moderne et fiable pour l'envoi d'emails :

1. **Créez un compte** sur [resend.com](https://resend.com)
2. **Obtenez votre clé API**
3. **Configurez votre domaine** (optionnel mais recommandé)

```bash
# Configuration Resend
RESEND_API_KEY="re_votre-cle-api"
TO_EMAIL="contact@rawragency.fr"
```

### Option 4 : Autres fournisseurs SMTP

Vous pouvez utiliser d'autres fournisseurs :

- **OVH** : `smtp.ovh.net` (port 587)
- **Outlook** : `smtp-mail.outlook.com` (port 587)
- **SendGrid** : `smtp.sendgrid.net` (port 587)

## 🔧 Configuration Étape par Étape

### 1. Créer le fichier .env.local

```bash
# Copiez env.example vers .env.local
cp env.example .env.local
```

### 2. Modifier .env.local

Ouvrez `.env.local` et configurez :

```bash
# SMTP Configuration RAWRAGENCY (recommandé)
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="votre-mot-de-passe-email"
TO_EMAIL="contact@rawragency.fr"

# Base de données (déjà configurée)
DATABASE_URL="file:./dev.db"

# JWT (déjà configuré)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Next.js (déjà configuré)
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 3. Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez
npm run dev
```

## 📨 Format des emails reçus

Vous recevrez des emails avec ce format :

```
Sujet: Nouvelle demande de devis - RAWRAGENCY

Contenu:
- Nom: [Nom du client]
- Email: [Email du client]
- Téléphone: [Numéro si fourni]
- Type de projet: [Site Vitrine/E-commerce/SaaS/Mobile/Autre]
- Message: [Message du client]
- Date: [Date et heure de soumission]
```

## 🧪 Test de Configuration

1. **Remplissez le formulaire** sur votre site
2. **Vérifiez les logs** dans le terminal pour les erreurs
3. **Consultez votre boîte mail** contact@rawragency.fr

## 🚨 Dépannage

### Erreur "Authentication failed"
- Vérifiez votre mot de passe d'application Gmail
- Assurez-vous que l'authentification 2FA est activée

### Erreur "Connection timeout"
- Vérifiez votre connexion internet
- Essayez un autre port (465 pour SSL)

### Emails non reçus
- Vérifiez vos spams
- Vérifiez que TO_EMAIL est correct
- Testez avec un autre email de destination

## 🔐 Sécurité

- ⚠️ **Ne commitez JAMAIS** le fichier `.env.local`
- 🔑 **Utilisez des mots de passe d'application** pour Gmail
- 🛡️ **Gardez vos clés API secrètes**

## 🚀 Production

Pour la production, configurez les mêmes variables d'environnement sur votre hébergeur (Vercel, Netlify, etc.).

---

**Besoin d'aide ?** Contactez-moi si vous rencontrez des difficultés avec la configuration !
