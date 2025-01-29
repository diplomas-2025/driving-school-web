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
    LinearProgress
} from "@mui/material";
import {ConfirmationNumber, Assignment, QuestionAnswer} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {getAllQuestions, getAllThemes, getAllTickets, getUserProgress} from "../api/Network";
import {useNavigate} from "react-router-dom";

const MainScreen = () => {
    const navigate = useNavigate();

    const [alignment, setAlignment] = useState('themes');

    // Sample data
    const [themes, setThemes] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [stats, setStats] = useState(
        {
            countThemes: 0,
            countUseThemes: 0,
            countTickets: 0,
            countUseTickets: 0,
            countQuestions: 0,
            countUseQuestions: 0,
        }
    );

    const handleChange = (event, newAlignment) => {
        if (newAlignment != null)
            setAlignment(newAlignment);
    };

    const percentageUsed = (used, total) => {
        return total === 0 ? 0 : (used / total) * 100;
    };

    useEffect(() => {
        getUserProgress(localStorage.getItem("token")).then((data) => {
            setStats(data)
        })

        getAllThemes(localStorage.getItem("token")).then((data) => {
            setThemes(data)
        })

        getAllTickets(localStorage.getItem("token")).then((data) => {
            setTickets(data)
        })

        getAllQuestions(localStorage.getItem("token")).then((data) => {
            setQuestions(data)
        })
    }, [])

    const renderList = () => {
        switch (alignment) {
            case "themes":
                return themes.map((theme) => (
                    <Grid item xs={12} sm={6} md={4} key={theme.id}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s, box-shadow 0.3s",
                            cursor: "pointer",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12, cursor: "pointer"}
                        }} onClick={() => navigate("/themes/" + theme.id)}>
                            <CardContent>
                                <Typography variant="h6"
                                            sx={{fontWeight: "bold", marginBottom: 1}}>{theme.name}</Typography>
                                <Typography variant="body2" color="text.secondary"
                                            sx={{marginBottom: 2}}>{theme.description}</Typography>
                                <Divider sx={{marginY: 1}}/>
                                <Chip label={theme.status === "RESOLVED" ? "Решено" : "Не решено"}
                                      color={theme.status === "RESOLVED" ? "success" : "error"} size="small"/>
                            </CardContent>
                        </Card>
                    </Grid>
                ));
            case "tickets":
                return tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s, box-shadow 0.3s",
                            cursor: "pointer",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12, cursor: "pointer"}
                        }} onClick={() => navigate("/tickets/" + ticket.id)}>
                            <CardContent>
                                <Typography variant="h6"
                                            sx={{fontWeight: "bold", marginBottom: 1}}>{ticket.name}</Typography>
                                <Divider sx={{marginY: 1}}/>
                                <Chip label={ticket.status === "RESOLVED" ? "Решено" : "Не решено"}
                                      color={ticket.status === "RESOLVED" ? "success" : "error"} size="small"/>
                            </CardContent>
                        </Card>
                    </Grid>
                ));
            case "questions":
                return questions.map((question) => (
                    <Grid item xs={12} sm={6} md={4} key={question.id}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s, box-shadow 0.3s",
                            cursor: "pointer",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12}
                        }} onClick={() => navigate("/questions/" + question.id)}>
                            <CardContent>
                                <Typography variant="h6"
                                            sx={{fontWeight: "bold", marginBottom: 1}}>{question.text}</Typography>
                                <Divider sx={{marginY: 1}}/>
                                <Chip label={question.status === "RESOLVED" ? "Решено" : "Не решено"}
                                      color={question.status === "RESOLVED" ? "success" : "error"} size="small"/>
                            </CardContent>
                        </Card>
                    </Grid>
                ));
            default:
                return null;
        }
    };

    return (
        <Box sx={{minHeight: "100vh", padding: 4, backgroundColor: "#f7f7f7", fontFamily: "'Roboto', sans-serif"}}>
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
                    <ToggleButton value="themes" sx={{fontWeight: "bold"}}>
                        <Assignment sx={{marginRight: 1}}/> Темы
                    </ToggleButton>
                    <ToggleButton value="tickets" sx={{fontWeight: "bold"}}>
                        <ConfirmationNumber sx={{marginRight: 1}}/> Билеты
                    </ToggleButton>
                    <ToggleButton value="questions" sx={{fontWeight: "bold"}}>
                        <QuestionAnswer sx={{marginRight: 1}}/> Вопросы
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Statistics Section */}
            <Box sx={{display: "flex", justifyContent: "center", marginBottom: 4}}>
                <Grid container spacing={3} sx={{width: "100%", justifyContent: "center"}}>
                    {/* Card for Themes */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12}
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>Темы</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentageUsed(stats.countUseThemes, stats.countThemes)}
                                    sx={{
                                        marginBottom: 2,
                                        height: 10,
                                        borderRadius: 2,
                                        backgroundColor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: "#3F51B5",
                                        }
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{fontWeight: "bold"}}>
                                    {stats.countUseThemes} / {stats.countThemes}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card for Tickets */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12}
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>Билеты</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentageUsed(stats.countUseTickets, stats.countTickets)}
                                    sx={{
                                        marginBottom: 2,
                                        height: 10,
                                        borderRadius: 2,
                                        backgroundColor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: "#4caf50",
                                        }
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{fontWeight: "bold"}}>
                                    {stats.countUseTickets} / {stats.countTickets}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Card for Questions */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            transition: "transform 0.3s",
                            "&:hover": {transform: "scale(1.05)", boxShadow: 12}
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{fontWeight: "bold", marginBottom: 2}}>Вопросы</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={percentageUsed(stats.countUseQuestions, stats.countQuestions)}
                                    sx={{
                                        marginBottom: 2,
                                        height: 10,
                                        borderRadius: 2,
                                        backgroundColor: "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: "#f44336",
                                        }
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{fontWeight: "bold"}}>
                                    {stats.countUseQuestions} / {stats.countQuestions}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* List of items */}
            <Grid container spacing={3}>
                {renderList()}
            </Grid>
        </Box>
    );
};

export default MainScreen;