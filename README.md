### Chapitre 5 : Métriques Dockerfile
- **Utilisateur exécutant :** `node` (non-root validé avec `whoami`)
- **Taille de l'image finale :** ~170MB
- **Multi-stage :** Utilisé pour séparer l'installation initiale des paquets de dev du runtime de production.