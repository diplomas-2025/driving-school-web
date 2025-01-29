import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link as MuiLink } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {signIn, signUp} from "../api/Network"; // Импортируем Link из react-router-dom

const RegScreen = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Для хранения сообщения об ошибке

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = await signUp({firstName, username, password});
            localStorage.setItem("token", data.accessToken);
            navigate("/");
            window.location.reload();
        } catch (e) {
            // Устанавливаем сообщение об ошибке
            setError("Ошибка входа. Проверьте имя пользователя и пароль.");
            console.error("Login error:", e);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "background.default",
                padding: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 2,
                    }}
                >
                    <img src="/key.png" alt="Key Icon" style={{ width: "80px", height: "80px" }} />
                </Box>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Создать аккаунт
                </Typography>
                {error && ( // Отображаем сообщение об ошибке только если оно есть
                    <Typography
                        variant="body2"
                        sx={{ color: "red", marginBottom: 2, textAlign: "center" }}
                    >
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleRegister}>
                    <TextField
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Почта"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Создать
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 2 }}
                >
                    Уже есть аккаунт?{" "}
                    <MuiLink
                        component={Link}
                        to="/login"
                        underline="hover"
                    >
                        Войти
                    </MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default RegScreen;