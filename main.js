const { app, BrowserWindow } = require("electron");

function createWindow() {
  // create the browser window
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // load the previously created index.html file
  win.loadFile("index.html");
}

// open the window when the application is ready
app.whenReady().then(createWindow);
