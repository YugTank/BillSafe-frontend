import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export function AuthProvider({children}){
    const [token, setToken] = useState(localStorage.getItem("token"));

    function login(jwt) {

        localStorage.setItem("token", jwt);

        setToken(jwt);

    }

    function logout() {
        localStorage.removeItem("token");
        sessionStorage.clear();
        setToken(null);
    }

    useEffect(() => {
        window.addEventListener("billsafe:unauthorized", logout);
        return () => window.removeEventListener("billsafe:unauthorized", logout);
    }, []);

    return(
         <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

