
import './styles/GameInfo.css';
import './styles/DevLog.css';
//TYPES

import { useState } from "react";

type DevLogProps = {
    entries: LogEntry[];
    backgroundColor: string
}
type LogEntry = {
    date: String;
    bulletpoints: string[];
    images?: string[]
}
type LogEntryProps = {
    entry: LogEntry;
}


//MAIN

export default function DevLog({entries, backgroundColor}: DevLogProps) {
    const [logVisible, setLogVisible] = useState(false);
    console.log("BACKGROUND COLOR " + backgroundColor)
    return (
        <section className = "devLog" style = {{backgroundColor: backgroundColor, overflow:"hidden"}}>
            <label  className = 'devLogLabel' htmlFor = 'carrotDropdown'>Dev Log</label>
            <button className = 'logCarrot' style={{transform: logVisible? 'rotate(90deg)' : 'rotate(0deg)',}}
            onClick={()=>{setLogVisible(!logVisible)}}
            >{'>'}</button>
            {logVisible?
                entries.map((entry)=> (
                <LogEntry entry={entry}></LogEntry>
                ))
                : null
                
            }
            
                
        </section>
    )
}



//SINGLE ENTRY COMPONENT
function LogEntry ({entry}: LogEntryProps) {
    return (
        <div className = "logEntry">
            <h2>{entry.date}</h2>
            <ul>
                {entry.bulletpoints.map((bulletpoint)=> (
                    <li>{bulletpoint}</li>
                ))}
            </ul>
            <>
            {entry.images? 
                entry.images.map((image, index) => (
                        <img key={index} src={image} alt="" />
                    ))
                : null}
            </>

           
        </div>
    )
}