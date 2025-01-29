import {Box, Typography, Button, List, ListItem, ListItemText, Divider, Paper, IconButton, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import {useParams} from "react-router-dom";
import {createOrUpdateQuestionProgress, getQuestionById} from "../api/Network";

const QuestionScreen = () => {
    const { id } = useParams();

    const [question, setQuestion] = useState(null); // Начальное значение null, чтобы отслеживать состояние загрузки
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        // Загружаем вопрос по id
        getQuestionById(id, localStorage.getItem("token"))
            .then(data => {
                setQuestion(data);
                setLoading(false); // Отключаем состояние загрузки после успешного получения данных
            })
            .catch(error => {
                console.error("Ошибка загрузки вопроса:", error);
                setLoading(false); // Отключаем состояние загрузки даже при ошибке
            });
    }, [id]);

    const handleAnswerSelection = (answer) => {
        if (!isSubmitted){
            setSelectedAnswer(answer);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer) {
            setIsSubmitted(true);
            if (selectedAnswer.isCorrect) {
                createOrUpdateQuestionProgress(id, localStorage.getItem("token")).then()
            }
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
                <CircularProgress /> {/* Индикатор загрузки */}
            </Box>
        );
    }

    if (!question) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6" color="error">
                    Вопрос не найден.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{padding: 3, maxWidth: 600, margin: "auto", borderRadius: 2, boxShadow: 3, marginTop: 5}}>
            {/* Question Title */}
            <Paper sx={{padding: 3, boxShadow: 3, backgroundColor: "#F5F5F5", marginBottom: 3}}>
                <Typography variant="h5" sx={{fontWeight: "bold", color: "#333"}}>
                    Вопрос {question.id}
                </Typography>
                <Typography variant="h6" sx={{marginTop: 1, color: "#555"}}>
                    {question.text}
                </Typography>
            </Paper>

            {/* Answers List */}
            <List sx={{marginBottom: 2}}>
                {question.answers.map((answer) => (
                    <ListItem
                        key={answer.id}
                        sx={{
                            backgroundColor: selectedAnswer?.id === answer.id ? "#d0e7f9" : "transparent",
                            borderRadius: 2,
                            marginBottom: 1,
                            padding: 2,
                            border: "1px solid #ddd",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            transition: "transform 0.3s ease, background-color 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#ece8f6",
                                cursor: "pointer",
                                transform: "scale(1.03)"
                            },
                        }}
                        onClick={() => handleAnswerSelection(answer)}
                    >
                        <ListItemText primary={answer.text} sx={{flex: 1}}/>
                        {selectedAnswer?.id === answer.id && (
                            <IconButton sx={{color: "#007BFF"}}>
                                <CheckIcon/>
                            </IconButton>
                        )}
                    </ListItem>
                ))}
            </List>

            <Divider sx={{marginBottom: 2}}/>

            {/* Submit Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                    width: "100%",
                    padding: 1.5,
                    backgroundColor: "#007BFF",
                    "&:hover": {
                        backgroundColor: "#0056b3"
                    },
                    transition: "background-color 0.3s ease",
                }}
                disabled={!selectedAnswer || isSubmitted}
            >
                Ответить
            </Button>

            {/* Result Message */}
            {isSubmitted && (
                <Box sx={{marginTop: 2, textAlign: "center"}}>
                    <Typography variant="h6" sx={{
                        fontWeight: "bold",
                        color: selectedAnswer?.isCorrect ? "green" : "red",
                        transition: "color 0.3s ease"
                    }}>
                        {selectedAnswer?.isCorrect ? "Правильный ответ!" : "Неправильный ответ!"}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default QuestionScreen;