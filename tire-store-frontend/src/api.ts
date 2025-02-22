import axios from 'axios';

export const getTires = async (width: string, height: string, diameter: string) => {
  try {
    const response = await axios.get('http://localhost:5258/api/Tires', {
      params: { 
        width: width, 
        height: height, 
        diameter: diameter
      }
    });
    return response.data;
  } catch (error) {
    console.error("Eroare la obținerea anvelopelor:", error);
    return [];
  }
};
