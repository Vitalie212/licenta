import axios from "axios";

const API_URL = "http://localhost:5258/api/auth";  // ✅ Endpoint corect

// ✅ Înregistrare utilizator
export const register = async (fullName: string, username: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            fullName,  
            username,  
            email,  
            password,
            role: "User",  
        }, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data?.token 
            ? { success: true, message: "Înregistrare reușită!", token: response.data.token } 
            : { success: false, message: "Eroare la înregistrare." };
    } catch (error: any) {
        console.error("Eroare la înregistrare:", error.response?.data);
        return { success: false, message: error.response?.data?.message || "Eroare la server." };
    }
};

// ✅ Login utilizator
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
            return { success: true, token: response.data.token };
        } else {
            return { success: false, message: "Autentificare eșuată. Răspuns invalid." };
        }
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Eroare la server." };
    }
};

// ✅ Google Login
export const googleLogin = async (credential: string) => {
    try {
        const response = await axios.post(`${API_URL}/google-login`, { token: credential }, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
            return { success: true, token: response.data.token };
        } else {
            return { success: false, message: "Autentificare Google eșuată. Răspuns invalid." };
        }
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Eroare la server." };
    }
};

// ✅ Obține token-ul curent
export const getToken = () => localStorage.getItem("token") || "";

// ✅ Verifică dacă utilizatorul este autentificat
export const isAuthenticated = () => !!getToken();

// ✅ Logout: șterge token-ul din localStorage
export const logout = () => localStorage.removeItem("token");

// ✅ Adaugă token-ul în cererile Axios
axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
