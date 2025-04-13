"use client"

import { useState } from "react";
import FooterSection from "@/components/footer";
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

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
            const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash-lite";
            
            const prompt = `You are a financial education expert. Generate a **completely unique** 10-question multiple choice quiz each time on the topic of **basic finance, stocks, and mutual funds**. The questions should be **easy to medium**, designed for **beginners**, and cover a **variety of subtopics** such as savings, investing, risk, diversification, mutual fund basics, stock terminology, etc.
            Each question must include:
            - A clear question under the "question" key.
            - Four answer choices under "option1", "option2", "option3", and "option4".
            - The correct answer under "correct_answer", matching one of the four options.
            - A brief explanation under "explaination", describing why the selected answer is correct.
            Return the output strictly in the following JSON format:
            {
              "1": {
                "question": "...",
                "option1": "...",
                "option2": "...",
                "option3": "...",
                "option4": "...",
                "correct_answer": "...",
                "explaination": "..."
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
            Do not include any introductory text or commentary—just return the pure JSON object.`;

            const result = await ai.models.generateContent({
                model: model,
                contents: prompt
            });

            const responseText = result.text;

            if (!responseText) {
                throw new Error('No content in response');
            }

            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Could not parse JSON from response');
            }

            const quizJson = JSON.parse(jsonMatch[0]);
            console.log(quizJson);
            setQuizData(quizJson);
            setQuizState('started');
        } catch (error) {
            console.error('Error fetching quiz:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');

            // If in development or if API fails, use mock data for testing
            if (process.env.NODE_ENV === 'development') {
                setQuizData(mockQuizData);
                setQuizState('started');
            } else {
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
        if (selectedAnswers[currentQuestion] === quizData[currentQuestionKey].correct_answer) {
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

    return (
        <>
            <HeroHeader />

            <div className="relative py-16 md:py-32 bg-background">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mx-auto max-w-3xl text-center mb-16">
                        <h2 className="text-balance text-3xl md:text-4xl lg:text-5xl">
                            Your Daily Dose of Financial Trivia
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Discover how much you really know about finance with fun, engaging quizzes that educate while you play.
                        </p>
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
                                    <Button size="lg" onClick={fetchQuizData}>
                                        Start Quiz
                                    </Button>
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
                                        {['option1', 'option2', 'option3', 'option4'].map((option) => (
                                            <div
                                                key={option}
                                                className={`flex items-center space-x-2 rounded-md border p-3
                                                    ${showExplanation && quizData[String(currentQuestion)].correct_answer === quizData[String(currentQuestion)][option as keyof QuizQuestion]
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                                                        : ''
                                                    }
                                                    ${showExplanation && selectedAnswers[currentQuestion] === quizData[String(currentQuestion)][option as keyof QuizQuestion] &&
                                                        quizData[String(currentQuestion)].correct_answer !== quizData[String(currentQuestion)][option as keyof QuizQuestion]
                                                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                                                        : ''
                                                    }
                                                `}
                                            >
                                                <RadioGroupItem
                                                    value={quizData[String(currentQuestion)][option as keyof QuizQuestion]}
                                                    id={option}
                                                    disabled={showExplanation}
                                                />
                                                <Label htmlFor={option} className="flex-1 cursor-pointer">
                                                    {quizData[String(currentQuestion)][option as keyof QuizQuestion]}
                                                </Label>
                                            </div>
                                        ))}
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

            <FooterSection />
        </>
    );
}