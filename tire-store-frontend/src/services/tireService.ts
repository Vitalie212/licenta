import axios from "axios";

const API_URL = "http://localhost:5258/api/Tires"; // 🔹 Schimbă dacă ai alt URL

// ✅ Definim tipul anvelopei pentru TypeScript
export interface Tire {
  id: number;
  name: string;
  brand: string;
  model: string;
  description?: string;
  width: number;
  height: number;
  diameter: number;
  price: number;
  category: string;
  image?: string;
}

// ✅ Obține toate anvelopele (opțional filtrare după categorie)
export const fetchTires = async (): Promise<Tire[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data.map((tire: Tire) => ({
        ...tire,
        image: tire.image || "/images/default-tire.jpg", // ✅ Dacă e `undefined`, folosim imaginea default
      }));
    } catch (error) {
      console.error("Eroare la obținerea anvelopelor:", error);
      return [];
    }
  };
  
// ✅ Obține o anvelopă după ID
export const fetchTireById = async (id: number): Promise<Tire | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Eroare la obținerea anvelopei cu ID ${id}:`, error);
    return null;
  }
};

// ✅ Adaugă o anvelopă nouă
export const createTire = async (tire: Tire): Promise<Tire | null> => {
  try {
    const response = await axios.post(API_URL, tire);
    return response.data;
  } catch (error) {
    console.error("Eroare la adăugarea anvelopei:", error);
    return null;
  }
};

// ✅ Actualizează o anvelopă
export const updateTire = async (id: number, tire: Tire): Promise<boolean> => {
  try {
    await axios.put(`${API_URL}/${id}`, tire);
    return true;
  } catch (error) {
    console.error(`Eroare la actualizarea anvelopei cu ID ${id}:`, error);
    return false;
  }
};

// ✅ Șterge o anvelopă
export const deleteTire = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Eroare la ștergerea anvelopei cu ID ${id}:`, error);
    return false;
  }
};
