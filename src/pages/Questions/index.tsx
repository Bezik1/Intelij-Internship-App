import { useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"

const QuestionsPage = () =>{
    const { questions } = useSelector((state: RootState) => state.questionsReducer)

    return (
        <div className="w-full h-screen flex justify-center items-center gap-20">
            <img
                className="w-2/5 rounded-4xl"
                src="assets/images/base.webp"
            />
            <div className="flex flex-col w-2/5 justify-center items-center">
                <h1 className="special-text">Questions</h1>
                
                <div className="max-w-[90%] max-h-[60vh] overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col space-x-4 gap-5">
                        {questions.map((question, idx) => (
                            <div 
                                key={idx} 
                                className="special-card flex flex-col min-w-[550px] p-10 rounded-2xl shadow text-2xl"
                            >
                                <span className="font-bold">Question {idx+1}: {question.question}</span>
                                <br />
                                <span>Type: {question.type}</span>
                                <span>Difficulty: {question.difficulty}</span>
                                <span>Correct Answer: {question.correct_answer}</span>
                                <span>Incorrect Answer: {question.incorrect_answers.length == 1 && question.incorrect_answers[0]}</span>
                                {question.incorrect_answers.length > 1 && <div className="flex flex-col ml-5">
                                    {question.incorrect_answers.map((answer, i) =>(
                                        <span>{i+1}.    {answer}</span>
                                        )
                                    )}
                                </div> }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionsPage