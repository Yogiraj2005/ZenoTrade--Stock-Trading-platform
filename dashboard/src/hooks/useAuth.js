// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import API_URL from "../api";

// const useAuth = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const verifyUser = async () => {
//             try {
//                 const { data } = await axios.post(
//                     "http://localhost:3002/",
//                     {},
//                     { withCredentials: true }
//                 );

//                 if (data.status) {
//                     setUser(data.user);
//                 } else {
//                     // Not authenticated, redirect to login
//                     window.location.href = "http://localhost:3000/login";
//                 }
//             } catch (error) {
//                 console.error("Auth verification failed:", error);
//                 // Redirect to login on error
//                 window.location.href = "http://localhost:3000/login";
//             } finally {
//                 setLoading(false);
//             }
//         };

//         verifyUser();
//     }, [navigate]);

//     return { user, loading };
// };

// export default useAuth;


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Use dynamic API URL
                const { data } = await axios.post(
                    `${API_URL}/`,
                    {},
                    { withCredentials: true }
                );

                if (data.status) {
                    setUser(data.user);
                } else {
                    handleLoginRedirect();
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                handleLoginRedirect();
            } finally {
                setLoading(false);
            }
        };

        const handleLoginRedirect = () => {
            const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            
            // Redirect to the separate Frontend/Landing app for login
            // Update the production URL below once your Frontend is deployed
            const frontendUrl = isLocal 
                ? "http://localhost:3000" 
                : "https://zenotrade-frontend.onrender.com";

            window.location.href = `${frontendUrl}/login`;
        };

        verifyUser();
    }, [navigate]);

    return { user, loading };
};

export default useAuth;