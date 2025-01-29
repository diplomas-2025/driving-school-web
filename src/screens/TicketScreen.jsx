import {Box, Typography, Button, List, ListItem, ListItemText, Divider, Paper, IconButton, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import {useParams} from "react-router-dom";
import {createOrUpdateQuestionProgress, getTicketById} from "../api/Network";

const TicketScreen = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null); // Начальное значение null для отслеживания загрузки
    const [answers, setAnswers] = useState([]); // Хранит выбранные ответы для каждого вопроса
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        // Загружаем данные билета
        getTicketById(id, localStorage.getItem("token"))
            .then(data => {
                setTicket(data);
                setAnswers(data.questions.map(() => null)); // Инициализация пустых ответов для вопросов
                setLoading(false); // Отключаем индикатор загрузки
            })
            .catch(error => {
                console.error("Ошибка загрузки билета:", error);
                setLoading(false); // Отключаем индикатор загрузки при ошибке
            });
    }, [id]);

    const handleAnswerSelection = (questionIndex, answer) => {
        if (isSubmitted) return
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        ticket.questions.forEach((question, index) => {
            if (answers[index] && answers[index].isCorrect) {
                createOrUpdateQuestionProgress(question.id, localStorage.getItem("token")).then()
            }
        })
    };

    const calculateResults = () => {
        let correctCount = 0;
        ticket.questions.forEach((question, index) => {
            if (answers[index] && answers[index].isCorrect) {
                correctCount++;
            }
        });
        return correctCount;
    };

    const getIncorrectAnswers = () => {
        return ticket.questions.map((question, index) => {
            if (answers[index] && !answers[index].isCorrect) {
                return {
                    questionText: question.text,
                    correctAnswer: question.answers.find(answer => answer.isCorrect).text,
                    selectedAnswer: answers[index].text
                };
            }
            return null;
        }).filter(item => item !== null);
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

    if (!ticket) {
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
                    Билет не найден.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, margin: "auto", borderRadius: 2, boxShadow: 3, marginTop: 5 }}>
            {/* Ticket Title */}
            <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "#F5F5F5", marginBottom: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
                    {ticket.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "#555" }}>
                    {ticket.theme.name}: {ticket.theme.description}
                </Typography>
            </Paper>

            {/* Questions List */}
            {ticket.questions.map((question, index) => (
                <Paper key={question.id} sx={{ padding: 2, marginBottom: 2, backgroundColor: "#f9f9f9" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                        {question.text}
                    </Typography>

                    <List sx={{ marginBottom: 2 }}>
                        {question.answers.map((answer) => (
                            <ListItem
                                key={answer.id}
                                sx={{
                                    backgroundColor: answers[index]?.id === answer.id ? "#d0e7f9" : "transparent",
                                    borderRadius: 1,
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
                                onClick={() => handleAnswerSelection(index, answer)}
                            >
                                <ListItemText primary={answer.text} sx={{ flex: 1 }} />
                                {answers[index]?.id === answer.id && (
                                    <IconButton sx={{ color: "#007BFF" }}>
                                        <CheckIcon />
                                    </IconButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ))}

            <Divider sx={{ marginBottom: 2 }} />

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
                disabled={answers.includes(null)} // Disable submit if any answer is missing
            >
                Завершить
            </Button>

            {/* Results */}
            {isSubmitted && (
                <Box sx={{ marginTop: 2, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                        Результаты:
                    </Typography>
                    <Typography variant="body1" sx={{ color: "green" }}>
                        Правильных ответов: {calculateResults()} / {ticket.questions.length}
                    </Typography>

                    {/* Incorrect Answers */}
                    {getIncorrectAnswers().map((incorrect, index) => (
                        <Paper key={index} sx={{ padding: 2, marginTop: 2, backgroundColor: "#ffebee" }}>
                            <Typography variant="body1" sx={{ color: "#d32f2f" }}>
                                Вопрос: {incorrect.questionText}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#1976d2" }}>
                                Правильный ответ: {incorrect.correctAnswer}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                                Ваш ответ: {incorrect.selectedAnswer}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TicketScreen;