import { motion } from "framer-motion"
import "./index.css"
import { container, dot } from "../../animation/loading"

const LoadingPage = () =>{

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <img
                className="w-2/5 rounded-4xl"
                src="assets/images/loading.webp"
            />
            <h1 className="text-7xl flex items-center gap-2">
                Loading
                <motion.span
                    className="flex gap-2"
                    variants={container}
                    initial="initial"
                    animate="animate"
                >
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="text-7xl"
                        variants={dot}
                    >
                    .
                    </motion.span>
                ))}
                </motion.span>
            </h1>
        </div>
    )
}

export default LoadingPage