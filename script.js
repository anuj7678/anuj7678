import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBkrphhmBvFzhyKreR0fuzBZGXBpPuvMw4";
const QUESTIONS = [
    "What is the capital of France?",
    "How does photosynthesis work?",
    "What are the benefits of exercise?",
    "Can you explain quantum mechanics?",
    "What is the theory of relativity?"
];

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let currentIndex = 0;

async function generateAnswer(question) {
    try {
        console.log("Generating answer for:", question);
        const result = await model.generateContent(question);
        console.log("API Response:", result);
        document.getElementById("answer").innerText = result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        document.getElementById("answer").innerText = "Error generating answer.";
    }
}

function updateQuestionDisplay() {
    if (currentIndex >= 0 && currentIndex < QUESTIONS.length) {
        document.getElementById("question-input").value = QUESTIONS[currentIndex];
    } else {
        document.getElementById("question-input").value = "";
    }
}

updateQuestionDisplay();

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuestionDisplay();
    } else {
        document.getElementById("answer").innerText = "This is the first question.";
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentIndex < QUESTIONS.length - 1) {
        currentIndex++;
        updateQuestionDisplay();
    } else {
        document.getElementById("answer").innerText = "This is the last question.";
    }
});

document.getElementById("submit-btn").addEventListener("click", () => {
    const question = document.getElementById("question-input").value.trim();
    if (question) {
        generateAnswer(question);
    } else {
        document.getElementById("answer").innerText = "Please enter a question.";
    }
});