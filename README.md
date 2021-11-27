# Solar Tweaks

Solar Tweaks' official software, all open sourced of course.

# What is Solar Tweaks?

Solar Tweaks is a software that allows you to tweak Lunar Client to your liking and re-enable some features that are completely disabled such as Freelook or AutoTextHotkey. 

However, those mods are disabled by the server for a reason. If you use Solar Tweaks to re-enable these mods on servers that ban them, **you are cheating (on Hypixel it is cheating).** Therefore, **use those features of Solar Tweaks at your own risk.**

# How can I build it from source?

If you want to build it from source, make sure you have installed:
 - [Git](https://git-scm.com/downloads)
 - [NodeJS (with npm)](https://nodejs.org/en/download/)

If you want to build it manually you will need to download the source code from GitHub. You can do so by using the following command:
```bash
$ git clone https://github.com/Solar-Tweaks/Solar-Tweaks.git
```

Once downloaded, you will need to install the dependencies. Move to the project folder and run following commands:
```bash
$ cd Solar-Tweaks
$ npm install
```

Now you can build the software. Run the following command:
```bash
$ npm run electron:build
```
