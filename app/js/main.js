(function() {
    'use strict';

    const remote = require('remote');

    const Tray = remote.require('tray');
    const Menu = remote.require('menu');
    const path = require('path');
    const ipcRenderer = require('electron').ipcRenderer;

    const dialog = remote.require('dialog');

    let trayIcon = null;

    if (process.platform === 'darwin') {
        trayIcon = new Tray(path.join(__dirname, 'img/heart-white.png'));
    } else {
        trayIcon = new Tray(path.join(__dirname, 'img/heart.png'));
    }

    let trayMenuTemplate = [
        {
            label: 'Menu 1',
            enabled: false
        }, {
            label: 'Menu 2',
            click: function () {
                alert('Menu 2');
            }
        }, {
            label: 'Quit',
            click: function () {
                ipcRenderer.send('close-main-window');
            }
        }
    ];

    let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
    trayIcon.setContextMenu(trayMenu);

    document.body.addEventListener('click', function() {
        dialog.showMessageBox({
            message: 'My first Electron click',
            buttons: ['Yeah!']
        });
    });
}());
