import * as react from "react";
// import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;
const bootstrap = window.bootstrap;

export function StateDialogBox({ title, message, callback4OK, show = true, debugMode = false }) {
    const componentName = "StateDialogBox";
    if (debugMode) console.log(`${componentName} component start ...`, message);

    const { config, localData, gsl, updateApplicationLanguage } = react.useContext(globalContext);
    let sl = tBox.getStringLabel(gsl, componentName);

    const ref4Div = react.useRef();
    const [modal, setModal] = react.useState(null);

    react.useEffect(() => {
        if (debugMode) console.log(`Show ${componentName} component`, show);
        let m = modal;

        if (m == null) {
            if (debugMode) console.log("Create modal instance");
            m = new bootstrap.Modal(ref4Div.current, { backdrop: "static", keyboard: false });
            ref4Div.current.addEventListener('hidden.bs.modal', function (event) {
                if (callback4OK != undefined)
                    callback4OK(message);
            });
            setModal(m);
        }

        if (!show) {
           m.hide();
           return;
        }
        m.show();

    }, [show]);

    function click4OK(e) {
        if (debugMode) console.log("Click for ok ", e);
        modal.hide();

        if (callback4OK != undefined)
            callback4OK(message);
        return;
    };

    return (
        <>
            <div className="modal" ref={ref4Div} tabIndex="-1" role="dialog" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{ backgroundColor: "transparent", border: "none"}}>
                        <div className="modal-body text-center text-dark ">
                            
                            <div className="spinner-border" role="status"></div>
                            { message ? <div className="pt-3" >{message}</div> : null }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
