export type QuestionType = "single-choice" | "text";

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

export type Question = SingleChoiceQuestion | TextAreaQuestion;