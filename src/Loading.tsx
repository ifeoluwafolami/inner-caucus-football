import * as motion from "motion/react-client"

export default function Loading() {
    return (
        <div className="absolute top-0 z-10 flex w-full h-screen justify-center items-center">
            <motion.div
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 360, 360, 0],
                    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                }}
                style={{
                    width: 160,
                    height: 160,
                    backgroundImage: `url('/innercaucus.png')`, 
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 5,
                }}
            />
        </div>
    )
}