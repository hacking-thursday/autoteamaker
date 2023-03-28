// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    ;
})

const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        console.log(channel, data);
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
});
