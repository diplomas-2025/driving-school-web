import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import {createTheme, ThemeProvider} from "@mui/material";
import RegScreen from "./screens/RegScreen";
import MainScreen from "./screens/MainScreen";
import Header from "./components/Header";
import QuestionScreen from "./screens/QuestionScreen";
import TicketScreen from "./screens/TicketScreen";
import {isUserLoggedIn} from "./api/Network";
import ThemeScreen from "./screens/ThemeScreen";

const theme = createTheme({
    palette: {
        mode: "light", // Или "dark" для темного режима
        background: {
            default: "#d0d0d0", // Цвет фона
            paper: "#FFFFFF", // Цвет карточек
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="App">
                    { isUserLoggedIn() &&
                        <Header/>
                    }
                    <Routes>
                        { isUserLoggedIn() &&
                            <>
                                <Route path="/" element={<MainScreen />} />
                                <Route path="/questions/:id" element={<QuestionScreen />} />
                                <Route path="/tickets/:id" element={<TicketScreen />} />
                                <Route path="/themes/:id" element={<ThemeScreen />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        }

                        { !isUserLoggedIn() &&
                            <>
                                <Route path="/login" element={<LoginScreen/>}/>
                                <Route path="/register" element={<RegScreen/>}/>
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        }
                    </Routes>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
