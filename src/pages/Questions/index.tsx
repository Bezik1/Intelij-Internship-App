import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"
import { useEffect, useState } from "react"
import type { IQuestion } from "../../types/store/questions"
import { FilterIcon } from "../../components/svg/icons/FilterIcon"
import { PieIcon } from "../../components/svg/icons/PieIcon"
import { useNavigate } from "react-router-dom"
import { QuitIcon } from "../../components/svg/icons/QuitIcon"
import { setError } from "../../state/questions/questionsSlice"
import { CATEGORY_FILTER_COLORS } from "../../const/colors"

const QuestionsPage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { questions: globalStateQuestions } = useSelector((state: RootState) => state.questionsReducer)
    const [questions, setQuestions] = useState<IQuestion[]>(globalStateQuestions)
    const [openFilters, setOpenFilters] = useState(true)
    const [filters, setFilters] = useState<string[]>([])

    useEffect(() =>{
        if(questions.length != 0) return;
        
        dispatch(setError({
            status: "400",
            message: "Failed to fetch questions!"
        }))
        navigate("/error")
    }, [questions])

    const categories = [...new Set(globalStateQuestions.map(item => item.category))];
    return (
        <div className="w-full h-screen flex justify-center items-center gap-20">
            <img
                className="w-2/5 rounded-4xl"
                src="assets/images/welcome.webp"
            />
            <div className="flex flex-col w-2/5 justify-center items-center gap-0">
                <h1 className="special-text mb-5">Questions</h1>
                
                <div className="max-w-[85%] max-h-[60vh] scrollbar-none overflow-y-auto overflow-x-hidden mb-20">
                    <div className={`sticky h-20 top-0 z-20 bg-white flex justify-${openFilters ? "between" : "end"} gap-5 items-end p-2`}>
                        {openFilters && (
                            <div className="flex h-20 overflow-x-auto overflow-y-hidden gap-5 w-[28vw] items-end rounded-2xl">
                                {categories.map((category, i) =>(
                                    <div
                                        key={category}
                                        className={`special-card whitespace-nowrap border-2 h-10 rounded-2xl p-1 cursor-pointer transform transition-transform duration-300 ease-out
                                            hover:-translate-y-2
                                            ${filters.includes(category) ? "-translate-y-2" : ""}`}
                                        style={{ backgroundColor: CATEGORY_FILTER_COLORS[i % CATEGORY_FILTER_COLORS.length] }}
                                        onClick={() =>
                                            filters.includes(category)
                                                ? setFilters(filters.filter(el => el !== category))
                                                : setFilters([...filters, category])
                                        }
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex gap-5 items-center justify-center mb-1">
                            <FilterIcon 
                                className="w-8 h-8 cursor-pointer transform transition-transform duration-700 ease-out hover:-translate-y-1" 
                                onClick={() => setOpenFilters(!openFilters)}
                            />
                            <PieIcon
                                className="w-8 h-8 cursor-pointer transform transition-transform duration-700 ease-out hover:-translate-y-1" 
                                onClick={() => navigate('/charts')}
                            />
                        </div>
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
            <QuitIcon
                className="fixed w-10 h-10 top-0 left-0 m-8 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1"
                onClick={() => navigate("/")}
            />
        </div>
    )
}

export default QuestionsPage