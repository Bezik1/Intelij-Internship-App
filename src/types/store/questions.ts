export interface IQuestion {
    type: "boolean" | "multiple"
    difficulty: "easy" | "medium" | "hard"
    question: string,
    correct_answer: string
    incorrect_answers: [string, string, string] | [string]
    category: string
}

export type QuestionsState = {
    questions: IQuestion[]
    isLoading: boolean;
    error: {
        status: string
        message: string
    } | null
}