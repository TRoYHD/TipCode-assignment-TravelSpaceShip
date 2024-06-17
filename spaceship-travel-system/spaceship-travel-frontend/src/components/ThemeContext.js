// Import necessary React and Material-UI components
import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the ThemeContext
export const useThemeContext = () => useContext(ThemeContext);

// ThemeContextProvider component to provide theme context to children components
export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('dark'); // State to store the current theme mode (dark or light)

  // Memoize the theme creation to optimize performance
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // Set the theme mode (dark or light)
        },
      }),
    [mode] // Recreate the theme only when mode changes
  );

  // Function to toggle between dark and light theme modes
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')); // Toggle between dark and light mode
  };

  return (
    // Provide the current theme mode and toggle function to the context
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {/* Apply the theme to all child components */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
