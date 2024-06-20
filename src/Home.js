
import * as react from "react";
import * as reactRouter from "react-router-dom";

import * as tBox from "./tBox.js";
import { globalContext } from "./globalContext.js";

import { DumpPanel} from "./DumpPanel.js";


// Map loaded lib here ...
const uuidv4 = window.uuidv4;
const moment = window.moment;

export async function homeLoader() {
    console.log("Home loader start ...");
    // await tBox.sleep(1000 * 1);
    console.log("Home loader end ...");
    return {
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        uuid: uuidv4(),
    };
}

export function Home({ debugMode = false }) {
    const componentName = "Home";
    if (debugMode) console.log(`${componentName} component start ...`);

    let data = reactRouter.useLoaderData();
    const { config, localData, gsl } = react.useContext(globalContext);
    return (
        <>
            <h2>Home</h2>
            <p>
                Date: {data.date}<br />
                UUID: {data.uuid}
            </p>

            <DumpPanel dataList={[
                { name: "localData", data: localData },
                { name: "config", data: config },
                { name: "gsl", data: gsl },
            ]}/>
        </>
    );
}