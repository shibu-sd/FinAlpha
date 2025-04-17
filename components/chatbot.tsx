"use client"

import { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleGenAI } from "@google/genai";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isLoading?: boolean;
}

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPulse, setShowPulse] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hey👋 I'm Alpha, your financial assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Show pulse animation periodically
    useEffect(() => {
        if (!isOpen) {
            const interval = setInterval(() => {
                setShowPulse(true);
                setTimeout(() => setShowPulse(false), 4000);
            }, 10000);

            setShowPulse(true);

            return () => clearInterval(interval);
        } else {
            setShowPulse(false);
        }
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(prev => !prev);
    };

    const generateBotResponse = async (userQuestion: string) => {
        try {
            const loadingMessageId = Date.now().toString() + '-loading';

            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: loadingMessageId,
                    text: "",
                    sender: 'bot',
                    timestamp: new Date(),
                    isLoading: true
                }
            ]);

            setIsGenerating(true);

            const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });
            const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.0-flash-lite";
            const prompt = `You are Alpha, a friendly and helpful financial assistant tailored for users in India. You provide clear, concise, and accurate information about personal finance, investing, budgeting, saving, retirement planning, taxes, loans, and other financial topics specific to the Indian context.
            Mention schemes, instruments, or concepts relevant to India such as SIPs, PPF, NPS, EPF, mutual funds, fixed deposits, income tax slabs, and digital payment options like UPI. Avoid jargon unless explained simply.
            Use INR (₹) for currency, and explain using examples familiar to Indian users. For variable or regional data (like interest rates or tax limits), provide general guidelines.
            Keep your answers conversational and under 150 words when possible.
            USER QUESTION: ${userQuestion}`;

            const result = await ai.models.generateContent({
                model: model,
                contents: prompt
            });

            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== loadingMessageId));

            const responseText = result.text || "I'm sorry, I couldn't generate a response at this time. Please try asking something else about finance.";

            const botMessage: Message = {
                id: Date.now().toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error generating response:', error);
            setMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: "I'm having trouble connecting to my knowledge base right now. Could you try again or ask something else ?",
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isGenerating) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        const userQuestion = input;
        setInput('');

        await generateBotResponse(userQuestion);
    };

    const primaryColor = '#0f9d58';

    return (
        <div className="fixed bottom-5 right-5 z-[9999]">

            <button
                onClick={toggleChat}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105",
                    "relative",
                    isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
                style={{ backgroundColor: primaryColor, color: '#ffffff' }}
                aria-label="Open Financial Assistant"
            >

                {showPulse && (
                    <div className="absolute inset-0 z-0">
                        <span
                            className="absolute inset-0 rounded-full opacity-30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
                            style={{ backgroundColor: 'green' }}
                        />
                        <span
                            className="absolute inset-0 rounded-full opacity-75"
                            style={{ backgroundColor: primaryColor }}
                        />
                    </div>
                )}
                <Bot size={26} className="relative z-10" />
            </button>

            {/* Chat */}
            <div className={cn(
                "fixed bottom-5 right-5 w-80 md:w-96 h-[70vh] max-h-[600px] rounded-2xl shadow-xl flex flex-col transform transition-all duration-300 ease-in-out z-[9999]",
                isOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-4 opacity-0 scale-95 pointer-events-none",
                "bg-card"
            )}>

                {/* Chat Header */}
                <div
                    className="flex items-center justify-between px-4 py-3 rounded-t-2xl"
                    style={{ backgroundColor: primaryColor, color: '#ffffff' }}
                >
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-full">
                            <Bot size={18} />
                        </div>
                        <h3 className="font-semibold">Alpha</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:bg-white/20 h-8 w-8"
                    >
                        <X size={18} />
                    </Button>
                </div>

                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex",
                                message.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2",
                                    message.sender === 'user'
                                        ? "rounded-tr-none bg-primary text-primary-foreground"
                                        : "rounded-tl-none bg-muted text-foreground shadow-sm"
                                )}
                            >
                                {message.sender === 'bot' && (
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: primaryColor }}
                                        >
                                            Alpha
                                        </span>
                                    </div>
                                )}

                                {message.isLoading ? (
                                    <div className="flex items-center justify-center py-2">
                                        <Loader2 className="h-5 w-5 animate-spin mr-2 text-primary" />
                                        <span className="text-sm">Thinking...</span>
                                    </div>
                                ) : (
                                    <p className="text-sm">{message.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-3 border-t bg-background">
                    <form
                        className="flex items-center gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        <Input
                            placeholder="Type your financial question here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-muted/50"
                            disabled={isGenerating}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-10 w-10 hover:opacity-90"
                            style={{ backgroundColor: primaryColor }}
                            disabled={isGenerating || !input.trim()}
                        >
                            <SendHorizontal size={18} className="text-white" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};