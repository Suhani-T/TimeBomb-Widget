const { app, BrowserWindow } = require('electron');
const { join } = require('path'); // Correctly using 'join'

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 270,
        height: 130,
        icon: join(__dirname, 'bomb_timer', 'bomb_icon.ico'), // Set icon path here

        frame: false,
        // resizable: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('bomb.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

const { ipcMain } = require('electron');

ipcMain.on('move-window', (event, data) => {
    mainWindow.setBounds({
        x: data.x,
        y: data.y
    });
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});



// const { app, BrowserWindow } = require('electron');
// const { join } = require('path');


// let mainWindow;

// function createWindow() {
//     // Create the browser window
//     mainWindow = new BrowserWindow({
//         width: 255,  // Set the width of the window (in pixels)
//         height: 114, // Set the height of the window (in pixels)
//         icon: join(__dirname, 'bomb_timer','bomb_picture_2.png'),  // Window icon
//         frame: false,  // Disable the default frame so the window can be draggable
//         transparent: true, // Make the window background transparent if needed (optional)
//         alwaysOnTop: true, // Keep window always on top
//         webPreferences: {
//             preload: join(__dirname, 'preload.js'),  // Add preload script

//             nodeIntegration: true,  // Enable Node.js integration
//             contextIsolation: true // Allow use of Node.js in renderer
//             // preload: path.join(__dirname, 'preload.js') // Preload script if needed
//         }
//     });

//     // Load the HTML file into the window
//     mainWindow.loadFile('bomb.html');


//     // Open the DevTools (optional, for debugging)
//     // mainWindow.webContents.openDevTools();

//     // Handle window close event
//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });
// }

// const { ipcMain } = require('electron');

// ipcMain.on('move-window', (event, data) => {
//     mainWindow.setBounds({
//         x: data.x,
//         y: data.y
//     });
// });


// app.whenReady().then(() => {
//     createWindow();

//     // Re-create the window on macOS if the dock icon is clicked after closing
//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow();
//         }
//     });
// });

// // Quit the app when all windows are closed (Windows/Linux)
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

