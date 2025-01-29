import axios from 'axios';

// Base API URL
const API_URL = 'https://spotdiff.ru/driving-school-api';

// 1. Sign Up (Create User)
export const signUp = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/security/sign-up`, userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
};

// 2. Sign In (Login User)
export const signIn = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/users/security/sign-in`, loginData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error("Sign in error:", error);
        throw error;
    }
};

// 3. Create or Update Question Progress
export const createOrUpdateQuestionProgress = async (id, progressData, token) => {
    try {
        const response = await axios.post(`${API_URL}/users/progress/question/${id}`, progressData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Create/Update progress error:", error);
        throw error;
    }
};

// 4. Get User Progress
export const getUserProgress = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/progress`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get progress error:", error);
        throw error;
    }
};

// 5. Get User Info
export const getUserInfo = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/info`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get user info error:", error);
        throw error;
    }
};

// 6. Get All Tickets
export const getAllTickets = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tickets`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get tickets error:", error);
        throw error;
    }
};

// 7. Get Ticket by ID
export const getTicketById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/tickets/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get ticket by ID error:", error);
        throw error;
    }
};

// 8. Get All Themes
export const getAllThemes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/themes`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get themes error:", error);
        throw error;
    }
};

// 9. Get Theme by ID
export const getThemeById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/themes/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get theme by ID error:", error);
        throw error;
    }
};

// 10. Get All Tickets by Theme ID
export const getAllTicketsByThemeId = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/themes/${id}/tickets`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get tickets by theme ID error:", error);
        throw error;
    }
};

// 11. Get All Questions by Theme ID
export const getAllQuestionsByThemeId = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/themes/${id}/questions`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get questions by theme ID error:", error);
        throw error;
    }
};

// 12. Get All Questions
export const getAllQuestions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/questions`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get all questions error:", error);
        throw error;
    }
};

// 13. Get Question by ID
export const getQuestionById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/questions/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Get question by ID error:", error);
        throw error;
    }
};

export const isUserLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};