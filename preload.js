const { contextBridge, ipcRenderer } = require("electron");

// ! initialization ! \\

let sendSubmit = (lead) => {
  console.log(lead);
  console.log("Main > Renderer");
  ipcRenderer.send("gotLead", lead);
};

let createDesktopModalWindow = (trigger) => {
  console.log("Creating desktop modal window...");
  ipcRenderer.send("createDesktopModal", trigger);
};
let createRecordModalWindow = () => {
  ipcRenderer.send("createRecordModal");
};

let rollDownApp = () => {
  ipcRenderer.send("Roll", "rolling down");
};

let appClose = () => {
  ipcRenderer.send("Close", "Closing app");
};
let resize = () => {
  ipcRenderer.send("Resize", "Resizing window");
};
let rollDownModalRecord = () => {
  ipcRenderer.send("RollModal", currentWindow);
};
let CloseModalRecord = () => {
  ipcRenderer.send("CloseModal", currentWindow);
};
let resizeModalRecord = () => {
  ipcRenderer.send("ResizeModal", currentWindow);
};
let selectVideo = () => {
  ipcRenderer.send("RecordSelectVideo");
};
let recordRollDown = () => {
  ipcRenderer.send("RecordRollDown");
};
let recordResize = () => {
  ipcRenderer.send("RecordResize");
};
let recordClose = () => {
  ipcRenderer.send("RecordClose");
};
let stopRecording = () => {
    ipcRenderer.send("StopRecording", "STOP")
}
let saveVideo = (recorderChunks) => {
  ipcRenderer.send("saveVideo", recorderChunks);
}

// * Connection * \\

let indexBridge = {
  sendSubmit: sendSubmit,
  createDesktopModalWindow: createDesktopModalWindow,
  createRecordModalWindow: createRecordModalWindow,
  rollDownApp: rollDownApp,
  appClose: appClose,
  resize: resize,
  rollDownModalRecord: rollDownModalRecord,
  CloseModalRecord: CloseModalRecord,
  resizeModalRecord: resizeModalRecord,
  selectVideo: selectVideo,
  recordRollDown: recordRollDown,
  recordResize: recordResize,
  recordClose: recordClose,
  stopRecording: stopRecording,
  stream: (callback) => ipcRenderer.on("stream", (callback)),
  Time: (callback) => ipcRenderer.on("Time", (callback)),
  saveVideo: saveVideo,
};

contextBridge.exposeInMainWorld("Bridge", indexBridge);
