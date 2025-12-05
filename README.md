# Pokédex Web Frontend

Une application web moderne et élégante pour explorer l'univers des Pokémon, développée avec React et Material-UI.

## Fonctionnalités

- Interface moderne avec Material-UI et design responsive
- Mode sombre/clair avec transition fluide
- Recherche intelligente avec autocomplétion (par nom, type, ou ID)
- Multilingue - Support de 7 langues (FR, EN, ES, DE, IT, PT, NL)
- Design responsive optimisé pour tous les écrans
- Performance optimisée avec lazy loading des images
- Suite de tests complète avec Vitest et Testing Library

## Démarrage rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```

### Production
```bash
npm run build
npm run preview
```

### Tests
```bash
npm test              # Mode watch interactif
npm run test:run      # Exécution unique
npm run test:coverage # Avec rapport de couverture
```

## Technologies utilisées

- **Frontend Framework:** React 18 + Vite
- **UI Library:** Material-UI (MUI)
- **Routing:** React Router DOM
- **State Management:** Context API
- **Styling:** CSS Modules + MUI theming
- **Testing:** Vitest + Testing Library
- **Build Tool:** Vite
- **Package Manager:** npm

## Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── pokemon_card.jsx # Carte Pokémon
│   ├── pokemon_list.jsx # Liste/Grille des Pokémon
│   ├── search_bar.jsx   # Barre de recherche
│   ├── header.jsx       # En-tête avec navigation
│   └── logo.jsx         # Logo cliquable
├── pages/              # Pages de l'application
│   ├── HomePage.jsx    # Page d'accueil
│   └── DetailsPage.jsx # Page de détail Pokémon
├── contexts/           # Contextes React
│   ├── LanguageContext.jsx
│   └── ThemeModeContext.jsx
├── css/               # Feuilles de style
├── data/              # Données JSON
├── theme/             # Configuration MUI
└── tests/             # Suite de tests
```

## Fonctionnalités détaillées

### Recherche avancée
- Recherche par nom (partielle ou complète)
- Filtrage par type de Pokémon
- Recherche par numéro ID
- Autocomplétion en temps réel

### Système de thèmes
- Mode clair/sombre avec transition fluide
- Persistance du choix utilisateur
- Adaptation automatique de tous les composants

### Internationalisation
- Support natif de 7 langues
- Changement de langue en temps réel
- Traduction des noms et types de Pokémon

### Design responsive
- Grille adaptative (5 colonnes → mobile responsive)
- Interface tactile optimisée
- Navigation fluide sur tous les appareils

## Tests

La suite de tests couvre :
- Rendu des composants
- Interactions utilisateur
- Filtrage et recherche
- Changements de thème
- Navigation entre pages
- Gestion des contextes

## Personnalisation

### Thèmes
Les thèmes sont configurés dans `src/theme/theme.js` et supportent :
- Couleurs personnalisées
- Typographie adaptée
- Transitions et animations

### Styles
Les styles utilisent une approche hybride :
- CSS Modules pour les composants
- MUI theming pour la cohérence globale
- Classes CSS pour les états spéciaux (dark mode)

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm test` | Lance les tests en mode watch |
| `npm run test:run` | Exécute les tests une fois |
| `npm run test:coverage` | Tests avec rapport de couverture |
| `npm run lint` | Vérifie le code avec ESLint |

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

*Développé avec React*
