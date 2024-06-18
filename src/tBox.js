const debugMode = true;

const key4AppLocalData = "UnityTestVersion1";
const url4DefaultParameter = "./conf/default.conf";
const url4AppParameter = "./conf/app.conf"

const url4DefaultLabel = "./conf/label.conf"


export function sleep(n = 500) {
    console.log(`Sleep for ${n}`);
    return new Promise((r) => setTimeout(r, n));
}

export const rand = () => Math.round(Math.random() * 100);
export const resolve = (d, ms) => new Promise((r) => setTimeout(() => r(`${d} - ${rand()}`), ms));
export const reject = (d, ms) =>
    new Promise((_, r) =>
        setTimeout(() => {
            if (d instanceof Error) {
                d.message += ` - ${rand()}`;
            } else {
                d += ` - ${rand()}`;
            }
            r(d);
        }, ms)
    );

export async function getJSONHostFile(url) {
    if (debugMode) console.log("Get JSON host file", url);

    let obj = {};
    try {
        let response1 = await fetch(url);
        if (response1.ok)
            obj = await response1.json();
        if (debugMode) console.log("Get JSON host file", url, response1.ok, obj);

    }
    catch (e) {
        console.error("Get JSON host file exception", e);
    }

    return obj;
};

export async function loadConfiguration4Parameter() {
    if (debugMode) console.log("Load configuration for parameter");

    let defaultObject = await getJSONHostFile(url4DefaultParameter);
    let appObject = await getJSONHostFile(url4AppParameter);

    return { ...defaultObject, ...appObject };
};


export async function loadConfiguration4Label(lang = "English") {
    if (debugMode) console.log("Load configuration for label", lang);

    let defaultLabel = await getJSONHostFile(url4DefaultLabel);
    let langLabel = {};

    if (lang != "English") {
        let url = `./conf/label_${lang}.conf`;
        langLabel = await getJSONHostFile(url);
    }

    // return { ...defaultLabel, ...langLabel };

    let obj = { ...defaultLabel };

    for (let key1 in obj) {
        if (langLabel[key1] == undefined) continue;
        for (let key2 in obj[key1]) {
            if (langLabel[key1][key2] == undefined) continue;
            obj[key1][key2] = langLabel[key1][key2];
        }
    }

    return obj;
};

export function removeLocalData(key) {
    localStorage.removeItem(key);
    return;
};

export function putLocalData(key, obj) {
    let v = JSON.stringify(obj);
    localStorage.setItem(key, v);
    return v;
};

export function getLocalData(key, defaultObject = {}) {
    let v = undefined;
    let obj = {};
    v = localStorage.getItem(key);

    if (v == undefined) {
        obj = defaultObject;
        putLocalData(key, obj);
    }
    else {
        obj = JSON.parse(v);
    }

    return obj;
};

export function getAppLocalData() {
    let obj = {};
    let key = key4AppLocalData;
    obj = getLocalData(key, { reactApp: true, applicationLanguage: "Chinese" });
    return obj;
};

export function getStringLabel(gsl, name) {
    let obj1 = gsl['main'];
    let obj2 = gsl[name];

    return { ...obj1, ...obj2 };
};

export function camel2Snake(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

export function camel2String(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
}

export function snake2Camel(s) {
    return s.replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
}


export function getClass4IsInvalid(valid, dirty = false, required = false) {
    console.log("Class for is invalid", valid, dirty, required);

    if (!dirty) return "";
    else if (valid == undefined && required) return "is-invalid";
    else if (valid == undefined && !required) return "";
    else if (valid) return "";
    else return "is-invalid";
};

// target is input element and obj is the field state record/object
export function buildFieldState(target, obj) {
    if (obj == undefined) obj = {};

    for (let key in target.validity) {
        obj[key] = target.validity[key];
    }

    console.log("Field state", obj);
    return obj;
};

// target is form element
export function buildFormFieldState(target) {
    let obj1 = {}
    // item is input element
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

export function getFieldErrorMessage(name, sl, fieldState = {}, formState = {}) {
    console.log("Build error element for field", name);
    if (!formState.dirty || fieldState["valid"]) {
        console.log("Not dirty no need to build error message element");
        return "";
    }

    if (fieldState["badInput"]) {
        let s = "bad";
        let key1 = "e_" + name + "_" + s;
        let key2 = "e_" + s + "_" + name;
        let message = sl[key1] || sl[key2] || undefined;
        console.log("Message", s, message);
        if (message != undefined) return message;
    }

    if (fieldState["patternMismatch"]) {
        let s = "pattern";
        let key1 = "e_" + name + "_" + s;
        let key2 = "e_" + s + "_" + name;
        let message = sl[key1] || sl[key2] || undefined;
        console.log("Message", s, message);
        if (message != undefined) return message;
    }

    if (!fieldState["valid"]) {
        let s = "invalid";
        let key1 = "e_" + name + "_" + s;
        let key2 = "e_" + s + "_" + name;
        let message = sl[key1] || sl[key2] || undefined;
        console.log("Message", s, message);
        if (message != undefined) return message;
    }

    return "";
}