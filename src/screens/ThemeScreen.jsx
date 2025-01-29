import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Chip,
    LinearProgress,
    Paper,
    CircularProgress
} from "@mui/material";
import {ConfirmationNumber, Assignment, QuestionAnswer} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {
    getAllQuestionsByThemeId,
    getAllThemes,
    getAllTicketsByThemeId, getThemeById,
    getUserProgress
} from "../api/Network";
import {useNavigate, useParams} from "react-router-dom";

const ThemeScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [alignment, setAlignment] = useState('tickets');
    const [theme, setTheme] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null) setAlignment(newAlignment);
    };


    useEffect(() => {
        // Загружаем информацию о теме
        getThemeById(id, localStorage.getItem("token")).then(data => {
            setTheme(data);
            setLoading(false);
        }).catch(error => {
            console.error("Ошибка загрузки темы:", error);
            setLoading(false);
        });

        // Загружаем билеты по теме
        getAllTicketsByThemeId(id, localStorage.getItem("token")).then(data => {
            setTickets(data);
        });

        // Загружаем вопросы по теме
        getAllQuestionsByThemeId(id, localStorage.getItem("token")).then(data => {
            setQuestions(data);
        });
    }, [id]);

    const renderList = () => {
        switch (alignment) {
            case "tickets":
                return tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: 6,
                                transition: "transform 0.3s, box-shadow 0.3s",
                                cursor: "pointer",
                                "&:hover": {transform: "scale(1.05)", boxShadow: 12, cursor: "pointer"}
                            }}
                            onClick={() => navigate("/tickets/" + ticket.id)}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 1}}>
                                    {ticket.name}
                                </Typography>
                                <Divider sx={{marginY: 1}}/>
                                <Chip
                                    label={ticket.status === "RESOLVED" ? "Решено" : "Не решено"}
                                    color={ticket.status === "RESOLVED" ? "success" : "error"}
                                    size="small"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ));
            case "questions":
                return questions.map((question) => (
                    <Grid item xs={12} sm={6} md={4} key={question.id}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                boxShadow: 6,
                                transition: "transform 0.3s, box-shadow 0.3s",
                                cursor: "pointer",
                                "&:hover": {transform: "scale(1.05)", boxShadow: 12}
                            }}
                            onClick={() => navigate("/questions/" + question.id)}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 1}}>
                                    {question.text}
                                </Typography>
                                <Divider sx={{marginY: 1}}/>
                                <Chip
                                    label={question.status === "RESOLVED" ? "Решено" : "Не решено"}
                                    color={question.status === "RESOLVED" ? "success" : "error"}
                                    size="small"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ));
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!theme) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Typography variant="h6" color="error">
                    Тема не найдена.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{minHeight: "100vh", padding: 4, backgroundColor: "#f7f7f7", fontFamily: "'Roboto', sans-serif"}}>
            {/* Информация о теме */}
            <Paper sx={{padding: 3, boxShadow: 3, marginBottom: 4, borderRadius: 2}}>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "#333"}}>
                    {theme.name}
                </Typography>
                <Typography variant="body1" sx={{color: "#555", marginTop: 1}}>
                    {theme.description}
                </Typography>
                <Divider sx={{marginY: 2}} />
                <Typography variant="body2" sx={{fontWeight: "bold", color: theme.status === "PASSED" ? "green" : "red"}}>
                    {theme.status === "PASSED" ? "Пройдено" : "Не пройдено"}
                </Typography>
            </Paper>

            {/* Toggle Button Group */}
            <Box sx={{display: "flex", justifyContent: "center", marginBottom: 4}}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        boxShadow: 3,
                        "& .Mui-selected": {backgroundColor: "#3F51B5", color: "white"},
                        "& .MuiToggleButton-root": {border: "none"},
                    }}
                >
                    <ToggleButton value="tickets" sx={{fontWeight: "bold"}}>
                        <ConfirmationNumber sx={{marginRight: 1}}/> Билеты
                    </ToggleButton>
                    <ToggleButton value="questions" sx={{fontWeight: "bold"}}>
                        <QuestionAnswer sx={{marginRight: 1}}/> Вопросы
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Список билетов / вопросов */}
            <Grid container spacing={3}>
                {renderList()}
            </Grid>
        </Box>
    );
};

export default ThemeScreen;