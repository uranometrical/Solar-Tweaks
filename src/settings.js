import fs from 'fs';
import process from 'process';

const settingsFile = `${process.env.LOCALAPPDATA}\\SolarTweaks\\settings.json`;

export function getSetting(key) {
  return JSON.parse(readSettings())[key]
}

export function setupSettings() {
  console.log(settingsFile);
  if(!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, '', { encoding: 'utf-8' });
    console.log("Settings file created");
  }
  if(String(readSettings()).match(/^\s*$/)) {
    const settings = JSON.stringify(defaultSettings, null, 4);
    fs.writeFileSync(settingsFile, settings, { encoding: 'utf-8' });
    console.log("Settings written");
  }
}

export function readSettings() {
  return fs.readFileSync(settingsFile, { encoding: 'utf-8' });
}

export async function writeSetting(key, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let settings = JSON.parse(readSettings());
      settings[key] = value;
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 4), { encoding: 'utf-8'});
      resolve();
      console.log(`New value of ${key} written successfuly to the settings file`);
    }, 50);
  });
}

export const defaultSettings = {
  jrePath: `${process.env.USERPROFILE}\\.lunarclient\\jre\\zulu16.30.15-ca-fx-jre16.0.1-win_x64\\bin\\java.exe`,
  mappings: {
    commit: {
      id: "e976b25",
      fullId: "e976b2532c4c7dfb5969b12ce882ad52d3dbdf38",
      filePath: "lunar/ax/IllIIIlIlIIlIlIlIIIIlIlll"
    },
    patchs: {
      freelook: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/dC/lllIlIIIIlIIllllIlIlIlIIl",
          methodName: "IllIIIlIlIIlIlIlIIIIlIlll(Lcom/google/gson/JsonObject;Ljava/util/function/Predicate;Llunar/aS/IIIIlIIIllllIlllIllIIlIIl;)V",
          searchFor: `LDC "enabled"`,
          replaceWith: `LDC "removedBySolarTweaks"`
        }
      ],
      pinnedServers: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/dC/lllIlIIIIlIIllllIlIlIlIIl",
          methodName: "run()V",
          searchFor: `LDC "pinnedServers"`,
          replaceWith: `LDC "removedBySolarTweaks"`
        }
      ],
      modspacket: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "com/lunarclient/bukkitapi/nethandler/LCPacket",
          methodName: "<clinit>()V",
          searchFor: `AD:
  LINE AD 56
  BIPUSH 31
  LDC Lcom/lunarclient/bukkitapi/nethandler/client/LCPacketModSettings;
  INVOKESTATIC com/lunarclient/bukkitapi/nethandler/LCPacket.addPacket(ILjava/lang/Class;)V
  AE:`,
          replaceWith: "AE:"
        }
      ]
    }
  }
}