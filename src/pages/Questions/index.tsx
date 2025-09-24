import { useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"
import { useState } from "react"
import type { IQuestion } from "../../types/store/questions"
import { FilterIcon } from "../../components/svg/icons/FilterIcon"

const QuestionsPage = () =>{
    const { questions: globalStateQuestions } = useSelector((state: RootState) => state.questionsReducer)
    const [questions, setQuestions] = useState<IQuestion[]>(globalStateQuestions)
    const [openFilters, setOpenFilters] = useState(true)
    const [filters, setFilters] = useState<string[]>([])

    const categories = [...new Set(globalStateQuestions.map(item => item.category))];
    console.log(categories)

    return (
        <div className="w-full h-screen flex justify-center items-center gap-20">
            <img
                className="w-2/5 rounded-4xl"
                src="assets/images/welcome.webp"
            />
            <div className="flex flex-col w-2/5 justify-center items-center">
                <h1 className="special-text">Questions</h1>
                
                <div className="max-w-[85%] max-h-[60vh] scrollbar-none overflow-y-auto overflow-x-hidden relative">
                <div className={`sticky top-0 z-20 bg-white flex justify-${openFilters ? "between" : "end"} items-center p-2`}>
                    {openFilters && (
                        <div className="flex overflow-x-auto overflow-y-hidden gap-5 w-[30vw] items-end rounded-2xl">
                            {categories.map(category =>(
                                <div
                                    key={category}
                                    className={`special-card whitespace-nowrap border-2 h-10 border-black rounded-2xl p-1 cursor-pointer ${
                                        filters.includes(category) ? "bg-black text-white" : ""
                                    }`}
                                    onClick={() => 
                                        filters.includes(category) 
                                            ? setFilters(filters.filter(el => el != category)) 
                                            : setFilters([...filters, category])
                                    }
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                    <FilterIcon 
                        className="w-8 h-8 cursor-pointer" 
                        onClick={() => setOpenFilters(!openFilters)}
                    />
                </div>

                <div className="flex flex-col gap-5 mt-2">
                    {questions
                        .filter(el => filters.length === 0 ? el : filters.includes(el.category))
                        .map((question, idx) => (
                            <div 
                                key={idx} 
                                className="special-card flex flex-col min-w-[550px] p-10 rounded-2xl shadow text-2xl"
                            >
                                <span className="font-bold">Question {idx+1}: {question.question}</span>
                                <br />
                                <span>Type: {question.type}</span>
                                <span>Difficulty: {question.difficulty}</span>
                                <span>Category: {question.category}</span>
                                <span>Correct Answer: {question.correct_answer}</span>
                                <span>
                                    Incorrect Answer: {question.incorrect_answers.length === 1 && question.incorrect_answers[0]}
                                </span>
                                {question.incorrect_answers.length > 1 && (
                                    <div className="flex flex-col ml-5">
                                        {question.incorrect_answers.map((answer, i) => (
                                            <span key={i}>{i+1}. {answer}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default QuestionsPage