# RAWRAGENCY - Site Vitrine Agence Web

Site vitrine moderne pour agence web avec back-office d'administration et capture de leads.

## 🚀 Technologies

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: API Routes Next.js, Prisma ORM
- **Base de données**: PostgreSQL
- **Authentification**: JWT avec cookies httpOnly
- **Validation**: Zod
- **Email**: Nodemailer (SMTP) ou Resend
- **Déploiement**: Docker, Docker Compose, Vercel

## ✨ Fonctionnalités

- 🎨 Design moderne style ChatGPT (gradients radiaux pastel + grain)
- 📱 Interface responsive (≥375px)
- 🔐 Authentification admin sécurisée
- 📝 Formulaire de contact avec validation
- 🛡️ Protection anti-spam (honeypot)
- 📊 Back-office complet avec gestion des demandes
- 📈 Export CSV des données
- 📧 Notifications email automatiques
- 🚀 Performance optimisée (Lighthouse ≥90)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- PostgreSQL
- Docker & Docker Compose (optionnel)

## 🛠️ Installation Locale

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd rawragency
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

```bash
cp env.example .env.local
```

Éditer `.env.local` avec vos valeurs :

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/rawragency"

# JWT (générer une clé sécurisée)
JWT_SECRET="votre-cle-jwt-secrete"

# SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-app"
TO_EMAIL="admin@agence.com"
```

### 4. Base de données

```bash
# Générer le client Prisma
npm run db:generate

# Créer la base et appliquer les migrations
npm run db:push

# Ou avec migrations
npm run db:migrate

# Créer l'utilisateur admin
npm run db:seed
```

### 5. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🐳 Installation avec Docker

### 1. Cloner et configurer

```bash
git clone <votre-repo>
cd rawragency
cp env.example .env
# Éditer .env avec vos valeurs
```

### 2. Lancer avec Docker Compose

```bash
# Construire et démarrer
docker-compose up --build

# En arrière-plan
docker-compose up -d --build
```

### 3. Initialiser la base de données

```bash
# Dans un autre terminal
docker-compose exec app npm run db:generate
docker-compose exec app npm run db:push
docker-compose exec app npm run db:seed
```

## 🔐 Accès Admin

- **URL**: `/admin` ou `/login`
- **Email**: `admin@agence.com`
- **Mot de passe**: `admin123`

⚠️ **Important**: Changez ces identifiants en production !

## 📊 Scripts Disponibles

```bash
# Développement
npm run dev          # Lancer en mode dev
npm run build        # Build de production
npm run start        # Lancer en mode production
npm run lint         # Vérifier le code
npm run type-check   # Vérifier les types TypeScript

# Base de données
npm run db:generate  # Générer le client Prisma
npm run db:push      # Appliquer le schéma
npm run db:migrate   # Exécuter les migrations
npm run db:seed      # Créer l'admin
npm run db:studio    # Ouvrir Prisma Studio
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Connecter votre repo GitHub** à Vercel
2. **Configurer les variables d'environnement** :
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `SMTP_*` ou `RESEND_API_KEY`
3. **Déployer automatiquement** à chaque push

### Docker Production

```bash
# Build de l'image
docker build -t rawragency .

# Lancer avec variables d'env
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e JWT_SECRET="..." \
  rawragency
```

### Base de données Production

- **PostgreSQL** : AWS RDS, Google Cloud SQL, ou service managé
- **Variables d'environnement** : Configurer `DATABASE_URL`
- **Migrations** : Exécuter `npm run db:migrate` après déploiement

## 🔧 Configuration Avancée

### Email

#### SMTP (Gmail)
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="mot-de-passe-app-gmail"
```

#### Resend (Alternative)
```env
RESEND_API_KEY="votre-cle-api-resend"
```

### hCaptcha (Optionnel)

```env
HCAPTCHA_SECRET_KEY="votre-cle-secrete"
HCAPTCHA_SITE_KEY="votre-cle-site"
```

### Performance

- **Images** : Optimisées avec Next.js Image
- **CSS** : Purge automatique avec TailwindCSS
- **Bundle** : Analyse avec `npm run build`

## 🧪 Tests

```bash
# Linting
npm run lint

# Vérification des types
npm run type-check

# Build de test
npm run build
```

## 📁 Structure du Projet

```
rawragency/
├── app/                    # App Router Next.js 14
│   ├── api/               # Routes API
│   ├── admin/             # Page admin
│   ├── login/             # Page login
│   ├── legal/             # Mentions légales
│   ├── privacy/           # Politique confidentialité
│   └── page.tsx           # Page d'accueil
├── components/             # Composants React
├── lib/                   # Utilitaires et config
├── prisma/                # Schéma et migrations DB
├── public/                # Assets statiques
├── Dockerfile             # Image Docker
├── docker-compose.yml     # Orchestration Docker
└── README.md              # Documentation
```

## 🔒 Sécurité

- **JWT** : Cookies httpOnly sécurisés
- **Middleware** : Protection des routes sensibles
- **Validation** : Zod pour tous les inputs
- **Anti-spam** : Honeypot + rate limiting
- **CORS** : Configuration sécurisée
- **Headers** : Sécurité renforcée

## 📈 Monitoring & Maintenance

- **Logs** : Console + fichiers de log
- **Health Check** : `/api/health` (à implémenter)
- **Backup DB** : Automatiser avec cron
- **Updates** : Dependencies + sécurité

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Issues** : [GitHub Issues](https://github.com/votre-repo/issues)
- **Email** : support@rawragency.com
- **Documentation** : [Wiki du projet](https://github.com/votre-repo/wiki)

## 🙏 Remerciements

- Next.js Team pour l'excellent framework
- Prisma pour l'ORM moderne
- TailwindCSS pour l'utilitaire CSS
- La communauté open source

---

**RAWRAGENCY** - Transformons vos idées en expériences digitales exceptionnelles 🚀
