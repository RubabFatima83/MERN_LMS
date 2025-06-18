import { createContext, useContext, useEffect, useState } from "react";
import api from "../Services/api";

// Create Context
const AuthContext = createContext();

// Auth Context Provider Component
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)


    useEffect(() => {
        // Check authentication on app load
        const checkAuth = async () => {
            try {
                const { data } = await api.get("/auth/me", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                setUser(data.user)
                setIsAuthenticated(true)
                // console.log("loadUser fetched user →", data.user);
            } catch (error) {
                console.error("Auth check failed:", error)
                setIsAuthenticated(false)
                setUser(null)
                if (document.cookie.includes("token")) logout()
            } finally {
                setIsLoading(false)
            }
        }
        checkAuth()
    }, [])



    // Singup function
    const signup = async (user) => {
        try {
            const { data } = await api.post('/auth/signup', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
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
            const { data } = await api.post('/auth/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (data?.user) {
                setUser(data.user)
                setIsAuthenticated(true)
            }
            // if (data?.success) {
            //     await checkAuth()
            // }

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
            setUser(null)
            setIsAuthenticated(false)
        }
    }

    // Values provided to consumers
    const value = {
        user,
        setUser,
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