import React, { useState, useEffect } from "react";

const themes = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
    css: "darkthem"
  },
  light: {
    backgroundColor: 'white',
    color: 'black',
    css:"lightthem"
  }
}

const initialState = {
  darkTheme: false,
  apptheme: themes.light,
  toggleTheme: () => {}
}

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  
  //Default theme is light
  const [darkTheme, setDark] = useState(false); 

  // On mount, read the preferred theme from the persistence
  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'
    setDark(isDark)
  }, [darkTheme])

  // To toggle between dark and light modes
  const toggleTheme = () => {
    const isDark = !darkTheme
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  const apptheme = darkTheme ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ apptheme, darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }