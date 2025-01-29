import {Box, Typography, Button} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUserInfo} from "../api/Network";

const Header = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("Test");

    useEffect(() => {
        getUserInfo(localStorage.getItem("token")).then((data) => {
            setUsername(data.firstName)
        })
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#3F51B5",
                color: "white",
            }}
        >
            {/* Left Side: Company Name with Custom Image Icon */}
            <Box sx={{display: "flex", alignItems: "center"}}>
                <img
                    src="/car.png" // Image path relative to the /public directory
                    alt="Company Icon"
                    style={{width: 28, height: 28, marginRight: 8}} // Adjust size and margin
                />
                <Typography variant="h6" sx={{fontWeight: "bold", cursor: 'pointer'}} onClick={() => navigate('/')}>
                    Ладья-Самара
                </Typography>
            </Box>

            {/* Right Side: User Name and Logout Button */}
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Typography variant="body1" sx={{marginRight: 2}}>
                    {username}
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/");
                        window.location.reload();
                    }}
                    sx={{
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                            borderColor: "#3F51B5",
                            backgroundColor: "white",
                            color: "#3F51B5",
                        },
                    }}
                >
                    Выход
                </Button>
            </Box>
        </Box>
    );
};

export default Header;