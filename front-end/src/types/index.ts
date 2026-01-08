export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  time: string;
  calories: string;
  description: string;
  image: string;
  popular: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}


