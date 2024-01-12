import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./assets/theme";
import { useSelector } from "react-redux";
import Snackbar from "./utils/Snackbar";
import Routes from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";
import Box from '@mui/material/Box';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = () => {
    const colorMode = useSelector((state) => state.theme.mode);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme(colorMode)}>
                <AuthProvider>
                  <Box
                          sx={{
                              width: '100%',
                              height: '100%',
                              bgcolor: theme(colorMode).palette.background.default,
                          }}
                  >
                      <Routes />
                      <Snackbar />
                  </Box>
                </AuthProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
