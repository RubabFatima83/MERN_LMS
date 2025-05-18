import { createContext, useContext, useEffect, useState } from "react";
import api from "../Services/api";

// Create Context
const AuthContext = createContext();

// Auth Context Provider Component
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState(null)


    // Check authentication on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.get("/auth/me")
                setUserData(data.user)
                setIsAuthenticated(true)
            } catch (error) {
                console.error("Auth check failed:", error)
                setIsAuthenticated(false)
                setUserData(null)
                if (document.cookie.includes("token")) logout()
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])



    // Singup function
    const signup = async (userData) => {
        try {
            const { data } = await api.post('/auth/signup', userData)
            return {
                success: true, data
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup Failed!'
            }
        }
    }

    // Login function
    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password })

            if (data?.user) {
                setUserData(data.user)
                setIsAuthenticated(true)
            }

            return {
                success: true,
                requiresOtp: !data?.user,
                message: data?.message
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login Failed!'
            }
        }
    }

    // Logout function
    const logout = async () => {
        try {
            await api.get('/auth/logout')
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setUserData(null)
            setIsAuthenticated(false)
        }
    }

    // Values provided to consumers
    const value = {
        userData,
        isAuthenticated,
        isLoading,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

// custom hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider')
    }
    return context
}