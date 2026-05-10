# MealMate 🥗

A modern nutrition and healthy recipe recommendation mobile app built with **React Native + Expo**.

## Features

- 🎨 Premium mobile UI (rounded cards, smooth layout, health-tech style)
- 🔍 Search & browse 1000+ healthy recipes
- ❤️ Favorite recipes
- 📅 Weekly meal plan
- 🔁 Ingredient alternatives / swaps
- 📊 Daily macro & calorie tracking
- 👤 User profile with goal tracking
- 📱 Bottom tab navigation + native stack

## Color Palette

| Token | Hex |
|-------|-----|
| Primary Green | `#4CAF50` |
| Dark Green | `#2E7D32` |
| Light Green | `#E8F5E9` |
| Primary Text | `#2C3E50` |
| Secondary Text | `#7F8C8D` |
| Background | `#FAFBF9` |

## Screens

1. Onboarding
2. Login
3. Register
4. Home (Dashboard)
5. Recipes (Search)
6. Recipe Detail
7. Meal Plan
8. Favorites
9. Ingredient Alternatives
10. Profile

## Run locally

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with the **Expo Go** app on your phone.

## Project structure

```
MealMate/
├── App.js
├── app.json
├── src/
│   ├── components/RecipeCard.js
│   ├── data/recipes.js
│   ├── navigation/RootNavigator.js
│   ├── screens/
│   │   ├── OnboardingScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RecipesScreen.js
│   │   ├── RecipeDetailScreen.js
│   │   ├── MealPlanScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── AlternativesScreen.js
│   │   └── ProfileScreen.js
│   ├── store.js
│   └── theme/index.js
```

## Tech stack

- React Native 0.74
- Expo SDK 51
- React Navigation 6 (native-stack + bottom-tabs)
- Zustand (state management)
- @expo/vector-icons (Ionicons)

---

Built as a university project. Ready for GitHub & academic submission.
