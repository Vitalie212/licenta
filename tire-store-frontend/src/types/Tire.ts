export interface Tire {
  id: number;
  name: string;
  brand: string;
  model: string;
  description?: string; // ✅ Acum este opțional
  width: number;
  height: number;
  diameter: number;
  price: number;
  category: string;
  image?: string; // ✅ Permitem și `undefined`
}
