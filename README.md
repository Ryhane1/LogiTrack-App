# 🚚 LogiTrack 

> **Plateforme de gestion logistique sécurisée avec Spring Boot, Spring Security, JWT et React**

## 📌 Description

**LogiTrack** est une application Full Stack destinée à la gestion des opérations logistiques entre les clients et l'entrepôt.

Cette deuxième partie du projet consiste à faire évoluer l'API REST développée avec **Spring Boot et Spring Data JPA** en ajoutant :

* 🔐 une authentification sécurisée avec **JWT** ;
* 👥 une gestion des utilisateurs et des rôles ;
* 🛡️ une autorisation basée sur les rôles ;
* ⚛️ une interface frontend développée avec **React JS** ;
* 🔄 une communication sécurisée entre React et l'API ;
* 📄 la pagination et le tri ;
* 🔎 la recherche et le filtrage ;
* 📊 un tableau de bord adapté au rôle de l'utilisateur.

---

## 🎯 Objectifs

L'objectif principal est de construire une application logistique sécurisée permettant à différents utilisateurs de gérer les clients, produits et commandes selon leurs permissions.

### Objectifs techniques

* Mettre en place **Spring Security**.
* Implémenter une authentification **JWT**.
* Sécuriser les endpoints REST.
* Implémenter une gestion des rôles.
* Développer une interface moderne avec **React 19**.
* Mettre en place des routes privées.
* Implémenter un `RoleGuard`.
* Configurer des **Axios Interceptors**.
* Valider les formulaires avec **React Hook Form + Yup**.
* Ajouter pagination, tri, recherche et filtrage.
* Assurer une interface responsive.

---

# 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       React Frontend    │
                    │                         │
                    │  React 19 + Vite        │
                    │  React Router            │
                    │  Axios                   │
                    │  React Hook Form + Yup   │
                    └────────────┬────────────┘
                                 │
                         HTTP + JWT
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Spring Boot API    │
                    │                         │
                    │  Spring Security        │
                    │  JWT Authentication     │
                    │  REST Controllers       │
                    │  Services               │
                    │  Spring Data JPA        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        MySQL             │
                    │                         │
                    │ Users / Clients          │
                    │ Products / Orders        │
                    │ Order Lines              │
                    └─────────────────────────┘
```

---

# 🔐 Authentification et autorisation

L'application utilise **Spring Security** avec des tokens **JWT** pour sécuriser l'accès à l'API.

### Inscription

```http
POST /api/auth/register
```

Permet de créer un nouvel utilisateur.

### Connexion

```http
POST /api/auth/login
```

Après une authentification réussie, l'API retourne :

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com"
  },
  "role": "MANAGER"
}
```

Le frontend stocke ensuite le token et l'utilise automatiquement pour les requêtes protégées.

---

# 👥 Gestion des rôles

Trois rôles sont disponibles :

| Rôle       | Description                              |
| ---------- | ---------------------------------------- |
| 🔴 ADMIN   | Administration complète de l'application |
| 🟠 MANAGER | Gestion des opérations logistiques       |
| 🟢 AGENT   | Consultation et suivi des opérations     |

### ADMIN

L'administrateur peut :

* gérer les utilisateurs ;
* gérer les clients ;
* gérer les produits ;
* gérer les commandes ;
* supprimer les données ;
* consulter les statistiques.

### MANAGER

Le manager peut :

* gérer les clients ;
* gérer les produits ;
* gérer les commandes ;
* modifier le statut des commandes ;
* consulter les statistiques ;
* consulter les produits à stock faible.

### AGENT

L'agent peut :

* consulter les clients ;
* consulter les produits ;
* consulter les commandes ;
* consulter les détails d'une commande ;
* modifier le statut d'une commande selon ses permissions.

---

# 🛡️ Sécurité Frontend

Le frontend contient plusieurs mécanismes de sécurité.

### ProtectedRoute

Empêche un utilisateur non authentifié d'accéder aux pages privées.

Exemples :

```text
/dashboard
/clients
/products
/orders
/users
```

### RoleGuard

Contrôle l'accès à une fonctionnalité selon le rôle de l'utilisateur.

Exemple :

```text
ADMIN
 └── Gestion des utilisateurs

ADMIN + MANAGER
 └── Statistiques

ADMIN
 └── Suppression
```

Un utilisateur non autorisé est redirigé vers :

```text
/access-denied
```

---

# 🔄 Axios Interceptors

Une configuration Axios centralisée permet de gérer automatiquement le JWT.

### Request Interceptor

Le token est récupéré depuis le stockage de session puis ajouté aux requêtes :

```http
Authorization: Bearer <JWT>
```

### Response Interceptor

Les erreurs HTTP sont centralisées :

| Code | Signification         | Comportement                    |
| ---- | --------------------- | ------------------------------- |
| 401  | Non authentifié       | Déconnexion + redirection Login |
| 403  | Accès interdit        | Redirection Access Denied       |
| 404  | Ressource inexistante | Message d'erreur                |
| 500  | Erreur serveur        | Message d'erreur                |

---

# 📦 Fonctionnalités

## 👤 Clients

* Afficher les clients
* Consulter un client
* Ajouter un client
* Modifier un client
* Supprimer un client selon le rôle
* Rechercher un client
* Pagination
* Tri

## 📦 Produits

* Afficher les produits
* Consulter un produit
* Ajouter un produit
* Modifier un produit
* Supprimer un produit selon le rôle
* Rechercher par catégorie
* Rechercher selon le prix
* Afficher les produits avec stock faible
* Pagination
* Tri

