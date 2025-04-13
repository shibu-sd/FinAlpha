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

export const mockQuizData: QuizData = {
    "1": {
        "question": "What is a stock?",
        "option1": "A type of bond issued by corporations",
        "option2": "A share of ownership in a company",
        "option3": "A loan given to governments",
        "option4": "A type of real estate investment",
        "correct_answer": "A share of ownership in a company",
        "explaination": "A stock represents a share of ownership in a company. When you buy a stock, you're purchasing a small piece of that company and become a shareholder."
    },
    "2": {
        "question": "What is a mutual fund?",
        "option1": "A type of bank account",
        "option2": "A government bond",
        "option3": "A pool of money from multiple investors used to purchase securities",
        "option4": "A personal retirement account",
        "correct_answer": "A pool of money from multiple investors used to purchase securities",
        "explaination": "A mutual fund collects money from many investors and invests it in stocks, bonds, or other assets. This allows individual investors to access professionally managed, diversified portfolios."
    },
    "3": {
        "question": "What does EMI stand for in finance?",
        "option1": "Equated Monthly Income",
        "option2": "Estimated Money Interest",
        "option3": "Equated Monthly Installment",
        "option4": "Equal Money Investment",
        "correct_answer": "Equated Monthly Installment",
        "explaination": "EMI stands for Equated Monthly Installment. It's the fixed payment amount made by a borrower to a lender at a specified date each month, typically used for loan repayments."
    },
    "4": {
        "question": "What is compound interest?",
        "option1": "Interest calculated only on the initial principal",
        "option2": "Interest calculated on the initial principal and on the accumulated interest",
        "option3": "A fixed amount of interest paid monthly",
        "option4": "Interest paid only at the end of a loan term",
        "correct_answer": "Interest calculated on the initial principal and on the accumulated interest",
        "explaination": "Compound interest is calculated on both the initial principal and the accumulated interest from previous periods. This causes your money to grow at an accelerating rate over time."
    },
    "5": {
        "question": "What is diversification in investing?",
        "option1": "Investing all your money in one promising stock",
        "option2": "Spreading investments across various assets to reduce risk",
        "option3": "Changing your investment strategy frequently",
        "option4": "Investing only in government securities",
        "correct_answer": "Spreading investments across various assets to reduce risk",
        "explaination": "Diversification involves spreading your investments across different asset classes, industries, and regions to reduce risk. This strategy helps to minimize the impact of poor performance in any single investment."
    },
    "6": {
        "question": "What is a bull market?",
        "option1": "A market where prices are falling",
        "option2": "A market where prices are rising",
        "option3": "A market with no price movement",
        "option4": "A market controlled by large institutional investors",
        "correct_answer": "A market where prices are rising",
        "explaination": "A bull market refers to a period when stock prices are rising or expected to rise. It typically indicates investor confidence and economic growth."
    },
    "7": {
        "question": "What is a bear market?",
        "option1": "A market where prices are falling",
        "option2": "A market where prices are rising",
        "option3": "A market focused on natural resources",
        "option4": "A market with high trading volume",
        "correct_answer": "A market where prices are falling",
        "explaination": "A bear market is characterized by falling stock prices and pessimism among investors. Typically, a bear market is defined as a period when stock prices fall 20% or more from recent highs."
    },
    "8": {
        "question": "What is an index fund?",
        "option1": "A fund that invests only in small companies",
        "option2": "A fund managed actively by financial experts",
        "option3": "A fund that aims to track and match the performance of a specific market index",
        "option4": "A high-risk investment fund",
        "correct_answer": "A fund that aims to track and match the performance of a specific market index",
        "explaination": "An index fund is a type of mutual fund or ETF that aims to track the returns of a market index, such as the S&P 500. These funds offer broad market exposure, low operating expenses, and low portfolio turnover."
    },
    "9": {
        "question": "What is inflation?",
        "option1": "The increase in a country's GDP",
        "option2": "The general increase in prices and fall in the purchasing value of money",
        "option3": "The decrease in interest rates",
        "option4": "The reduction in government spending",
        "correct_answer": "The general increase in prices and fall in the purchasing value of money",
        "explaination": "Inflation is the rate at which the general level of prices for goods and services rises, causing purchasing power to fall. It's typically measured as an annual percentage increase."
    },
    "10": {
        "question": "What is a SIP in mutual funds?",
        "option1": "Systematic Investment Plan",
        "option2": "Special Interest Payment",
        "option3": "Secure Investment Protocol",
        "option4": "Standard Income Procedure",
        "correct_answer": "Systematic Investment Plan",
        "explaination": "SIP stands for Systematic Investment Plan. It allows investors to invest a fixed amount regularly in a mutual fund scheme, typically monthly or quarterly, rather than making a lump-sum investment."
    }
};