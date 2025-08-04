import AsyncStorage from "@react-native-async-storage/async-storage";

const { createContext, useContext, useState, useEffect } = require("react");

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true)

    const toggleTheme = async () => {
        await AsyncStorage.setItem('theme' , isDark ? 'light' : 'dark')
        setIsDark(!isDark)
    }

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme !== null) {
                    setIsDark(savedTheme === 'dark');
                } else {
                    setIsDark(false);
                }
            } catch (err) {
                console.log('Error loading theme:', err);
            }
        };
        loadTheme();
    }, []);


    return (
        <ThemeContext.Provider value={{isDark , toggleTheme}}>{children}</ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext)
    return context
}

export default useTheme