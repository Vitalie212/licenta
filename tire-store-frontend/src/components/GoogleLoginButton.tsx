import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../services/authService";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // 🔥 Înlocuiește cu Client ID-ul tău Google!

const GoogleLoginButton: React.FC = () => {
    const handleGoogleSuccess = async (credentialResponse: any) => {
        const { credential } = credentialResponse;
        if (!credential) return;

        const response = await googleLogin(credential);
        if (response.success) {
            window.location.href = "/dashboard"; // ✅ Navigare după succes
        } else {
            console.error(response.message);
        }
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error("Eroare la autentificare cu Google.")}
            />
        </div>
    );
};

export default GoogleLoginButton;
