# Code2Work
Projet transversal incluant tous les aspects du développement d'un site d'e-commerce :
- API de gestion des utilisateurs et des produits (ExpressJS et Sequelize)
- Front web Angular 15
- Applicatif mobile Flutter
- Conteneurisation Docker et orchestration Kubernetes
## API
### Installation
Créez un fichier .env à partir du .env.example  
Utilisez `npm install` pour installer les dépendances   
Lancez l'API avec `node server.js`  
L'API est accessible sur le port spécifié dans le .env  
### Routes
Users :
Methode | Route | Action
--- | --- | ---
GET | users/me | Renvoie les infos de l'utilisateur connecté
GET | users/ | Renvoie les infos de tous les utilisateurs
GET | users/{user_id} | Renvoie les infos d'un utilisateur
GET | users/{user_id}/products | Renvoie tous les produits d'un utilisateur
POST | users/register | Ajoute un nouvel utilisateur
POST | users/login | Connecte un utilisateur
PUT | users/{user_id} | Modifie les infos d'un utilisateur
DELETE | users/{user_id} | Supprime un utilisateur

Products :
Methode | Route | Action
--- | --- | ---
GET | products/ | Renvoie les infos de tous les produits
GET | products/{product_id} | Renvoie les infos d'un produit
POST | products/ | Crée un produit
PUT | products/{product_id} | Modifie un produit
DELETE | products/{product_id} | Supprime un produit

## Front
Utilisez `npm install` pour installer les dépendances  
Lancez le site avec `ng s -o`
Le site est accessible sur le port 4200

## Application
L'application mobile à été développé avec Flutter et utilise Firebase.  
Elle permet la gestion de produits (Création, affichage, modification, suppression)

## Conteneurisation & orchestration
### Docker
Créez un fichier .env à partir du .env.example à la racine du projet  
Utilisez `docker compose up` à la racine du projet pour créer et conteneurisation une image de l'API  
L'API est accessible sur le port spécifié dans le .env
### Kubernetes
Avec minikube, utilisez `minikube start` pour émuler un cluster  
Utilisez `kubectl start -f kube` à la racine du projet pour lancer 3 pods de l'API et 1 de la DB.
