import * as react from "react";
// import * as reactRouter from "react-router-dom";

// import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

export function DumpPanel({ dataList }) {
    console.log("Dump panel component start ...", dataList);

  
    let s = "";
    for (let item of dataList)
    {
        s += `${item.name} : ${JSON.stringify(item.data, null, 4)}\n\n`;    
    }

    return (
        <>
            <pre className="p-3 border bg-light rounded">
                {s}
            </pre>

        </>
    );
}