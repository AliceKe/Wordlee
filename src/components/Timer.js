import { useEffect, useState } from "react";

function Timer({min}){
    const [counter, setCounter] = useState(min);

    useEffect(() =>{
        if(counter >= 0){
            setTimeout(()=>setCounter(counter + 1), 1000);
        }
    },[counter]);

    let mins = Math.floor(counter/60)
    let secs = (counter%60).toString()

    if (secs.length ===1){
        secs = "0" + secs
    }

    return(
        <span>
            Time taken: {mins} : {secs}
        </span>
    )
}

export default Timer;