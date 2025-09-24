import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"
import { HomeIcon } from "../../components/svg/icons/HomeIcon"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { setError } from "../../state/questions/questionsSlice"
import { groupByKey } from "../../utils/charts"
import Chart from "../../components/Chart"
import { CATEGORY_CHART_COLORS, DIFFICULTY_CHART_COLORS } from "../../const/colors"

const ChartsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { questions } = useSelector((state: RootState) => state.questionsReducer)

    const dataByCategory = groupByKey(questions, "category")
    const dataByDifficulty = groupByKey(questions, "difficulty")

    useEffect(() =>{
        if(questions.length != 0) return;
        
        dispatch(setError({
            status: "400",
            message: "Failed to fetch questions!"
        }))
        navigate("/error")
    }, [questions])

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <h1 className="special-text">Questions Charts</h1>
            <div className="flex w-[100%] items-center justify-between relative">
                <Chart data={dataByCategory} colors={CATEGORY_CHART_COLORS} />

                <div className="absolute inset-0 mb-[5vw] flex justify-center items-center pointer-events-none">
                    <img
                        className="w-1/3 rounded-4xl -z-1"
                        src="assets/images/base.webp"
                    />
                </div>

                <Chart data={dataByDifficulty} colors={DIFFICULTY_CHART_COLORS} />
            </div>
            <HomeIcon
                onClick={() => navigate("/questions")}
                className="fixed w-10 h-10 top-0 left-0 m-8 cursor-pointer transform transition-transform duration-200 hover:-translate-y-1"
            />
        </div>
    )
}

export default ChartsPage
