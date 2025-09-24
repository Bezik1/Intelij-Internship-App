import { useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"

const ErrorPage = () =>{
    const { error } = useSelector((state: RootState) => state.questionsReducer)

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-0">
            <img
                className="w-2/5 rounded-4xl"
                src="assets/images/error.webp"
            />
            <h1 className="text-5xl">Error: {error != null ? error.status : 400}</h1>
            {error && <div className="text-3xl">Message: {error.message}</div>}
        </div>
    )
}

export default ErrorPage