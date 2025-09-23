export const container: any = {
    animate: {
        transition: {
        staggerChildren: 0.2,
        },
    },
}

export const dot: any = {
    initial: { opacity: 0 },
    animate: {
        opacity: [0, 1, 0],
        transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        },
    },
}