import * as react from "react";
// import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;
const bootstrap = window.bootstrap;

export function ConfirmDialogBox({ title, message, callback4OK, callback4Cancel, show = true, debugMode = false }) {
    const componentName = "ConfirmDialogBox";
    
    if (debugMode) console.log(`${componentName} component start ...`, message);
    const { config, localData, gsl, updateApplicationLanguage } = react.useContext(globalContext);
    let sl = tBox.getStringLabel(gsl, componentName);

    const ref4Div = react.useRef();
    const [modal, setModal] = react.useState(null);

    react.useEffect(() => {
        if (debugMode) console.log(`Show ${componentName} component`, show);

        if (!show) {
            if (debugMode) console.log("Not show dialog component");
            return;
        }

        let m = modal;
        if (m == null) {
            if (debugMode) console.log("Create modal instance");
            m = new bootstrap.Modal(ref4Div.current, { backdrop: "static" });
            ref4Div.current.addEventListener('hidden.bs.modal', function (event) {
                if (callback4Cancel != undefined)
                    callback4Cancel(message);
            });
            setModal(m);
        }
        m.show();

    }, [show]);

    function click4Cancel(e) {
        if (debugMode) console.log("Click for cancel", e);
        modal.hide();

        if (callback4Cancel != undefined)
            callback4Cancel(message);
        return;
    };

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
                    <div className="modal-content ">

                        <div className="modal-body text-center">

                            <div className="fs-1 text-primary">
                                <span className="fas fa-question-circle fa-fw fs-1"></span>
                            </div>

                            {
                                title ?
                                    <div className="fw-bold" >{title}</div>
                                    :
                                    null
                            }
                            <div className="mt-3 text-normal">{message}</div>
                        </div>
                        <div className="modal-footer justify-content-center text-center border-top-0">
                            <button className="btn btn-outline-primary " onClick={click4OK} >
                                {sl.b_confirm}
                            </button>
                            <button className="btn btn-outline-danger " onClick={click4Cancel} >
                                {sl.b_cancel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
