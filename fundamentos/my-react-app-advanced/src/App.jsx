import { useContext, createContext, useState } from "react"
import Counter from './components/Counter/Counter'
import CounterWithReactMemo from "./components/CounterWithReactMemo/CounterWithReactMemo";
import CounterWithCustomHook from "./components/CounterWithCustomHook/CounterWithCustomHook";
import './App.css'

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

function ThemeButton() {
    const { theme, toggleTheme} = useContext(ThemeContext);

    return (
        <button 
            onClick={toggleTheme}
            style={{
                backgroundColor: theme === "light" ? "#FFF" : "#333",
                color: theme === "light" ? "#000" : "#FFF"
            }}
        >
            Cambiar tema
        </button>
    )
}

function App() {
    return (
        <>
            {/* <Counter /> */}
            <ThemeProvider>
                <ThemeButton />
            </ThemeProvider>
            <CounterWithCustomHook />
            <CounterWithReactMemo />
        </>
        
    )
}