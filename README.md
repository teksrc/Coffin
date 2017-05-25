<div align="center">

 # ![Coffin](https://github.com/Frankcarvajal/Coffin/blob/master/sleep_github.png) #Coffin

 ####  Vampire Developers Needed An Application To Remind Them To Stop Coding, And Go To Sleep, Via Coffin.

![Version](https://img.shields.io/github/release/Frankcarvajal/Coffin/all.svg) [![Github All Releases](https://img.shields.io/github/downloads/Frankcarvajal/Coffin/total.svg)]()  [![Codacy Badge](https://api.codacy.com/project/badge/Grade/12b7f0ba50924e73b3efba2927a8c3ea)](https://www.codacy.com/app/Frankcarvajal/Coffin?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Frankcarvajal/Coffin&amp;utm_campaign=Badge_Grade)  ![framework](https://img.shields.io/badge/framework-electron-blue.svg)  ![platform](https://img.shields.io/badge/platform-crossplatform-lightgrey.svg)  [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)]()


 ![VAMPIRE DEVS](https://github.com/Frankcarvajal/Coffin/blob/master/giphy.gif)

 Coffin will remind you to take a rest and that you can always come back to the work tomorrow.

A sleep cycle is a 90-minute chunk of time where your body transitions through various phases of sleep — all the way down to deep REM sleep — then back again. Some health experts believe that these 90-minute sleep cycles are the key to restful sleep. They recommend trying to sleep exactly 7.5 hours — or even 9 hours, if you have the time.


Based on your wakeup time, the sleep algorithm Coffin calculates the best times for you to sleep. It will notify you with native notifications throughout the night when the optimal times to shutdown your computer and head to your coffin.
This notification also has a button to immediately shutdown the OS, if necessary. 

Inpsiration came from http://sleepyti.me and grew into a desktop notification application called Coffin.

</div>

## In Action

![Usage](https://github.com/Frankcarvajal/Coffin/blob/master/screenshots/Usage.gif)


## Downloads
To get the full sourced version run in terminal:
```bash
git clone https://github.com/Frankcarvajal/Coffin
```

Otherwise to just get the application click the link before to head to the latest release page and download your respective platform.
##### [Version 1.6.0 Release](https://github.com/Frankcarvajal/Coffin/releases/tag/v1.0.0)


## Install

### Mac
Drag the Coffin.app from the Coffin dmg to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

### Linux
Open up a terminal and navigate to the folder containing the downloaded installer files and run
#### Debian
First make sure you have the dependency libappindicator1
```bash
sudo apt-get install libappindicator1
```
then depending on your system architechture either run

```bash
sudo dpkg -i Coffin_1.6.0_amd64.deb
```
Or:
```bash
sudo dpkg -i Coffin_1.6.0_x86.deb
```
#### RedHat
```bash
sudo rpm -i Coffin.rpm
```
 This will actually install Coffin as a utility application which can be accessed from your respective distributions application launchpad.

### Windows
Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant). Now drag the entire Coffin Windows folder you extracted  from the downloaded zip in the previous step over to the program files folder. Go into the folder that was just dragged over and find the Coffin.exe and run it. Now the application will show up in the dock where it can be pinned.

## Uninstall

### Mac
Go to the applications folder and delete the Coffin application by sending to trash.

### Linux
Open up a terminal and run:
#### Debian

```bash
sudo dpkg --remove Coffin
```
#### RedHat

```bash
sudo rpm -e Coffin.rpm
```

### Windows
Open up the program files folder and delete the Coffin folder.

## Helping Out
It is assumed you already have node installed and therefore npm.

To download the full source code and install the devDependencies run the following lines:
```bash
git clone https://github.com/Frankcarvajal/Coffin
cd Coffin
npm install
cd ..
npm start # this will run the application
```   

If you get some error and the application wont run try running the following lines and see if that works.

### Linux/Mac
```bash
cd Coffin
sudo npm install -g
```

### Windows
Right click on the start menu icon at the bottom left and click on the option to open a command prompt in developer mode
cd to the coffin directory then run
```bash
npm install -g
```
### CSS Compilation

Coffin's styling was made with: [Sass](http://sass-lang.com/) `v3.3.14`  [Ruby](https://www.ruby-lang.org/) `v2.3.1p112`.

For Mac users ruby is pre-installed, but if you are on Windows or Linux, you will need to install Ruby

 To compile the stylesheet you'll only need to run the following command:
 ```bash
 sass --watch scss:css --style compressed
 ```


### To Package Electron Application To Binary
First run

### Linux/Mac/Windows
```bash
npm run build # this will create versions of the application for MacOS, Windows, & Linux
```
### Package.json Build variations

### Linux
For 64 Bit Binary:
```bash
electron-packager . Coffin --platform linux --arch x64 --out dist/
```
For 32 Bit Binary
```bash
electron-packager . Coffin --platform linux --arch ia32 --out dist/
```
### Mac
```bash
electron-packager . Coffin --platform darwin --arch x64 --out dist/
```

### Windows
For 64 Bit Binary:
```bash
electron-packager . Coffin --platform win32 --arch x64 --out dist/
```
For 32 Bit Binary
```bash
electron-packager . Coffin --platform win32 --arch ia32 --out dist/
```

### App Icon and Build for All Build variations
```bash
electron-packager . Coffin --platform darwin,win32,linux --arch x64 --icon=iconnameonly --out dist/
```


## License

MIT License

Copyright (c) 2017 Franklin Carvajal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
