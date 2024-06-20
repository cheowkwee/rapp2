import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { ErrorLine } from "./ErrorLine.js";
import { DumpPanel } from "./DumpPanel.js";
import { InfoDialogBox } from "./InfoDialogBox.js";
import { ConfirmDialogBox } from "./ConfirmDialogBox.js";
import { StateDialogBox } from "./StateDialogBox.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

export function TestDialogBoxPage({ debugMode = true }) {
    const componentName = "TestDialogBoxPage";
    if (debugMode) console.log(`${componentName} component start ...`);

    const { config, localData, gsl, updateApplicationLanguage } = react.useContext(globalContext);
    let sl = tBox.getStringLabel(gsl, componentName);

    const [showPassword, setShowPassword] = react.useState(false);
    const [record, setRecord] = react.useState({});
    // const ref4Form = react.useRef();
    const navigate = reactRouter.useNavigate();

    const [count, setCount] = react.useState(0);
    const [showInfo, setShowInfo] = react.useState(false);
    const [showConfirm, setShowConfirm] = react.useState(false);
    const [showState, setShowState] = react.useState(false);


    react.useEffect(() => {
        if (debugMode) console.log("Run on effect");
    }, []);

    // event handling function here ...
    function toggle4Language(e) {
        if (debugMode) console.log("Toggle for Language ", e);

        let lang = localData.applicationLanguage;
        if (lang == "English") lang = "Chinese";
        else lang = "English";

        console.log("Toggle for Language ", lang);
        updateApplicationLanguage(lang);

        return;
    };

    function click4Back(e) {
        if (debugMode) console.log("Click for back ", e);
        navigate(-1);
        return;
    };

    function click4Echo(m) {
        if (debugMode) console.log("Click for echo ", m);
        return;
    };

    async function click4Info(e) {
        if (debugMode) console.log("Click for info ", e);
        // if set show info to false not call on callback than need to set back to false first ...

        // setShowInfo(false);
        // await tBox.sleep(50);

        setShowInfo(true);

        return;
    };


    async function click4Confirm(e) {
        if (debugMode) console.log("Click for confirm", e);
        setShowConfirm(true);

        return;
    };

    async function click4State(e) {
        if (debugMode) console.log("Click for state", e);
        setShowState(true);
        // after 2 second close

        setTimeout(() => {
            console.log("Timeout and set state");
            setShowState(false);
        }, 1000 * 3);
        return;
    };

    return (
        <>
            <div className="position-fixed" style={{ top: "16px", left: "16px" }}>
                <span className="p-2" style={{ cursor: "pointer" }} onClick={click4Back} tabIndex="-1">
                    <i className="fas fa-arrow-left fa-fw"></i>
                </span>
            </div>
            <div className="position-fixed" style={{ top: "16px", right: "16px" }}>
                <span className="p-2" style={{ cursor: "pointer" }} onClick={toggle4Language} tabIndex="-1">
                    <i className="fas fa-language fa-fw"></i>
                </span>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", }}>

                <div className="col-6">
                    <div className="text-center fs-3">{sl.title}</div>
                    <div className="col-12 my-2">
                        <button type="button" className="btn btn-outline-primary col-12 "
                            onClick={click4Info} >
                            {sl.b_info}
                        </button>
                    </div>
                    <div className="col-12 my-2">
                        <button type="button" className="btn btn-outline-primary col-12 "
                            onClick={click4Confirm} >
                            {sl.b_confirm}
                        </button>
                    </div>
                    <div className="col-12 my-2">
                        <button type="button" className="btn btn-outline-primary col-12 "
                            onClick={click4State} >
                            {sl.b_state}
                        </button>
                    </div>
                </div>


            </div>

            <InfoDialogBox message="Hello from information dialog box"
                show={showInfo}
                callback4OK={(m) => { setShowInfo(false) }}
                debugMode={debugMode} />

            <ConfirmDialogBox message="Confirm delete record from table ?"
                show={showConfirm}
                callback4OK={(m) => { setShowConfirm(false) }}
                callback4Cancel={(m) => { setShowConfirm(false) }}
                debugMode={debugMode} />

            <StateDialogBox message="Loading ..."
                show={showState}
                debugMode={debugMode} />

            <DumpPanel dataList={[
                // { name: "record", data: record },
                // { name: "formState", data: formState },
                // { name: "fieldState", data: fieldState },
                // { name: "localData", data: localData },
                // { name: "config", data: config },
                { name: "sl", data: sl },
            ]} debugMode={debugMode} />
        </>
    );
}