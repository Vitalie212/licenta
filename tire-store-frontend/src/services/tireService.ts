const API_URL = "http://localhost:5000/api/tires"; // actualizează cu URL-ul backend-ului tău

export const fetchTires = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};
