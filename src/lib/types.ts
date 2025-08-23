export type QuestionType = "single-choice" | "text";

export type SingleChoiceQuestion = {
    id: number,
    question: string,
    type: "single-choice",
    options: string[]
};

export type Question = SingleChoiceQuestion;