## 🛒 Commandes

* Afficher les commandes
* Consulter une commande
* Créer une commande
* Ajouter un produit à une commande
* Modifier le statut
* Rechercher les commandes d'un client
* Filtrer par statut
* Pagination
* Tri

### Statuts disponibles

```text
EN_ATTENTE
EXPEDIEE
LIVREE
```

---

# 📊 Dashboard

Le tableau de bord permet de visualiser rapidement les informations principales :

* Nombre de clients
* Nombre de produits
* Nombre de commandes
* Commandes en attente
* Commandes expédiées
* Commandes livrées
* Produits avec stock faible
* Produit le plus commandé
* Commandes récentes

Le contenu du dashboard peut être adapté au rôle de l'utilisateur connecté.

---

# 📄 Pagination et tri

Les listes utilisent les données paginées provenant de l'API.

Fonctionnalités disponibles :

* changement de page ;
* choix du nombre d'éléments ;
* affichage du nombre total ;
* tri des données.

### Critères de tri

**Clients**

* Nom

**Produits**

* Nom
* Prix
* Quantité en stock

**Commandes**

* Date de commande
* Statut

---

# 🔎 Recherche et filtrage

L'application propose plusieurs mécanismes de recherche :

```text
Clients
 └── Recherche par nom

Produits
 ├── Recherche par catégorie
 ├── Recherche par prix
 └── Stock faible

Commandes
 ├── Recherche par client
 └── Filtrage par statut
```

---

# 🖥️ Pages principales

```text
Login
Register
Dashboard

Clients
 ├── ClientList
 ├── ClientDetails
 └── ClientForm

Products
 ├── ProductList
 ├── ProductDetails
 └── ProductForm

Orders
 ├── OrderList
 ├── OrderDetails
 └── OrderForm

Users
Profile

AccessDenied
NotFound
```

---

# 🧩 Composants React

```text
Navbar
Sidebar
DashboardCard

ClientList
ClientForm

ProductList
ProductForm

OrderList
OrderForm

Pagination
SearchBar
StatusFilter

ProtectedRoute
RoleGuard

Loader
ConfirmDialog
NotFound
```

---

# 🛠️ Technologies

## Backend

* Java 17/21
* Spring Boot
* Spring Web
* Spring Security
* JWT
* Spring Data JPA
* Maven
* MySQL

## Frontend

* React 19
* Vite
* React Router DOM
* Axios
* React Hook Form
* Yup
* JavaScript ES6+
* HTML5
* CSS3
* MUI

## Outils

* Git
* GitHub
* Postman
* IntelliJ IDEA / VS Code

---

# 📁 Structure du projet

```text
LogiTrack/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── ...
│   │       └── resources/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── guards/
│   │   ├── services/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/votre-username/logitrack.git
cd logitrack
```

## 2. Configuration MySQL

Créer une base de données :

```sql
CREATE DATABASE logitrack;
```

Configurer ensuite les paramètres dans :

```text
backend/src/main/resources/application.properties
```

Exemple :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/logitrack
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 3. Lancer le Backend

```bash
cd backend
mvn spring-boot:run
```

L'API sera disponible sur :

```text
http://localhost:8080
```

## 4. Lancer le Frontend

Dans un autre terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend sera accessible via l'URL affichée par Vite, généralement :

```text
http://localhost:5173
```

---

# 🧪 Tests avec Postman

Les endpoints REST peuvent être testés avec **Postman**.

Exemple de workflow :

```text
1. Register
       ↓
2. Login
       ↓
3. Récupération du JWT
       ↓
4. Ajout du JWT dans Authorization
       ↓
5. Accès aux endpoints protégés
```

Exemple :

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

# 🔐 Exemple de scénario d'utilisation

### Scénario ADMIN

```text
Login
  ↓
Dashboard
  ↓
Gestion des utilisateurs
  ↓
Gestion des clients
  ↓
Gestion des produits
  ↓
Gestion des commandes
  ↓
Statistiques
```

### Scénario MANAGER

```text
Login
  ↓
Dashboard
  ↓
Clients
  ↓
Produits
  ↓
Commandes
  ↓
Statistiques
```

### Scénario AGENT

```text
Login
  ↓
Dashboard
  ↓
Consultation clients
  ↓
Consultation produits
  ↓
Consultation commandes
  ↓
Suivi des commandes
```

---

# 📈 Architecture de sécurité

```text
                User
                 │
                 ▼
             Login/Register
                 │
                 ▼
          Spring Security
                 │
                 ▼
          Authentication
                 │
                 ▼
              JWT Token
                 │
                 ▼
        React / Local Storage
                 │
                 ▼
        Axios Request Interceptor
                 │
                 ▼
        Authorization: Bearer JWT
                 │
                 ▼
          Spring Security
                 │
           ┌─────┴─────┐
           ▼           ▼
      Authenticated   Role
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
            ADMIN   MANAGER    AGENT
```

---

# 🎯 Résultats attendus

Le projet permet de disposer d'une application Full Stack :

* ✅ sécurisée avec JWT ;
* ✅ protégée par Spring Security ;
* ✅ basée sur trois rôles ;
* ✅ dotée de routes privées ;
* ✅ dotée d'un contrôle d'accès par rôle ;
* ✅ connectée à une API REST ;
* ✅ équipée d'Axios Interceptors ;
* ✅ avec pagination et tri ;
* ✅ avec recherche et filtrage ;
* ✅ avec validation des formulaires ;
* ✅ responsive et moderne.
