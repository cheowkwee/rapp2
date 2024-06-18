
import * as react from "react";
// import * as reactRouter from "react-router-dom";

// import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

export function ErrorLine({ message }) {
    console.log("Error line component start ...", message);


    return (
        <>
            <div className="text-danger" style={{ minHeight: '19px', lineHeight: "100%" }}>
                <span style={{ fontSize: "10px" }}>{message}</span>
            </div>
        </>
    );
}
