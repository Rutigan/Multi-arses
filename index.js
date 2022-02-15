const { app, BrowserWindow, ipcMain, desktopCapturer, Menu, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const nodeDiskInfo = require("node-disk-info");
const robot = require("robotjs");
const activeWindows = require("electron-active-window");

// !

let mainWindow = null;
let infoModalWindow = null;

// *! functions initializations

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 80,
    height: 600,
    maxHeight: 800,
    darkTheme: true,
    backgroundColor: `#3a3a45`,
    frame: false,
    webPreferences: {
      enableBlinkFeatures: false,
      preload: path.join(app.getAppPath(), "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      defaultFontSize: 14,
      defaultFontFamily: {
        standard: "Lato",
      },
    },
    // alwaysOnTop: true,
    titleBarOverlay: {
      color: "#2F263C",
      symbolColor: "#fff",
    },
    // titleBarStyle: 'hidden',
    icon: "./icons/logo-fix.ico",
  });
  mainWindow.loadFile(path.join(__dirname, "/view", "index.html"));
  mainWindow.setResizable(true);
  // * Open the DevTools.
  // mainWindow.webContents.openDevTools();
  
  
};

function getCurrentWindow() {
  activeWindows()
    .getActiveWindow()
    .then((result) => {
      console.log(result);
    });
}

// *! functions initializations OVER

app.on("ready", () => {
  createWindow();
  // createInfoModalWindow();
  // getOSInfo();
  // getDiscInfo();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
})


ipcMain.on("gotLead", (e, lead) => {
  console.log("Main got Lead! Modifing...");
  let leadString = JSON.stringify(lead);
  fs.appendFileSync("config.json", `${leadString},`);
});

ipcMain.on("createDesktopModal", (e, trigger) => {
  const createInfoModalWindow = () => {
    infoModalWindow = new BrowserWindow({
      width: 870,
      height: 700,
      show: true,
      darkTheme: true,
      center: true,
      parent: mainWindow,
    });

    infoModalWindow.loadURL("https://www.youtube.com/?gl=RU&hl=ru");
  };

  console.log("Creating modal window...");
  createInfoModalWindow();
});

ipcMain.on("createRecordModal", () => {
  // let mainBlock = document.querySelector('.main__body');
  function calculatePosition() {
    let screenSize = robot.getScreenSize();
    return screenSize;
  }

  let screen = calculatePosition();

  function getCenterOfApp() {
    return (pos = {
      x: screen.width / 2 - 870 / 2 + 40,
      y: screen.height / 2 - 700 / 2 - 30,
    });
  }
  getCenterOfApp();
  const createRecordModalWindow = () => {
    recordWindow = new BrowserWindow({
      width: 870,
      height: 700,
      show: true,
      darkTheme: true,
      // parent: mainWindow,
      frame: false,
      webPreferences: {
        preload: path.join(app.getAppPath(), "preload.js"),
      },
      x: pos.x,
      y: pos.y,
    });
    recordWindow.loadFile(path.join(__dirname, "/view", "record-full.html"));
  };

  createRecordModalWindow();

  
});

ipcMain.on("Roll", () => {
  mainWindow.minimize();
});

ipcMain.on("Close", () => {
  mainWindow.close();
});

ipcMain.on("Resize", () => {
  console.log("Resize!");
});

// * ----- * \\
ipcMain.on("RecordRollDown", () => {
  recordWindow.minimize()
});

ipcMain.on("RecordResize", () => {
  console.log("resize");
});

ipcMain.on("RecordClose", () => {
  recordWindow.close();
});

ipcMain.on("RollModal", (currentWindow) => {
  currentWindow.minimize();
});

ipcMain.on("CloseModal", (currentWindow) => {
  currentWindow.close();
});

ipcMain.on("ResizeModal", (currentWindow) => {
  console.log("Resize!");
});

ipcMain.on("RecordSelectVideo", async () => {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });


  const videoMenu = Menu.buildFromTemplate(
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => recordWindow.webContents.send("stream", source)
      }
    })
  );
  videoMenu.popup();

});

ipcMain.on("geTime", () => {
  let time = moment().format('MMMM Do YYYY, h:mm:ss a');
  recordWindow.webContents.send("Time", time)
});

ipcMain.on("saveVideo", async (buffer) => {
  console.log("dfdfdf");
  let contentVideoFile = buffer;
  let time = moment().format('MMMM Do YYYY, h:mm:ss a');
  const { filePath } = await dialog.showSaveDialog({

    buttonLabel: 'Сохранить видео',
    defaultPath: `vid-${time.trim()}.webm`
  });
  fs.writeFile(filePath, contentVideoFile, console.log(`Video was saved successfully`))
})
