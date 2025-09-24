import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import { fetchQuestions } from "../../state/questions/questionsSlice"
import type { AppDispatch, RootState } from "../../state/store"
import { useNavigate } from "react-router-dom"
import { FetchBlob } from "../../components/svg/blobs/FetchBlob"

const HomePage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading } = useSelector((state: RootState) => state.questionsReducer)

    const handleClick = async () =>{
        navigate("/loading");

        await dispatch(fetchQuestions())

        if(!isLoading) navigate("/questions", { replace: true })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 flex justify-center items-start">
                <img
                    className="w-4/5 rounded-4xl"
                    src="assets/images/base.webp"
                />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="special-text">Fetching Sector</h1>
                <FetchBlob className="absolute -z-1 w-3/5 mr-[5vw] mt-[5vh]" />
                <button
                    className="send-btn w-1/2 h-20 transform transition-transform duration-200 hover:-translate-y-1"
                    onClick={handleClick}
                >
                    Fetch Data
                </button>
            </div>
        </div>
    )
}

export default HomePage