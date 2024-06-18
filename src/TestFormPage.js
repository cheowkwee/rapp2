import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { ErrorLine } from "./ErrorLine.js";
import { DumpPanel } from "./DumpPanel.js";


// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

export function TestFormPage() {
    console.log("Test form page component start ...");

    // let data = reactRouter.useLoaderData();
    const componentName = "TestFormPage";
    const { config, localData, gsl, updateApplicationLanguage } = react.useContext(globalContext);

    let sl = tBox.getStringLabel(gsl, componentName);

    const [showPassword, setShowPassword] = react.useState(false);
    const [record, setRecord] = react.useState({});
    const formElement = react.useRef();

    const [fieldState, setFieldState] = react.useState({});
    const [formState, setFormState] = react.useState({ dirty: false, valid: false });
    const navigate = reactRouter.useNavigate();

    react.useEffect(() => {
        let obj = tBox.buildFormFieldState(formElement.current);
        setFieldState(obj);
    }, []);

    // function need to move to lib ...

 

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
        console.log("Form", formElement.current.checkValidity());
        let obj1 = {
            dirty: true,
            valid: formElement.current.checkValidity(),
        };
        setFormState(obj1);

        let obj2 = tBox.buildFieldState(e.target);
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
                    ref={formElement}>
                    <div className="row ">
                        <div className="col-12 fs-3 fw-bold my-3">
                            {sl.title}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label className="form-label mb-0">{sl.l_username}</label>
                            <input name="username" type="text"
                                className={`form-control ${tBox.getClass4IsInvalid(fieldState['username']?.valid, formState.dirty, true)}`}
                                placeholder={sl.p_username}
                                maxLength={64}
                                value={record.username || ""}
                                onChange={change4Record}
                                required={true} />
                            <ErrorLine message={tBox.getFieldErrorMessage('username', sl, fieldState['username'], formState)} />

                        </div>

                        <div className="col-12">
                            <label className="form-label mb-0">{sl.l_password}</label>
                            <div className="input-group mb-0">
                                <input name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${tBox.getClass4IsInvalid(fieldState['password']?.valid, formState.dirty, true)}`}
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
                            <ErrorLine message={tBox.getFieldErrorMessage('password', sl, fieldState['password'], formState)} />

                        </div>

                        <div className="col-12">
                            <label className="form-label mb-0">{sl.l_confirm_password}</label>
                            <div className="input-group mb-0">
                                <input name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${tBox.getClass4IsInvalid(fieldState['confirmPassword']?.valid, formState.dirty, true)}`}
                                    placeholder={sl.p_confirm_password}
                                    maxLength={64}
                                    value={record.confirmPassword || ""}
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
                            <ErrorLine message={tBox.getFieldErrorMessage('password', sl, fieldState['password'], formState)} />

                        </div>

                        <div className="col-12 my-5">
                            <button type="button" className="btn btn-outline-primary col-12 "
                                onClick={click4SignIn} disabled={!formState.valid || !formState.dirty}>
                                {sl.b_submit}
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