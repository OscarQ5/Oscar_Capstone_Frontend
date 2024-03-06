import { useContext, createContext, useState } from 'react';

import axios from "axios"

export const LoginData = createContext()

export function useLoginDataProvider() {
    return useContext(LoginData)
}

function LoginProvider({ children }) {

    const API = import.meta.env.VITE_BASE_URL

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    
    const [form, setForm] = useState({
        name: '',
        email: '',
        password_hash: '',
        phone_number: ''
    })

    const isAuthenticated = user && token

    // axios.defaults.headers.common["Authorization"] = token

    return (
        <LoginData.Provider value={{
            API,
            user,
            setUser,
            token,
            setToken,
            isAuthenticated,
            form,
            setForm
    
        }}>
            {children}
        </LoginData.Provider>
    );
};

export default LoginProvider;