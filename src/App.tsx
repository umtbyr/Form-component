import MainForm from "./MainForm/MainForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
    typography: {
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
        },
        body1: {
            fontSize: "1rem",
        },
    },
    spacing: 8,
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainForm />
        </ThemeProvider>
    );
}

export default App;
