"use client"

import { useState } from "react";
import { HeroHeader } from "@/components/hero/hero-header";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { mockQuizData } from "@/lib/quiz-mock-data";
import Link from "next/link";

interface QuizQuestion {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_answer: string;
    explaination: string;
}

interface QuizData {
    [key: string]: QuizQuestion;
}

export default function Features() {
    const [quizState, setQuizState] = useState<'idle' | 'loading' | 'started' | 'completed' | 'error'>('idle');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showExplanation, setShowExplanation] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizData = async () => {
        setQuizState('loading');
        setError(null);

        try {
            const CACHE_KEY = 'quiz_cache';
            const CACHE_TIME_KEY = 'quiz_cache_time';
            const CACHE_VERSION_KEY = 'quiz_cache_version';
            const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
            const CURRENT_VERSION = '2'; // Increment this to invalidate old caches

            const cachedQuiz = localStorage.getItem(CACHE_KEY);
            const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
            const cacheVersion = localStorage.getItem(CACHE_VERSION_KEY);

            if (cachedQuiz && cacheTime && cacheVersion === CURRENT_VERSION) {
                const age = Date.now() - parseInt(cacheTime);
                if (age < CACHE_DURATION) {
                    const parsedQuiz = JSON.parse(cachedQuiz);
                    
                    // Still normalize cached data to be safe
                    Object.keys(parsedQuiz).forEach(key => {
                        const question = parsedQuiz[key];
                        let correctAnswer = String(question.correct_answer).trim();
                        
                        if (correctAnswer.match(/^option[1-4]$/i)) {
                            const fieldName = correctAnswer.toLowerCase() as 'option1' | 'option2' | 'option3' | 'option4';
                            correctAnswer = String(question[fieldName]).trim();
                            question.correct_answer = correctAnswer;
                        }
                    });
                    
                    setQuizData(parsedQuiz);
                    setQuizState('started');
                    return;
                }
            }
            
            // Clear old cache if version mismatch
            if (cacheVersion !== CURRENT_VERSION) {
                localStorage.removeItem(CACHE_KEY);
                localStorage.removeItem(CACHE_TIME_KEY);
                localStorage.removeItem(CACHE_VERSION_KEY);
            }

            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            
            if (!apiKey) {
                throw new Error('Gemini API key not configured');
            }

            const ai = new GoogleGenAI({ apiKey });
            const modelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash-lite";

            const prompt = `You are a financial education expert. Generate a **completely unique** 10-question multiple choice quiz each time on the topic of **basic finance, stocks, and mutual funds**. The questions should be **easy to medium**, designed for **beginners**, and cover a **variety of subtopics** such as savings, investing, risk, diversification, mutual fund basics, stock terminology, etc.
            Each question must include:
            - A clear question under the "question" key.
            - Four answer choices under "option1", "option2", "option3", and "option4".
            - The correct answer under "correct_answer" - THIS MUST BE THE EXACT FULL TEXT of one of the four options (NOT "option1" or "option2", but the actual answer text).
            - A brief explanation under "explaination", describing why the selected answer is correct.
            Return the output strictly in the following JSON format:
            {
              "1": {
                "question": "What is diversification in investing?",
                "option1": "Investing all money in one stock",
                "option2": "Spreading investments across different assets",
                "option3": "Keeping all money in savings account",
                "option4": "Only buying government bonds",
                "correct_answer": "Spreading investments across different assets",
                "explaination": "Diversification means spreading investments across different assets to reduce risk. This helps protect your portfolio if one investment performs poorly."
              },
              ...
              "10": {
                "question": "...",
                "option1": "...",
                "option2": "...",
                "option3": "...",
                "option4": "...",
                "correct_answer": "...",
                "explaination": "..."
              }
            }
            IMPORTANT: The "correct_answer" must be the EXACT FULL TEXT from one of the options, NOT "option1" or "option2".
            Do not include any introductory text or commentary—just return the pure JSON object.`;

            const result = await ai.models.generateContent({
                model: modelName,
                contents: prompt
            });

            // Extract text from response
            let responseText = '';
            if (result.text) {
                responseText = result.text;
            } else if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
                responseText = result.candidates[0].content.parts[0].text;
            } else {
                throw new Error('No content in response - unexpected format');
            }

            if (!responseText || responseText.trim().length === 0) {
                throw new Error('No content in response - empty text');
            }

            // Try to extract JSON from response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Could not parse JSON from response');
            }

            const quizJson = JSON.parse(jsonMatch[0]);
            
            // Validate quiz structure
            if (!quizJson["1"] || !quizJson["1"].question) {
                throw new Error('Invalid quiz data structure');
            }
            
            // Validate and normalize correct_answer for each question
            Object.keys(quizJson).forEach(key => {
                const question = quizJson[key];
                let correctAnswer = String(question.correct_answer).trim();
                
                // Check if correct_answer is a field name (option1, option2, etc.)
                if (correctAnswer.match(/^option[1-4]$/i)) {
                    // Convert field name to actual value
                    const fieldName = correctAnswer.toLowerCase() as 'option1' | 'option2' | 'option3' | 'option4';
                    correctAnswer = String(question[fieldName]).trim();
                    question.correct_answer = correctAnswer;
                }
                
                const options = [
                    String(question.option1).trim(),
                    String(question.option2).trim(),
                    String(question.option3).trim(),
                    String(question.option4).trim()
                ];
                
                // Find matching option (case-insensitive)
                const matchingOption = options.find(opt => 
                    opt.toLowerCase() === correctAnswer.toLowerCase()
                );
                
                if (matchingOption) {
                    // Normalize correct_answer to match the exact option text
                    question.correct_answer = matchingOption;
                }
            });
            
            // Cache the quiz with version
            localStorage.setItem(CACHE_KEY, JSON.stringify(quizJson));
            localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
            localStorage.setItem(CACHE_VERSION_KEY, CURRENT_VERSION);
            
            setQuizData(quizJson);
            setQuizState('started');
        } catch (error) {
            console.error('Error fetching quiz:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            // Check if it's a rate limit error (429) or quota exceeded
            const isRateLimitError = errorMessage.includes('429') || 
                                    errorMessage.toLowerCase().includes('quota') || 
                                    errorMessage.toLowerCase().includes('rate limit') ||
                                    errorMessage.includes('RESOURCE_EXHAUSTED');
            
            if (isRateLimitError) {
                setError('⚠️ API rate limit reached. Showing demo quiz for now. Try again in a few minutes for AI-generated questions.');
                setQuizData(mockQuizData);
                setQuizState('started');
            } else if (errorMessage.includes('API key')) {
                setError('API key is missing or invalid. Please check your configuration.');
                setQuizState('error');
            } else if (process.env.NODE_ENV === 'development') {
                // If in development, use mock data for any error
                setError('Development mode: Using mock quiz data');
                setQuizData(mockQuizData);
                setQuizState('started');
            } else {
                setError('Unable to generate quiz. Please try again later.');
                setQuizState('error');
            }
        }
    };

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: answer
        });
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswers[currentQuestion] || !quizData) return;

        setShowExplanation(true);

        const currentQuestionKey = String(currentQuestion);
        const questionData = quizData[currentQuestionKey];
        const selectedAnswer = selectedAnswers[currentQuestion].trim().toLowerCase();
        const correctAnswer = String(questionData.correct_answer).trim().toLowerCase();
        
        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowExplanation(false);
        if (currentQuestion < 10) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizState('completed');
        }
    };

    const handleRestartQuiz = () => {
        setQuizState('idle');
        setCurrentQuestion(1);
        setSelectedAnswers({});
        setShowExplanation(false);
        setScore(0);
        setQuizData(null);
        setError(null);
    };

    const handleGenerateNewQuiz = () => {
        // Clear cache to force new quiz generation
        localStorage.removeItem('quiz_cache');
        localStorage.removeItem('quiz_cache_time');
        localStorage.removeItem('quiz_cache_version');
        fetchQuizData();
    };

    return (
        <>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">Your Daily Dose of Financial Trivia</h2>
                        <p className="text-muted-foreground mt-6">Discover how much you really know about finance with fun, engaging quizzes that educate while you play.</p>
                    </div>

                    {quizState === 'idle' && (
                        <div className="text-center">
                            <Card className="mx-auto max-w-lg">
                                <CardHeader>
                                    <CardTitle>Ready to test your financial knowledge ?</CardTitle>
                                    <CardDescription>
                                        This quiz contains 10 multiple-choice questions about basic finance concepts.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-6">
                                    <p className="mb-6">
                                        Each question has four options with one correct answer. After selecting your answer,
                                        you'll get an explanation to help you learn as you go.
                                    </p>
                                    <button
                                        onClick={fetchQuizData}
                                        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                    >
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A7F3D0_0%,#065F46_50%,#A7F3D0_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-base font-medium text-white backdrop-blur-3xl">
                                            Start Quiz
                                        </span>
                                    </button>

                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {quizState === 'loading' && (
                        <div className="text-center">
                            <Card className="mx-auto max-w-lg">
                                <CardHeader>
                                    <CardTitle>Generating Your Quiz</CardTitle>
                                    <CardDescription>
                                        We're creating personalized finance questions for you.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center py-12">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                                    <p>Please wait while we prepare your financial knowledge challenge...</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {quizState === 'error' && (
                        <div className="text-center">
                            <Card className="mx-auto max-w-lg">
                                <CardHeader>
                                    <CardTitle>Something went wrong</CardTitle>
                                    <CardDescription>
                                        We couldn't generate the quiz at this time.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-6">
                                    <p className="mb-6">
                                        There was an error connecting to our quiz generator.
                                        {error && <span className="block mt-2 text-red-500">{error}</span>}
                                    </p>
                                    <Button size="lg" onClick={handleRestartQuiz}>
                                        Try Again
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {quizState === 'started' && quizData && (
                        <div>
                            {error && (
                                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                    <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                                        {error}
                                    </p>
                                </div>
                            )}
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    <span>Question {currentQuestion} of 10</span>
                                    <span>Score: {score}/10</span>
                                </div>
                                <Progress value={currentQuestion * 10} className="h-2" />
                            </div>

                            <Card className="mx-auto">
                                <CardHeader>
                                    <CardTitle>{quizData[String(currentQuestion)].question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup
                                        value={selectedAnswers[currentQuestion]}
                                        onValueChange={handleAnswerSelect}
                                        className="space-y-3"
                                    >
                                        {['option1', 'option2', 'option3', 'option4'].map((option) => {
                                            const currentQuestionData = quizData[String(currentQuestion)];
                                            const optionValue = String(currentQuestionData[option as keyof QuizQuestion]);
                                            const correctAnswer = String(currentQuestionData.correct_answer).trim().toLowerCase();
                                            const isCorrectAnswer = optionValue.trim().toLowerCase() === correctAnswer;
                                            const isSelectedAnswer = selectedAnswers[currentQuestion] === optionValue;
                                            
                                            return (
                                            <div
                                                key={option}
                                                className={`flex items-center space-x-2 rounded-md border p-3
                                                    ${showExplanation && isCorrectAnswer
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                                                        : ''
                                                    }
                                                    ${showExplanation && isSelectedAnswer && !isCorrectAnswer
                                                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                                                        : ''
                                                    }
                                                `}
                                            >
                                                <RadioGroupItem
                                                    value={optionValue}
                                                    id={option}
                                                    disabled={showExplanation}
                                                />
                                                <Label htmlFor={option} className="flex-1 cursor-pointer">
                                                    {optionValue}
                                                </Label>
                                            </div>
                                            );
                                        })}
                                    </RadioGroup>

                                    {showExplanation && (
                                        <div className="mt-6 p-4 bg-muted rounded-md">
                                            <h4 className="font-semibold mb-2">Explanation:</h4>
                                            <p>{quizData[String(currentQuestion)].explaination}</p>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {!showExplanation ? (
                                        <Button
                                            onClick={handleCheckAnswer}
                                            disabled={!selectedAnswers[currentQuestion]}
                                        >
                                            Check Answer
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNextQuestion}>
                                            {currentQuestion < 10 ? 'Next Question' : 'See Results'}
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                    )}

                    {quizState === 'completed' && (
                        <div className="text-center">
                            <Card className="mx-auto max-w-lg">
                                <CardHeader>
                                    <CardTitle>Quiz Complete!</CardTitle>
                                    <CardDescription>
                                        You've finished the finance knowledge quiz
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="py-6">
                                    <div className="mb-8">
                                        <div className="text-center mb-4">
                                            <span className="text-4xl font-bold text-primary">{score}</span>
                                            <span className="text-4xl font-bold text-muted-foreground">/10</span>
                                        </div>
                                        <Progress value={score * 10} className="h-4" />
                                    </div>

                                    <div className="text-center mt-4">
                                        {score === 10 ? (
                                            <p className="text-lg font-medium text-green-600 dark:text-green-400">
                                                Perfect score! You're a finance expert!
                                            </p>
                                        ) : score >= 7 ? (
                                            <p className="text-lg font-medium text-green-600 dark:text-green-400">
                                                Great job! You have a solid understanding of finance basics.
                                            </p>
                                        ) : score >= 5 ? (
                                            <p className="text-lg font-medium text-amber-600 dark:text-amber-400">
                                                Good effort! You're on your way to understanding finance.
                                            </p>
                                        ) : (
                                            <p className="text-lg font-medium text-red-600 dark:text-red-400">
                                                Keep learning! Financial literacy is a journey.
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center space-x-4">
                                    <Button variant="outline" onClick={handleRestartQuiz}>
                                        Try Again
                                    </Button>
                                    <Button variant="outline" onClick={handleGenerateNewQuiz}>
                                        New Quiz
                                    </Button>
                                    <Button asChild>
                                        <Link href="/">
                                            Home
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}