# Configuration Google reCAPTCHA v3

## 🔑 Obtenir vos clés reCAPTCHA

1. **Aller sur Google reCAPTCHA** : https://www.google.com/recaptcha/admin
2. **Créer un nouveau site** :
   - **Label** : RAWRAGENCY Contact Form
   - **Type** : **reCAPTCHA v3** (invisible)
   - **Domaines** : 
     - `rawragency.fr` (production)
     - `localhost` (développement)
3. **Accepter les conditions d'utilisation**
4. **Copier vos clés** :
   - **Clé du site** (SITE_KEY) : à utiliser côté client
   - **Clé secrète** (SECRET_KEY) : à garder confidentielle

## ⚙️ Configuration dans le projet

### Variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="votre-clé-site-ici"
RECAPTCHA_SECRET_KEY="votre-clé-secrète-ici"
```

### Déploiement

**Vercel** :
1. Allez dans les paramètres de votre projet
2. Section "Environment Variables"
3. Ajoutez les deux variables ci-dessus

**Autres plateformes** :
- Configurez les variables d'environnement selon votre hébergeur

## 🛡️ Sécurité

- ✅ **Clé publique** : Visible côté client (pas de problème)
- 🔒 **Clé secrète** : Jamais exposée côté client
- 🛡️ **Vérification** : Double vérification côté serveur avec score
- 🚫 **Anti-spam** : Protection invisible contre les bots
- 📊 **Score** : 0.0 = bot suspect, 1.0 = humain (seuil : 0.5)

## 🎨 Avantages reCAPTCHA v3

- **Invisible** : Aucune case à cocher visible
- **Intelligent** : Analyse le comportement utilisateur
- **Fluide** : Expérience utilisateur optimale
- **Efficace** : Détection avancée des bots

## 🔧 Dépannage

### reCAPTCHA ne s'affiche pas
- Vérifiez que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` est bien configurée
- Redémarrez votre serveur de développement

### Erreur de vérification
- Vérifiez que `RECAPTCHA_SECRET_KEY` est bien configurée
- Vérifiez que le domaine est autorisé dans Google reCAPTCHA

### Mode développement
- En développement, si les clés ne sont pas configurées, le reCAPTCHA est ignoré
- En production, la vérification est obligatoire
