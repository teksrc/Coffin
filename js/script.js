const notifier = require("electron-notifications");
const path = require("path");
const iconPath = path.join(__dirname, "sleep.png");
const os = require("os");
const audio = new Audio("alert.mp3"); 
const exec = require("child_process").exec;
const schedule = require("node-schedule"); 
const {shell} = require("electron");
const settings = require("electron-settings");
const fs = require("fs");
const filePath = path.join(__dirname, "settings.txt");

let i = null
let restNotification = false
let upTimeNotification = false
let time = null
let appVersion = null
let militaryTime = false
let seenRelease = false
let mins = []
let hours = []
let jobs = []
let sleepTimes = []
let meridians = []
let tempTime = []
let latestRelease = null
let upTimeJob = null
let resetTime = null


function militaryToStandard(hours) {
    var hours = ((hours + 11) % 12) + 1
    return hours
}


function ampm(hours24)
{
  hours24 = parseInt(hours24,10)
  if (hours24 > 11)
  {
    return "pm";
  }
  else
  {
    return "am";
  }
}

function nodeJobs() {
    for (i = 0; i < 6; i++) {
        try {
            jobs[i].cancel();
        } catch (e) {
          continue;
        }

        jobs[i] = schedule.scheduleJob(sleepTimes[i], showNotification);
    }
    try {
      jobs[6].cancel();
      upTimeJob.cancel();
    } catch (e) {

    }
    jobs[6] = schedule.scheduleJob(resetTime, setTime);

    upTimeJob = schedule.scheduleJob("0 0 * * * *", _ => {
    upTimeJobs();
  });
}


function setSleepTimes() 
    {

  if (militaryTime)
  {
    for (i = 0; i < 6; i++) {
        if (sleepTimes[i].getHours() < 10) {
            hours[i] = "0" + sleepTimes[i].getHours()
        } else {
            hours[i] = sleepTimes[i].getHours()
        }
        if (sleepTimes[i].getMinutes() < 10) {
            mins[i] = "0" + sleepTimes[i].getMinutes()
        } else {
            mins[i] = sleepTimes[i].getMinutes()
        }
    }

    document.getElementById("lblcheck0").innerHTML = hours[0] + ":" + mins[0]
    document.getElementById("lblcheck1").innerHTML = hours[1] + ":" + mins[1]
    document.getElementById("lblcheck2").innerHTML = hours[2] + ":" + mins[2]
    document.getElementById("lblcheck3").innerHTML = hours[3] + ":" + mins[3]
    document.getElementById("lblcheck4").innerHTML = hours[4] + ":" + mins[4]
    document.getElementById("lblcheck5").innerHTML = hours[5] + ":" + mins[5]
  }
  else
  {
    for (i = 0; i < 6; i++) {
        if (militaryToStandard(sleepTimes[i].getHours()) < 10) { 
            hours[i] = "0" + militaryToStandard(sleepTimes[i].getHours())
        } else {
            hours[i] = militaryToStandard(sleepTimes[i].getHours())
        }
        if (sleepTimes[i].getMinutes() < 10) {
            mins[i] = "0" + sleepTimes[i].getMinutes()
        } else {
            mins[i] = sleepTimes[i].getMinutes()
        }
        meridians[i] = ampm(sleepTimes[i].getHours())
    }
    document.getElementById("lblcheck0").innerHTML = hours[0] + ":" + mins[0] + meridians[0]
    document.getElementById("lblcheck1").innerHTML = hours[1] + ":" + mins[1] + meridians[1]
    document.getElementById("lblcheck2").innerHTML = hours[2] + ":" + mins[2] + meridians[2]
    document.getElementById("lblcheck3").innerHTML = hours[3] + ":" + mins[3] + meridians[3]
    document.getElementById("lblcheck4").innerHTML = hours[4] + ":" + mins[4] + meridians[4]
    document.getElementById("lblcheck5").innerHTML = hours[5] + ":" + mins[5] + meridians[5]
}
}


