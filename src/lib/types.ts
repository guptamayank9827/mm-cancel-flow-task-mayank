// export type QuestionType = "single-choice" | "text" | "textarea" | "radio" | "number";

export type SingleChoiceQuestion = {
    id: number,
    question: string,
    type: "single-choice",
    options: string[]
};

export type TextAreaQuestion = {
    id: number,
    question: string,
    type: "textarea",
    minChars: number
};

export type RadioQuestion = {
    id: number,
    question: string,
    type: "radio",
    options: string[]
};

export type TextQuestion = {
    id: number,
    question: string,
    type: "text"
};

export type NumberQuestion = {
    id: number,
    question: string,
    type: "number",
    symbol: string
};

export type Question = SingleChoiceQuestion | TextAreaQuestion | RadioQuestion | TextQuestion | NumberQuestion;