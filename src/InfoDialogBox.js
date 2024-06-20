import * as react from "react";
// import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;
const bootstrap = window.bootstrap;

export function InfoDialogBox({ title, message, callback4OK, show = true, debugMode = false }) {
    const componentName = "InfoDialogBox";
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
                if (callback4OK != undefined)
                    callback4OK(message);
            });
            setModal(m);
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
                    <div className="modal-content ">

                        <div className="modal-body justify-content-center text-center">

                            <div className="fs-1 text-primary">
                                <span className="fas fa-info-circle fa-fw fs-1"></span>
                            </div>

                            {
                                title ?
                                    <div className="fw-bold" >{title}</div>
                                    :
                                    null
                            }

                            <div className="py-3 text-break">{message}</div>
                        </div>
                        <div className="modal-footer justify-content-center text-center border-0">
                            <button type="button"
                                className="btn btn-outline-primary "
                                onClick={click4OK}>
                                {sl.b_OK}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
