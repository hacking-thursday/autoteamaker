// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    ipcMain,
    Menu,
    Tray
} = require('electron')
const path = require('path')
const pty = require('node-pty')
const {
    spawn
} = require('child_process');

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: true, // Set display to show by default
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    var ptyProcess = pty.spawn("bash", [], {
        name: "xterm-color",
        cols: 80,
        rows: 36,
        cwd: path.resolve(app.getAppPath(), "../"),
        env: process.env
    });

    ptyProcess.on('data', function(data) {
        mainWindow.webContents.send("terminal.incomingData", data);
        if ( data.search(/>>> RELOAD data.json .../) >= 0 ) { mainWindow.reload(); }
    });

    ipcMain.on("terminal.command", (event, args) => {
        ptyProcess.write(args + "\r");
    });

    ipcMain.on("terminal.command_fork", (event, args) => {
        cmd = args
        spawn("bash", ['-c', cmd], {
            shell: false,
            cwd: path.resolve(app.getAppPath(), "../")
        })
    });

    ipcMain.on("terminal.controlc", (event, args) => {
        ptyProcess.write('\x03');
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    tray = new Tray('favicon.png')
    const contextMenu = Menu.buildFromTemplate([
	{
            label: 'Show',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Hide',
            click: () => {
                mainWindow.hide();
            }
        },
        {
            label: 'Debug',
            click: () => {
                mainWindow.webContents.toggleDevTools();
            }
        },
        {
            label: 'Restart',
            click: () => {
                mainWindow.hide();
                cmd = path.resolve(app.getAppPath(), "../") + "/autoteamaker-gui"
                spawn(cmd, [], {
                    shell: false
                });
                setTimeout(() => {
                    app.exit();
                }, 7000);
            }
        },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        }
    ])
    tray.setToolTip('')
    tray.setContextMenu(contextMenu)
    // Toggle show/hide by click tray icon
    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    })

    let isQuit = false;
    mainWindow.on('close', (event) => {
        // Hide instead of close if not quit
        if (!isQuit) {
            event.preventDefault();
            mainWindow.hide();
        }
    })
    app.on("before-quit", () => {
        isQuit = true
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
