const { contextBridge, ipcRenderer, ipcMain } = require("electron");

// ! initialization ! \\

let sendSubmit = (lead) => {
    console.log(lead);
    console.log("Main > Renderer");
    ipcRenderer.send('gotLead', lead)
};

let createDesktopModalWindow = (trigger) => {
    console.log("Creating desktop modal window...");
    ipcRenderer.send("createDesktopModal", trigger);
}
let createRecordModalWindow = () => {
    console.log("Creating record modal window...");
    ipcRenderer.send("createRecordModal");
} 

let rollDownApp = () => {
    ipcRenderer.send("Roll", "rolling down")
}

let appClose = () => {
    ipcRenderer.send("Close", "Closing app")
}
let resize = () => {
    ipcRenderer.send("Resize", "Resizing window")
}

// ! initialization OVER ! \\

// * Connection * \\

let indexBridge = {
    sendSubmit: sendSubmit,
    createDesktopModalWindow: createDesktopModalWindow,
    createRecordModalWindow: createRecordModalWindow,
    rollDownApp: rollDownApp,
    appClose: appClose,
    resize: resize
};

contextBridge.exposeInMainWorld("Bridge", indexBridge);