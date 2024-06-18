import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { Home, homeLoader } from "./Home.js";
import { Fallback } from "./Fallback.js";
import { RootErrorBoundary } from "./RootErrorBoundary.js";

import { LoginPage } from "./LoginPage.js";
import { TestFormPage } from "./TestFormPage.js";

// Map loaded lib here ...
// const uuidv4 = window.uuidv4;
// const moment = window.moment;

// Layout
export async function layoutLoader() {
    console.log("Layout or base loader start ...");
    // await tBox.sleep();
    console.log("Layout loader end ...");
    return {
        date: new Date().toISOString(),
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
export default function App() {

    const [mode, setMode] = react.useState("load");

    const [localData, setLocalData] = react.useState({});
    const [config, setConfig] = react.useState({});
    const [gsl, setGSL] = react.useState({});

    // const [redraw, setRedraw] = react.useState(0);

    // function
    function updateApplicationLanguage(lang) {
        console.log("Update application language");
        let data = localData;
        setLocalData({...localData, applicationLanguage: lang});

       return;
    };
    

    react.useEffect(() => {
        console.log("Effect on app ... ", mode, new Date());

        setTimeout(async () => {

            let obj1 = tBox.getAppLocalData();
            setLocalData({ ...obj1 });
            console.log("Local data", obj1, localData);

            let obj2 = await tBox.loadConfiguration4Parameter();
            setConfig(obj2);
            console.log("Configuration", obj2, config);

            let obj3 = await tBox.loadConfiguration4Label(obj1.applicationLanguage);
            setGSL(obj3);
            console.log("String label", obj3, gsl);

            setMode("list");
            console.log("Mode", mode);
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

