import { create } from 'zustand';

export const useApp = create((set) => ({
  favorites: ['avocado-toast', 'salmon-bowl'],
  plan: [
    { day: 'Mon', slot: 'Breakfast', recipeId: 'avocado-toast' },
    { day: 'Mon', slot: 'Lunch', recipeId: 'quinoa-bowl' },
    { day: 'Tue', slot: 'Dinner', recipeId: 'salmon-bowl' },
  ],
  user: { name: 'Alex Carter', email: 'alex@mealmate.app', goal: 'Maintain weight' },
  toggleFav: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((x) => x !== id)
        : [...s.favorites, id],
    })),
  addToPlan: (item) => set((s) => ({ plan: [...s.plan, item] })),
  removeFromPlan: (item) =>
    set((s) => ({
      plan: s.plan.filter(
        (p) => !(p.day === item.day && p.slot === item.slot && p.recipeId === item.recipeId)
      ),
    })),
}));
