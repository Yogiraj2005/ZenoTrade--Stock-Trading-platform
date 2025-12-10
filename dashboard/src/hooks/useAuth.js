// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import API_URL from "../api";

// // const useAuth = () => {
// //     const [user, setUser] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const verifyUser = async () => {
// //             try {
// //                 const { data } = await axios.post(
// //                     "http://localhost:3002/",
// //                     {},
// //                     { withCredentials: true }
// //                 );

// //                 if (data.status) {
// //                     setUser(data.user);
// //                 } else {
// //                     // Not authenticated, redirect to login
// //                     window.location.href = "http://localhost:3000/login";
// //                 }
// //             } catch (error) {
// //                 console.error("Auth verification failed:", error);
// //                 // Redirect to login on error
// //                 window.location.href = "http://localhost:3000/login";
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         verifyUser();
// //     }, [navigate]);

// //     return { user, loading };
// // };

// // export default useAuth;


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
//                 // Use dynamic API URL
//                 const { data } = await axios.post(
//                     `${API_URL}/`,
//                     {},
//                     { withCredentials: true }
//                 );

//                 if (data.status) {
//                     setUser(data.user);
//                 } else {
//                     handleLoginRedirect();
//                 }
//             } catch (error) {
//                 console.error("Auth verification failed:", error);
//                 handleLoginRedirect();
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const handleLoginRedirect = () => {
//             const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            
//             // Redirect to the separate Frontend/Landing app for login
//             // Update the production URL below once your Frontend is deployed
//             const frontendUrl = isLocal 
//                 ? "http://localhost:3000" 
//                 : "https://zenotrade-frontend.onrender.com";

//             window.location.href = `${frontendUrl}/login`;
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
            // 1. Get the token from Local Storage
            const token = localStorage.getItem("token");

            // If we don't have a token, we aren't logged in. Redirect!
            if (!token) {
                handleLoginRedirect();
                setLoading(false);
                return;
            }

            try {
                // 2. Send the token in the Headers instead of using cookies
                const { data } = await axios.post(
                    `${API_URL}/`, // Make sure this route verifies the token on backend!
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Standard way to send tokens
                        },
                    }
                );

                if (data.status) {
                    setUser(data.user);
                } else {
                    // Token might be invalid or expired
                    localStorage.removeItem("token");
                    handleLoginRedirect();
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                localStorage.removeItem("token");
                handleLoginRedirect();
            } finally {
                setLoading(false);
            }
        };

        const handleLoginRedirect = () => {
            const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            
            const frontendUrl = isLocal 
                ? "http://localhost:3000" 
                : "https://zenotrade-frontend.onrender.com";

            // Redirect to login
            window.location.href = `${frontendUrl}/login`;
        };

        verifyUser();
    }, [navigate]);

    return { user, loading };
};

export default useAuth;