function generateSleepTimes() {
    var splitTime = time.split(":")
    var wakeUpDate = new Date()
    if (splitTime[0] < wakeUpDate.getHours() ||(splitTime[0] === wakeUpDate.getHours() && splitTime[1] < wakeUpDate.getMinutes()))
    {
        wakeUpDate.setDate(wakeUpDate.getDate() + 1)
    }
    wakeUpDate.setHours(splitTime[0] - settings.get("lagHours"))
    wakeUpDate.setMinutes(splitTime[1] - settings.get("lagMinutes"))
    wakeUpDate.setSeconds(0)
    wakeUpDate.setMilliseconds(0)

    for (i = 0; i < 6; i++) {
        wakeUpDate.setHours(wakeUpDate.getHours() - 1)
        wakeUpDate.setMinutes(wakeUpDate.getMinutes() - 30)
        sleepTimes[i] = new Date(wakeUpDate)
    }
    sleepTimes = sleepTimes.reverse()
    wakeUpDate = new Date(sleepTimes[5])
    wakeUpDate.setHours(wakeUpDate.getHours() + 1)
    resetTime = new Date(wakeUpDate)
}


function setTime() {
    settings.set("Version","v1.0.0")
    time = document.getElementById("alarmTime").value
    generateSleepTimes()
    setSleepTimes()
    document.getElementById("sleepTimes").innerHTML = "Optimal sleeping times"
    nodeJobs()
    document.getElementById("lblTime").innerHTML = "Notifications set."

}

function writeFile(settingsData)
{
  fs.writeFile(filePath, settingsData, (err) => {
  if (err)
  {
    throw err
  }
})
try
{
fs.chmodSync(filePath, "777")
}
catch (e)
{
  throw e
}
}

function readPreferences()
{
  if (settings.get("militaryTime","false") === "true")
  {
    militaryTime = true
  }
  else
  {
    militaryTime = false
  }
  time = settings.get("defaultTime","08:30")
  appVersion = settings.get("Version","v1.6.0")
  document.getElementById("alarmTime").value = time
  setTime()
}

function loadPreferences()
{
  appVersion = settings.get("Version","v1.6.0");
  if (settings.get("militaryTime","false") === "true")
  {
    militaryTime = true
  }
  else
  {
    militaryTime = false
  }
  if (militaryTime)
  {
    document.getElementById("timeType").checked = true
    document.getElementById("timeType2").checked = false
  }
  else
  {
    document.getElementById("timeType").checked = false
    document.getElementById("timeType2").checked = true
  }
  if (settings.get("closeOnX","true") === "true")
  {
    document.getElementById("closeOnXcheck").checked = true
  }
  else
  {
    document.getElementById("closeOnXcheck").checked = false
  }
  document.getElementById("defaultTime").value = settings.get("defaultTime","08:30")
  document.getElementById("lagHours").value = settings.get("lagHours","0")
  document.getElementById("lagMinutes").value = settings.get("lagMinutes","15")
  document.getElementById("upTimeHours").value = settings.get('upTimeHours',"12")
  document.getElementById("upTimeMinutes").value = settings.get('upTimeMinutes',"0")
}


function setPreferences()
{
  settings.set("militaryTime",(document.getElementById("timeType").checked).toString())
  settings.set("defaultTime",document.getElementById("defaultTime").value)
  settings.set("closeOnX",(document.getElementById("closeOnXcheck").checked).toString())
  settings.set("lagHours",document.getElementById("lagHours").value)
  settings.set("lagMinutes",document.getElementById("lagMinutes").value)
  settings.set("upTimeHours",document.getElementById('upTimeHours').value)
  settings.set("upTimeMinutes",document.getElementById('upTimeMinutes').value)
  var tempstring = settings.get("closeOnX") + " Coffin"
  writeFile(tempstring)
}


function showNotification() {
  if (!restNotification)
  {
    restNotification = true
    try {
        audio.play()
    } catch (e) {

    }
    const notification = notifier.notify("Coffin", {
        message: "Time to rest",
        icon: iconPath,
        buttons: ["Dismiss", "Shutdown"],
        vetical: true,
        duration: 99999999999999,
    })

    notification.on("clicked", _ => { 
        notification.close();
        restNotification = false;
    })

    notification.on("swipedRight", _ => {
        notification.close();
        restNotification = false;
    })

    notification.on("buttonClicked", (text, buttonIndex, options) => { 
        if (text === "Dismiss") {
            notification.close()
            restNotification = false
        } else if ("Shutdown Computer") {
            confirmShutdownNotification()
            notification.close()
            restNotification = false
        }

    })
  }
}

