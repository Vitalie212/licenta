export interface Tire {
  id: number;
  name: string;
  price: number;
  brand: string;
  model: string;
  category: string;
  description: string;
  image?: string;
  width?: number;  // ✅ Adăugat
  height?: number; // ✅ Adăugat
  diameter?: number; // ✅ Adăugat
}
