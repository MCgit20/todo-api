# Todo API - Projet DevOps Final

## Tableau Récapitulatif des Métriques

| Service | Taille Image | Temps Build à Froid | Temps Build à Chaud | Nb de Layers | Temps 1ère Réponse HTTP |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **API Node.js** | ~170 MB | 18.2s | 0.8s (CACHED) | 8 | < 1.2s |
| **Python Analytics** | ~68 MB | 12.4s | 0.6s (CACHED) | 6 | < 0.9s |
| **PostgreSQL** | ~37 MB | (Image Officielle) | - | - | < 3.0s |

---

## Journal de Bord Complete

### Chapitre 5 : Dockerfile
- Validation non-root via `USER node`.
- Optimisation des layers grâce au découpage `COPY package*.json` avant `COPY . .`.

### Chapitre 6 : Volumes & Networks
- Données PostgreSQL rendues persistantes via le volume `pgdata`.
- Base de données complètement isolée du réseau extérieur, accessible uniquement à l'intérieur du bridge network Docker.

### Chapitre 7 : Docker Compose
- Gestion unifiée via variables d'environnement (`.env`).
- Gestion de l'ordre de démarrage via `depends_on` et `healthcheck`.

### Chapitre 8 : Service Polyglotte Python
- Connexion du service Flask à la même base de données.
- Microservice léger compilé sous Alpine Linux.

### Chapitre 9 : Registry
- Publication réussie sur Docker Hub et redéploiement autonome via `docker-compose.prod.yml`.