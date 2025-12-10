import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.post(
                    "http://localhost:3002/",
                    {},
                    { withCredentials: true }
                );

                if (data.status) {
                    setUser(data.user);
                } else {
                    // Not authenticated, redirect to login
                    window.location.href = "http://localhost:3000/login";
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                // Redirect to login on error
                window.location.href = "http://localhost:3000/login";
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [navigate]);

    return { user, loading };
};

export default useAuth;
