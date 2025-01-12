import { useRef, useState } from "react";

// Timer Continuity:

// Store the intervalId in a useRef hook so it persists across renders and allows you to clear the interval when pausing or resetting.
// The handleTime function isn't preserving the intervalId outside of its scope. This means the timer can't be stopped or paused properly.



function PomodoroTimer() {

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState("pomodoro");
    
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null) // Store the interval ID


    function handleTime(min, sec) {
        if(intervalRef.current) clearInterval(intervalRef.current) // Clear any existing interval

        intervalRef.current = setInterval(() => {
            if (sec === 0 && min === 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false) // Stop the timer when finished
                return; // Exit the function to prevent further execution
            }
            if (sec === 0){
                min--; // Decrement minutes
                sec = 59; // Reset seconds to 59
            }else {
                sec--; // Decrement seconds
            }
    
            // Prevent negative values
            if (min < 0) min = 0;
            if (sec < 0) sec = 0;
    
            setMinutes(min);
            setSeconds(sec); // Update both values together( if separatly update - race condition)
        }, 1000);
    }

    function handlePomodoro() {
        setMinutes(25);
        setSeconds(0)
        setTimer("pomodoro")
    }

    function handleShortBreak() {
        setMinutes(5)
        setSeconds(0)
        setTimer("short break")
    }
    function handleLongBreak() {
        setMinutes(10)
        setSeconds(0)
        setTimer("long break")
    }

    function handleStart() {
        if(!isRunning){
            if (timer === 'pomodoro') {
                handleTime(25, 0)
            }
            else if (timer === 'short break') {
                handleTime(5, 0)
            }
            else {
                handleTime(10, 0)
                
            }
            setIsRunning(true); // Set isRunning to true when the timer starts
    
        }
    }

   
    function handlePause() {
        if (isRunning) {
            clearInterval(intervalRef.current); // Stop the interval
            setIsRunning(false); // Mark the timer as paused
        }
    }





    function handleReset() {
        clearInterval(intervalRef.current); // Clear the interval
        setIsRunning(false); // Reset running state
        if (timer === 'pomodoro') {
            handlePomodoro()
        }
        else if (timer === "short break") {
            handleShortBreak()
        }
        else {
            handleLongBreak()
        }

    }


    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    const buttonClass = "p-4 m-2 border border-black font-semibold rounded-full";
    const controlButtonClass = "border border-black p-3 rounded";


    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen ">
                <div className=" text-3xl border border-gray-500 p-20">
                    <div className="flex flex-col mb-8 gap-4">
                        <button className={buttonClass} onClick={handlePomodoro}>Pomodoro</button>
                        <button className={buttonClass} onClick={handleShortBreak}>Short Break</button>
                        <button className={buttonClass} onClick={handleLongBreak}>Long Break</button>
                    </div>
                    <div className="font-bold text-8xl text-center">
                        <h2>{formattedMinutes}:{formattedSeconds}</h2>
                    </div>
                    <div className="flex justify-between  mt-8 gap-10 p-4 ">  
                        <button className={controlButtonClass}  onClick={handleStart} >Start</button>
                
                        <button className={controlButtonClass}  onClick={handlePause}>Pause</button>
                        <button className={controlButtonClass}   onClick={handleReset}>Reset</button>
                    </div>

                </div>

            </div>
        </>
    )




}

export default PomodoroTimer;

