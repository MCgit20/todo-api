# Todo API - Projet DevOps

## Journal de bord

### Chapitre 5 : Socle API & Premier Dockerfile
- **Accroc :** En envoyant un payload POST trop volumineux, nous avons noté un risque de surcharge. Ajout d'une limite à 10kb sur le parser JSON et restriction à 1000 caractères sur la description.
- **Résultat :** Les 5 routes REST répondent et gèrent proprement les cas 400 et 404.