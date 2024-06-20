import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { Home, homeLoader } from "./Home.js";
import { Fallback } from "./Fallback.js";
import { RootErrorBoundary } from "./RootErrorBoundary.js";

import { LoginPage } from "./LoginPage.js";
import { TestFormPage } from "./TestFormPage.js";
import { TestDialogBoxPage } from "./TestDialogBoxPage.js";

// Map loaded lib here ...
const uuidv4 = window.uuidv4;
const moment = window.moment;

// Layout
export async function layoutLoader() {
    console.log("Layout or base loader start ...");
    // await tBox.sleep();
    console.log("Layout loader end ...");

    return {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        uuid: uuidv4(),
    };
};

export function Layout() {
    // let navigation = reactRouter.useNavigation();
    // let revalidator = reactRouter.useRevalidator();
    // let fetchers = reactRouter.useFetchers();
    // let fetcherInProgress = fetchers.some((f) => ["loading", "submitting"].includes(f.state));

    return (
        <>
            <div className="container-fluid">
                <reactRouter.Outlet />
            </div>
        </>
    );
};

// App
export default function App({debugMode = true}) {
    const componentName = "App";
    if (debugMode) console.log(`${componentName} component start ...`);
    
    const [mode, setMode] = react.useState("load");
    const [localData, setLocalData] = react.useState({});
    const [config, setConfig] = react.useState({});
    const [gsl, setGSL] = react.useState({});

    // const [redraw, setRedraw] = react.useState(0);

    // function
    async function updateApplicationLanguage(lang) {
        if (debugMode) console.log("Update application language");
        let data = localData;
        setLocalData({ ...data, applicationLanguage: lang });
        tBox.updateAppLocalData("applicationLanguage", lang);

        let obj3 = await tBox.loadConfiguration4Label(lang);
        setGSL(obj3);
        console.log("String label", obj3, gsl);
        return;
    };


    react.useEffect(() => {
        if (debugMode) console.log("Run on effect", mode);

        setTimeout(async () => {

            let obj1 = tBox.getAppLocalData();
            setLocalData({ ...obj1 });
            if (debugMode) console.log("Local data", obj1, localData);

            let obj2 = await tBox.loadConfiguration4Parameter();
            setConfig(obj2);
            if (debugMode) console.log("Configuration", obj2, config);

            let obj3 = await tBox.loadConfiguration4Label(obj1.applicationLanguage);
            setGSL(obj3);
            if (debugMode) console.log("String label", obj3, gsl);

            setMode("list");
            if (debugMode) console.log("Mode", mode);
        }, 1000 * 1);

    }, []);

    if (mode === "load") {
        return <Fallback />;
    }

    return (
        <globalContext.Provider value={{ config, setConfig, localData, setLocalData, gsl, setGSL, updateApplicationLanguage }}>
            <reactRouter.RouterProvider router={router} fallbackElement={<Fallback />} />
        </globalContext.Provider>

    );
};

let router = reactRouter.createHashRouter([
    {
        path: "/",
        Component: Layout,
        loader: layoutLoader,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                index: true,
                loader: homeLoader,
                Component: Home,
            },
            {
                path: "login",
                Component: LoginPage,
            },
            {
                path: "testForm",
                Component: TestFormPage,
            },
            {
                path: "testDialogBox",
                Component: TestDialogBoxPage,
            },
        ],
    },
    {
        path: "/redirect",
        element: <reactRouter.Navigate to="/" />,
    },

]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

