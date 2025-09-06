# 🔐 SÉCURITÉ - RAWRAGENCY

## ⚠️ RÈGLES DE SÉCURITÉ IMPORTANTES

### 🚨 **NE JAMAIS COMMITER :**

- ❌ Mots de passe SMTP
- ❌ Clés API 
- ❌ Tokens d'authentification
- ❌ Secrets JWT
- ❌ Informations de base de données
- ❌ Fichiers `.env*`

### ✅ **BONNES PRATIQUES :**

#### 📁 **Fichiers de configuration**
- ✅ Utilisez `.env.local` pour le développement
- ✅ Utilisez les variables d'environnement en production
- ✅ Vérifiez que `.env*` est dans `.gitignore`

#### 🔑 **Gestion des mots de passe**
- ✅ Utilisez des mots de passe complexes
- ✅ Changez les mots de passe par défaut
- ✅ Utilisez des gestionnaires de mots de passe

#### 🛡️ **Variables d'environnement**
```bash
# ✅ BON - Dans .env.local (non committé)
SMTP_PASS="votre-mot-de-passe-réel"

# ❌ MAUVAIS - Dans le code source
const password = "2^91B$HHLVC]"
```

## 🔧 **CONFIGURATION SÉCURISÉE**

### 1. **Vérifier .gitignore**
```bash
# Ces fichiers NE DOIVENT PAS être committés
.env.local
.env
.env.production
```

### 2. **Variables d'environnement obligatoires**
```bash
# Dans .env.local UNIQUEMENT
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="[VOTRE-MOT-DE-PASSE-RÉEL]"
JWT_SECRET="[GÉNÉREZ-UN-SECRET-FORT]"
NEXTAUTH_SECRET="[GÉNÉREZ-UN-SECRET-FORT]"
```

### 3. **Générer des secrets forts**
```bash
# Générer un secret JWT fort
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Ou utilisez un générateur en ligne sécurisé
# https://generate-secret.vercel.app/64
```

## 🚀 **DÉPLOIEMENT EN PRODUCTION**

### Variables d'environnement (Vercel/Netlify)
```bash
DATABASE_URL="postgresql://..."
SMTP_HOST="arolle.o2switch.net"
SMTP_PORT="465"
SMTP_USER="contact@rawragency.fr"
SMTP_PASS="[VOTRE-MOT-DE-PASSE]"
TO_EMAIL="contact@rawragency.fr"
JWT_SECRET="[SECRET-FORT-64-CHARS]"
NEXTAUTH_URL="https://rawragency.fr"
NEXTAUTH_SECRET="[SECRET-FORT-64-CHARS]"
NODE_ENV="production"
```

## 🔍 **AUDIT DE SÉCURITÉ**

### Commandes de vérification
```bash
# Vérifier qu'aucun secret n'est committé
git log --all --grep="password\|secret\|key" -i

# Vérifier les fichiers sensibles
git ls-files | grep -E "\.(env|key|pem)$"

# Scanner les mots de passe dans l'historique
git log -p | grep -i "password\|secret\|key"
```

## 🆘 **EN CAS DE FUITE**

### Si un secret a été exposé :
1. **Changez immédiatement** le mot de passe/secret
2. **Révoquez** les clés API compromises
3. **Nettoyez l'historique Git** si nécessaire
4. **Auditez** les accès récents

### Nettoyer l'historique Git :
```bash
# ⚠️ DANGER - Réécrit l'historique
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch .env.local' \
--prune-empty --tag-name-filter cat -- --all
```

---

## 📞 **CONTACT SÉCURITÉ**

En cas de problème de sécurité : contact@rawragency.fr

**Dernière mise à jour** : $(date)
