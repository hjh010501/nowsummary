var electron = require('electron')
var defaultWindowOpts = require('electron-browser-window-options')
var BrowserWindow = electron.BrowserWindow
var app = electron.app
const remote = require('electron').remote
const ipcMain = require('electron').ipcMain
// require('./js/window')

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win

var myOpts = Object.assign({}, defaultWindowOpts, {
  width: 400,
  height: 650,
  resizable: false,
  title: 'nowsummary',
  minimizable: false,
  maximizable: false,
  frame: false,
  darkTheme: true,
  alwaysOnTop: true,
  javascript: true,
  center: undefined,
  backgroundColor: '#fff',
  transparent: true
})

  function createWindow () {
    win = new BrowserWindow(myOpts)
    win.loadFile('index.html')
    win.on('closed', () => {
      win = null
    })
  }

  ipcMain.on('savehtml',(event, args) =>{
    //최대인지 확인후 최대화 또는 최대화 취소
    let content = remote.getCurrentWebContents()
    content.savePage('/history/test.html', "HTMLComplete")
    event.sender.send('result', 'MainProcess에서 신호보냄');
});

  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })