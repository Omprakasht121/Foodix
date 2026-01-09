// import { Category, MenuItem } from "@/types";

import type { Category, MenuItem } from "../../types";

export const CATEGORIES: Category[] = [
  { id: "all", name: "All", emoji: "🍽️" },
  { id: "dinner", name: "Dinner", emoji: "🍔" },
  { id: "lunch", name: "Lunch", emoji: "🍕" },
  { id: "breakfast", name: "BreakFast", emoji: "🍣" },
  { id: "fastfood", name: "FastFood", emoji: "🍣" },
  { id: "desserts", name: "Desserts", emoji: "🍰" },
  { id: "drinks", name: "Drinks", emoji: "🥤" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "dinner",
    subCategory: "Veg Thalis",
    foodType:"nonveg",
    price: 12.99,
    rating: 4.8,
    reviews: 124,
    time: "15-20 min",
    calories: "650 kcal",
    description:
      "Juicy beef patty with melted cheddar, lettuce, tomato, and our secret sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    popular: true,
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    category: 'pizza',
    foodType:"veg",
    price: 14.50,
    rating: 4.9,
    reviews: 89,
    time: '20-25 min',
    calories: '800 kcal',
    description: 'Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 3,
    name: 'Dragon Roll Sushi',
    category: 'sushi',
    foodType:"veg",
    price: 18.00,
    rating: 4.7,
    reviews: 56,
    time: '25-30 min',
    calories: '450 kcal',
    description: 'Shrimp tempura, eel, avocado, and unagi sauce.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    category: 'desserts',
    foodType:"veg",
    price: 8.50,
    rating: 5.0,
    reviews: 210,
    time: '10-15 min',
    calories: '520 kcal',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1624353335558-98e7bb3d9707?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 5,
    name: 'Berry Smoothie',
    category: 'drinks',
    foodType:"veg",
    price: 6.99,
    rating: 4.6,
    reviews: 42,
    time: '5 min',
    calories: '180 kcal',
    description: 'Fresh strawberries, blueberries, and raspberries blended with yogurt.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 6,
    name: 'Pepperoni Feast',
    category: 'pizza',
    foodType:"veg",
    price: 16.99,
    rating: 4.8,
    reviews: 156,
    time: '20-25 min',
    calories: '950 kcal',
    description: 'Double pepperoni with a blend of three cheeses.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400',
    popular: true
  }
  // rest unchanged
];
