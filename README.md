# API de Test de Parcours Utilisateur

Une API simple pour exécuter des tests de parcours utilisateur avec Puppeteer et notifications Slack.

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

1. Copiez le fichier d'exemple de configuration :
```bash
cp env.example .env
```

2. Configurez vos variables d'environnement dans `.env` :
```env
# Configuration Slack
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_CHANNEL=#testing-alerts

# Configuration des tests
HEADLESS=true
TIMEOUT=30000
```

## 🏃‍♂️ Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

L'API sera disponible sur `http://localhost:3000`

## 📡 Endpoints Disponibles

### Vérification de santé
```
GET /health
```

### Tests de parcours utilisateur

#### Test de recherche Google
```
POST /api/test/google-search
Content-Type: application/json

{
  "query": "votre recherche"
}
```

#### Test de navigation Google
```
POST /api/test/google-navigation
```

#### Test de connexion GitHub
```
POST /api/test/github-login
```

#### Test de recherche GitHub
```
POST /api/test/github-search
Content-Type: application/json

{
  "query": "votre recherche"
}
```

#### Test personnalisé
```
POST /api/test/custom
Content-Type: application/json

{
  "url": "https://example.com",
  "selectors": ["#header", ".content"],
  "actions": [
    {
      "type": "click",
      "selector": "#button"
    },
    {
      "type": "type",
      "selector": "input[name='search']",
      "text": "test"
    }
  ]
}
```

#### Test de performance
```
POST /api/test/performance
Content-Type: application/json

{
  "url": "https://example.com"
}
```

### Gestion du navigateur

#### Fermer le navigateur
```
POST /api/browser/close
```

## 🔧 Types d'actions disponibles

Pour les tests personnalisés, vous pouvez utiliser ces types d'actions :

- `click` : Cliquer sur un élément
- `type` : Taper du texte dans un champ
- `wait` : Attendre un délai
- `waitForSelector` : Attendre qu'un sélecteur soit présent

## 📊 Format de réponse

Tous les endpoints retournent une réponse au format :

```json
{
  "test": "Nom du test",
  "result": {
    "success": true,
    "duration": 1500,
    "message": "Test réussi"
  }
}
```

En cas d'erreur :
```json
{
  "test": "Nom du test",
  "result": {
    "success": false,
    "duration": 500,
    "message": "Description de l'erreur",
    "error": "Stack trace complète"
  }
}
```

## 🔔 Notifications Slack

En cas d'erreur de test, une notification sera automatiquement envoyée sur le canal Slack configuré avec :
- Le nom du test
- Le site testé
- Le message d'erreur
- La stack trace
- L'horodatage

## 📝 Exemples d'utilisation

### Test de recherche Google
```bash
curl -X POST http://localhost:3000/api/test/google-search \
  -H "Content-Type: application/json" \
  -d '{"query": "Puppeteer automation"}'
```

### Test personnalisé
```bash
curl -X POST http://localhost:3000/api/test/custom \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "selectors": ["#header", ".main-content"],
    "actions": [
      {
        "type": "click",
        "selector": "#menu-button"
      },
      {
        "type": "wait",
        "duration": 2000
      }
    ]
  }'
```

## 🛠️ Développement

Pour ajouter de nouveaux tests, vous pouvez :

1. Créer un nouvel endpoint dans `server.js`
2. Utiliser la fonction `runTest()` pour exécuter vos tests
3. Les erreurs seront automatiquement envoyées sur Slack

## 📋 Prérequis

- Node.js 16+
- Un token Slack Bot pour les notifications
- Chrome/Chromium pour Puppeteer