function getLatestReleaseInfo() {
  if(!seenRelease)
  {
   $.getJSON("https://api.github.com/repos/Frankcarvajal/Coffin/tags").done((json) => { 
        var release = json[0].name
        latestRelease = release
        release = release.split("")
        var myversion = settings.get("Version","v1.0.0").split("")

        if (release[1] > myversion[1])
        {
          showLatestUpdateNotification("Major Update")
        }
        else if (release[1] === myversion[1] && release[3] > myversion[3])
        {
          showLatestUpdateNotification("Minor Update")
          //console.log(release[3] + " " + myversion[3])
        }
        else if (release[1] === myversion[1] && release[3] === myversion[3] && release[5] > myversion[5])
        {
          showLatestUpdateNotification("Bugfixes")
        }
        else {
          //    console.log("Running the latest release of Coffin")
        }
   })
 }
 seenRelease = true
}

function showUpTimeNotification() {
  if (!upTimeNotification)
  {

  upTimeNotification = true;
    try {
        audio.play()
    } catch (e) {

    }
    const notification = notifier.notify("Coffin", {
        message: "Your computer needs a break",
        icon: iconPath,
        buttons: ["Dismiss", "Restart"],
        vetical: true,
        duration: 99999999999999,
    })

    notification.on("clicked", _ => {
        upTimeNotification = false
        notification.close()
    })

    notification.on("swipedRight", _ => {
        upTimeNotification = false
        notification.close()
    })

    notification.on("buttonClicked", (text, buttonIndex, options) => { 
        if (text === "Dismiss") {
          upTimeNotification = false
            notification.close()
        } else if ("Restart") {
          confirmRestartNotification()
          notification.close()
          upTimeNotification = false

        }
    })
  }
}
function confirmShutdownNotification() {
    try {
        audio.play()
    } catch (e) {

    }
    const notification = notifier.notify("Coffin", {
        message: "Confirm Shutdown",
        icon: iconPath,
        buttons: ["Cancel", "Confirm"],
        vetical: true,
        duration: 20000,
    })

    notification.on("clicked", _ => {
        notification.close()
    })

    notification.on("swipedRight", _ => {
        notification.close()
    })

    notification.on("buttonClicked", (text, buttonIndex, options) => { 
        if (text === "Cancel") {
            notification.close()
        } else if ("Confirm") {
            shutdown()
        }

    })
}

function confirmRestartNotification() {
    try {
        audio.play()
    } catch (e) {

    }
    const notification = notifier.notify("Coffin", {
        message: "Confirm Restart",
        icon: iconPath,
        buttons: ["Cancel", "Confirm"],
        vetical: true,
        duration: 20000,
    })

    notification.on("clicked", _ => {
        notification.close()
    })

    notification.on("swipedRight", _ => {
        notification.close()
    })

    notification.on("buttonClicked", (text, buttonIndex, options) => { 
        if (text === "Cancel") {
            notification.close()
        } else if ("Confirm") {
            restart()
        }

    })
}

function showLatestUpdateNotification(updateType) {
    try {
        audio.play()
    } catch (e) {

    }
    const notification = notifier.notify("Coffin", {
        message:  updateType + " Available",
        icon: iconPath,
        buttons: ["Dismiss", "Update Page"],
        vetical: true,
        duration: 20000,
    })

    notification.on("clicked", _ => {
        notification.close()
    })

    notification.on("swipedRight", _ => {
        notification.close();
    })

    notification.on("buttonClicked", (text, buttonIndex, options) => { 
        if (text === "Dismiss") {
            notification.close()
        } else if ("Update Page") {
            shell.openExternal("https://github.com/alexanderepstein/Coffin/releases/tag/" + latestRelease)
        }
    })
}


function shutdown(callback) {
    exec("shutdown now", (error, stdout, stderr) => {
        callback(stdout)
    })
}

function restart(callback) {
    exec("shutdown now -r", (error, stdout, stderr) => {
        callback(stdout)
    })
}

function upTimeJobs()
{
  var uptime = os.uptime()
  uptime = (uptime/60)/60
  var mins = settings.get('upTimeMinutes')
  mins = mins/60
  var hours = settings.get('upTimeHours')
  var time = hours + minutes
  if ( uptime >= time )
  {
    showUpTimeNotification()
  }
}
