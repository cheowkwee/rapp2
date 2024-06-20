import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { DumpPanel } from "./DumpPanel.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

export function LoginPage({ debugMode = false }) {
    const componentName = "LoginPage";
    if (debugMode) console.log(`${componentName} component start ...`);

    // let data = reactRouter.useLoaderData();
    const { config, localData, gsl, updateApplicationLanguage } = react.useContext(globalContext);

    let sl = tBox.getStringLabel(gsl, componentName);

    const [showPassword, setShowPassword] = react.useState(false);
    const [record, setRecord] = react.useState({});
    const ref4Form = react.useRef();

    const [fieldState, setFieldState] = react.useState({});
    const [formState, setFormState] = react.useState({ dirty: false, valid: false });
    const navigate = reactRouter.useNavigate();

    react.useEffect(() => {
        let obj = buildFormFieldState(ref4Form.current);
        setFieldState(obj);
    }, []);

    // function need to move to lib ...
    function class4IsInvalid(valid, dirty = false, required = true) {
        console.log("Class for is invalid", valid, dirty, required);

        if (!dirty) return "";
        else if (valid == undefined && required) return "is-invalid";
        else if (valid == undefined && !required) return "";
        else if (valid) return "";
        else return "is-invalid";
    };

    function buildFieldState(target) {
        let obj = {}
        for (let key in target.validity) {
            obj[key] = target.validity[key];
        }

        console.log("Field state", obj);
        return obj;
    };

    function buildFormFieldState(target) {
        let obj1 = {}
        for (let item of target) {
            console.log("Item", item, item.tagName, item.name);
            if (item.tagName == "INPUT") {
                let obj2 = buildFieldState(item);
                let name = item.name;
                console.log("Field validity", obj2);
                obj1 = {
                    ...obj1,
                    [name]: obj2
                };
            }
        }
        console.log("Form field state", obj1);
        return obj1;
    };

    // event handling function here ...
    function toggle4Language(e) {
        console.log("Toggle for Language ", e);
        
        let lang = localData.applicationLanguage;
        if (lang == "English") lang = "Chinese";
        else lang = "English";

        console.log("Toggle for Language ", lang);
        updateApplicationLanguage(lang);
        
        return;
    };

    function click4Back(e) {
        console.log("Click for back ", e);
        navigate(-1);
        return;
    };

    function click4SignIn(e) {
        console.log("Click for sign in ", e);
        return;
    };

    function toggle4ShowPassword(e) {
        console.log("Toggle for show password ", e);
        setShowPassword(!showPassword);
        return;
    };

    function change4Record(e) {
        console.log("Form", ref4Form.current.checkValidity());
        let obj1 = {
            dirty: true,
            valid: ref4Form.current.checkValidity(),
        };
        setFormState(obj1);

        let obj2 = buildFieldState(e.target);
        setFieldState({
            ...fieldState,
            [e.target.name]: obj2
        });

        setRecord({
            ...record,
            [e.target.name]: e.target.value
        });
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
                <form name="form4Login" noValidate
                    className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4"
                    ref={ref4Form}>
                    <div className="row ">
                        <div className="col-12 fs-3 fw-bold my-3">
                            {sl.title}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label className="form-label mb-0">{sl.l_username}</label>
                            <input name="username" type="text"
                                className={`form-control ${class4IsInvalid(fieldState['username']?.valid, formState.dirty)}`}
                                placeholder={sl.p_username}
                                maxLength={64}
                                value={record.username || ""}
                                onChange={change4Record}
                                required={true} />
                            <div className="text-danger" style={{ minHeight: '19px', lineHeight: "100%" }}>
                                <span style={{ fontSize: "10px"}}>{tBox.getFieldErrorMessage('username', sl, fieldState, formState)}</span>
                            </div>
                        </div>

                        <div className="col-12">
                            <label className="form-label mb-0">{sl.l_password}</label>
                            <div className="input-group mb-0">
                                <input name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${class4IsInvalid(fieldState['password']?.valid, formState.dirty)}`}
                                    placeholder={sl.p_password}
                                    maxLength={64}
                                    value={record.password || ""}
                                    onChange={change4Record}
                                    required={true} />
                                <button className="btn btn-outline-primary" type="button" onClick={toggle4ShowPassword}>
                                    {
                                        showPassword ?
                                            <i className="fas fa-solid fa-eye fa-fw"></i>
                                            :
                                            <i className="fas fa-solid fa-eye-slash fa-fw"></i>
                                    }
                                </button>
                            </div>

                        </div>

                        <div className="col-12 my-5">
                            <button type="button" className="btn btn-outline-primary col-12 "
                                onClick={click4SignIn} disabled={!formState.valid || !formState.dirty}>
                                {sl.b_sign_in}
                            </button>
                        </div>

                    </div>
                </form>
            </div>


            <DumpPanel dataList={[
                { name: "record", data: record },
                { name: "formState", data: formState },
                { name: "fieldState", data: fieldState },
                // { name: "localData", data: localData },
                // { name: "config", data: config },
                { name: "sl", data: sl },
            ]} />
        </>
    );
}