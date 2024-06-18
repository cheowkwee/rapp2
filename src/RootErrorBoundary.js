// import * as react from "react";
import * as reactRouter from "react-router-dom";

// import * as tBox from "./tBox.js";

// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

// Root error boundary
export function RootErrorBoundary() {
    let error = reactRouter.useRouteError();
    console.log("Root error boundary component start ...");

    return (
        <div className="container-fluid">
            <h1>Oh! Something went wrong 😩</h1>
            <pre className="p-3 border bg-light rounded">{error.message || JSON.stringify(error, null, 4)}</pre>
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-primary" onClick={() => (window.location.href = "#/")}>
                    Reload
                </button>
            </div>

        </div>
    );
}
