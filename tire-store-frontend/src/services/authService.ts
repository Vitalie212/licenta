import axios from "axios";

// Configurare Axios cu backend-ul
const API_URL = "http://localhost:5258/api"; // Asigură-te că 'auth' este scris corect


export const login = async (username: string, password: string) => {
    try {
        const data={username,password,role:"admin"};   
             const response = await axios.post(`${API_URL}/Auth/login`, data, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token); // Stocăm token-ul
            return { success: true, token: response.data.token };
        } else {
            return { success: false, message: "Autentificare eșuată. Răspuns invalid." };
        }
    } catch (error: any) {
        console.error("Eroare la autentificare:", error);

        if (error.response) {
            return { success: false, message: error.response.data?.message || "Eroare la server." };
        }

        return { success: false, message: "Eroare de rețea. Verifică conexiunea la internet." };
    }
};

// ✅ Logout: șterge token-ul din localStorage
export const logout = () => {
    localStorage.removeItem("token");
};

// ✅ Obține token-ul curent
export const getToken = () => {
    return localStorage.getItem("token") || "";
};

// ✅ Verifică dacă utilizatorul este autentificat
export const isAuthenticated = () => {
    return !!getToken();
};

// ✅ Configurare Axios pentru a include token-ul în cererile HTTP
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

