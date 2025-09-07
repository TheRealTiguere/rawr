# 🔐 Configuration Google reCAPTCHA v3 - RAWRAGENCY

Ce guide vous explique comment configurer Google reCAPTCHA v3 pour sécuriser votre formulaire de contact.

## 🎯 Pourquoi reCAPTCHA v3 ?

- ✅ **Invisible** - Aucune interaction utilisateur requise
- ✅ **Score-based** - Analyse comportementale avancée (0.0 à 1.0)
- ✅ **Gratuit** jusqu'à 1 million de requêtes/mois
- ✅ **Intégration native** avec Google
- ✅ **Protection avancée** contre les bots

## 📋 Étapes de configuration

### 1. Créer un projet Google reCAPTCHA

1. Allez sur [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "+" pour créer un nouveau site

### 2. Configurer votre site

1. **Label** : `RAWRAGENCY Contact Form`
2. **Type de reCAPTCHA** : Sélectionnez **reCAPTCHA v3**
3. **Domaines** : Ajoutez vos domaines :
   - `localhost` (pour le développement)
   - `rawragency.fr` (pour la production)
   - `www.rawragency.fr`
4. **Propriétaires** : Ajoutez votre email
5. Acceptez les conditions d'utilisation
6. Cliquez sur "Envoyer"

### 3. Récupérer vos clés

Après avoir créé le site, vous obtiendrez :
- **Clé du site** (Site Key) : Pour le frontend
- **Clé secrète** (Secret Key) : Pour le backend

### 4. Configurer les variables d'environnement

Dans votre fichier `.env.local`, ajoutez :

```bash
# Google reCAPTCHA v3 Configuration
RECAPTCHA_SECRET_KEY="6Lc6BAAAAAAAAChqRbQZcn_yyyyyyyyyyyyyyyyy"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="6Lc6BAAAAAAAAKN3DRm6VA_xxxxxxxxxxxxxxxxx"
```

⚠️ **Important** : 
- `RECAPTCHA_SECRET_KEY` : Utilisée côté serveur (sans NEXT_PUBLIC_)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` : Utilisée côté client (avec NEXT_PUBLIC_)

### 5. Redémarrer le serveur

```bash
npm run dev
```

## 🧪 Test de fonctionnement

1. Allez sur votre site : http://localhost:3000
2. Remplissez le formulaire de contact
3. **Aucun widget visible** - reCAPTCHA v3 fonctionne en arrière-plan
4. Soumettez le formulaire

### Logs attendus dans la console :

**Côté navigateur :**
```
🔐 Exécution de reCAPTCHA v3...
✅ Token reCAPTCHA obtenu
🔐 reCAPTCHA vérifié: Token reçu
```

**Côté serveur :**
```
🔐 Vérification reCAPTCHA v3...
✅ reCAPTCHA vérifié avec succès (score: 0.9)
```

## 📊 Comprendre les scores

reCAPTCHA v3 retourne un score de 0.0 à 1.0 :
- **1.0** : Très probablement un humain
- **0.5** : Score neutre (seuil par défaut)
- **0.0** : Très probablement un bot

### Configuration des seuils

Dans `lib/recaptcha.ts`, vous pouvez ajuster le score minimum :

```typescript
// Score minimum requis (0.5 par défaut)
const captchaResult = await verifyReCaptcha(token, 0.7) // Plus strict
```

## 🔧 Dépannage

### Le script reCAPTCHA ne se charge pas
- Vérifiez que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` est bien définie
- Vérifiez la connexion internet
- Redémarrez le serveur après avoir ajouté les variables

### Erreur "Invalid site key"
- Vérifiez que la site key est correcte
- Vérifiez que le domaine correspond à celui configuré dans Google reCAPTCHA

### Erreur "Invalid secret key"
- Vérifiez que la secret key est correcte
- Assurez-vous qu'elle n'a pas le préfixe `NEXT_PUBLIC_`

### Score trop bas
- Ajustez le seuil minimum dans `lib/recaptcha.ts`
- Vérifiez les logs pour voir le score obtenu
- Les nouveaux domaines peuvent avoir des scores plus bas initialement

## 📈 Monitoring

### Console Google reCAPTCHA

1. Allez sur [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sélectionnez votre site
3. Consultez les statistiques :
   - Nombre de requêtes
   - Distribution des scores
   - Tentatives malveillantes bloquées

### Logs personnalisés

Le système log automatiquement :
- ✅ Succès avec score
- ❌ Échecs avec raison
- ⚠️ Tokens manquants

## 🚀 Production

En production, assurez-vous de :

1. **Ajouter votre domaine** dans Google reCAPTCHA Admin
2. **Configurer les variables** sur votre hébergeur (Vercel, Netlify, etc.)
3. **Tester le formulaire** après déploiement
4. **Monitorer les scores** les premiers jours

### Variables d'environnement Vercel

```bash
vercel env add RECAPTCHA_SECRET_KEY
vercel env add NEXT_PUBLIC_RECAPTCHA_SITE_KEY
```

## 🎨 Personnalisation

### Badge reCAPTCHA

reCAPTCHA v3 affiche un petit badge "Protected by reCAPTCHA" en bas à droite. Pour le personnaliser, ajoutez dans votre CSS :

```css
.grecaptcha-badge {
  visibility: hidden;
}
```

⚠️ **Attention** : Si vous masquez le badge, vous devez mentionner reCAPTCHA dans vos mentions légales.

### Actions personnalisées

Vous pouvez définir des actions spécifiques :

```typescript
await executeReCaptcha('contact_form')  // Formulaire de contact
await executeReCaptcha('newsletter')    // Inscription newsletter
await executeReCaptcha('login')         // Connexion
```

---

**reCAPTCHA v3 protège votre site de manière invisible et efficace !** 🛡️
