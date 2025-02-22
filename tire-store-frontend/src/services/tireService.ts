const API_URL = "http://localhost:5258/api/Tires"; 

export const fetchTires = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};
