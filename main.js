const {app, Tray, Menu, shell, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
const iconPath = path.join(__dirname, "icon.png");
const fs = require("fs");
const filePath = path.join(__dirname, "settings.txt");
let tray = null;
let win = null;
let pref = null;
let abt = null;
var closeOnX = false;
var mySettings = [];


function readFile()
{
  mySettings = fs.readFileSync(filePath,"utf8"); 
  mySettings = (mySettings).split(" ");
}

function getCloseOnXPref()
{
  readFile();
  if (mySettings[0]==="true")
  {
    closeOnX = true;
  }
  else {
    closeOnX = false;
  }
  return;
}

app.on("ready", function(){
  win = new BrowserWindow({width: 600, height: 475, resizable: false});

  win.setMenu(null);
  win.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true
  }));


  getCloseOnXPref();

  win.on("minimize",function(event){
        event.preventDefault();
            win.hide();
  });

  win.on("close", function (event) {
    if (closeOnX)
    {
      app.quit();
    }
    else {

        if( !app.isQuiting){
            event.preventDefault();
            win.hide();
        }
    }
  });

  tray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([

          { label: "Coffin", click:  function(){
              win.show();
          } },
          { label: "About", click:  function(){
            abt = new BrowserWindow({width: 500, height: 600, resizable: false});
            abt.setMenu(null);
            abt.loadURL(url.format({
              pathname: path.join(__dirname, "about.html"),
              protocol: "file:",
              slashes: true
            }));
          } },
          {
            label: "Preferences", click:  function(){
              pref = new BrowserWindow({width: 400, height: 650, resizable: false});
              pref.setMenu(null);
              pref.loadURL(url.format({
                pathname: path.join(__dirname, "preferences.html"),
                protocol: "file:",
                slashes: true
              }));
            }
          },
          {
            label: "Report a bug...", click:  function(){
              shell.openExternal("https://github.com/Frankcarvajal/Coffin/issues/new");
            }
          },
          { label: "Quit", click:  function(){
              app.isQuiting = true;
              app.quit();

          } }
      ]);
  tray.setToolTip("Coffin");
  tray.setContextMenu(contextMenu);
});
