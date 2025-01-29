import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/Network";

const LoginScreen = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Для хранения сообщения об ошибке

    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

        try {
            const data = await signIn({ username, password });
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
                    Авторизация
                </Typography>
                {error && ( // Отображаем сообщение об ошибке только если оно есть
                    <Typography
                        variant="body2"
                        sx={{ color: "red", marginBottom: 2, textAlign: "center" }}
                    >
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Имя пользователя"
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
                        Войти
                    </Button>
                </form>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: 2 }}
                >
                    Нет аккаунта?{" "}
                    <MuiLink
                        component={Link}
                        to="/register"
                        underline="hover"
                    >
                        Создать аккаунт
                    </MuiLink>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginScreen;