import fs from 'fs';
import fse from 'fs-extra';
import process from 'process';
import { execSync } from 'child_process';
import electron from 'electron';
import * as AdmZip from 'adm-zip';
import { getSetting } from './settings';

export const STFolderLocation = `${process.env.LOCALAPPDATA}\\SolarTweaks`;
export const STTempFolderLocation = `${STFolderLocation}\\Temp`;
const STFolder = [
  "Scripts\\",
  "Scripts\\checkCommitId.txt",
  "Scripts\\replace1.txt",
  "Scripts\\replace2.txt",
  "Temp\\",
  "Temp\\file.txt",
  "assembly.txt",
  "recaf.jar",
  "settings.json"
]

export async function checkSTFolder() {
  console.log(`Checking ST folder... (${STFolderLocation})`);
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if(!fs.existsSync(STFolderLocation)) {
          fs.mkdirSync(STFolderLocation);
        }
        let valid = true;
        STFolder.forEach(item => {
          if(!fs.existsSync(`${STFolderLocation}\\${item}`)) {
            valid = false;
          }
        });
        if(!valid) {
          if(fs.existsSync(STFolderLocation)) {
            console.log(`Deleting old ST folder...`);
            fs.rmSync(STFolderLocation, { recursive: true, force: true });
            console.log(`Old ST folder deleted`);
          }
          console.log(`Creating ST folder...`);
          fse.copySync(`${__dirname}\\..\\template`, STFolderLocation);
          console.log(`ST folder created...`);
          resolve();
        } else {
          console.log(`ST folder is valid`);
          resolve();
        }
      } catch (error) {
        resolve({error});
      }
    }, 500);
  });
}

export async function checkJavaInstallation() {
  console.log(`Checking Java Installation...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      if(fs.existsSync(getSetting('jrePath'))) {
        console.log(`Java is installed`);
        resolve(true);
      } else {
        console.error(`Java is not installed`);
        resolve(false);
      }
    }, 500);
  });
}

export async function copyJarFileToTemp(filePath) {
  console.log(`Copying JAR file to Temp folder... (${STTempFolderLocation})`);
  return new Promise((resolve) => {
    try {
      const date = new Date();
      const currentFolder = `${STTempFolderLocation}\\${date.getTime().toString()}`
      fs.mkdirSync(currentFolder);
      console.log(`Creating temporary folder... (${currentFolder})`);
      setTimeout(() => {
        console.log(`Copying JAR file...`);
        fs.copyFileSync(filePath, `${currentFolder}\\currentJarFile.jar`);
        console.log(`JAR file copied`);
        resolve(currentFolder);
      }, 1000);
    } catch (error) {
      resolve({error});
    }
  });
}

export async function convertLclasses(currentFolderPath) {
  console.log(`Converting lclasses...`);
  const mappings = getSetting('mappings');
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const filesToRename = [ `${mappings.commit.filePath}.lclass` ];
        for (const [ key ] of Object.entries(mappings.patchs)) {
          mappings.patchs[key].forEach(item => {
            filesToRename.push(`${item.path}.lclass`);
          });
        }

        const jarFile = new AdmZip(`${currentFolderPath}\\currentJarFile.jar`);
        const newJarFile = new AdmZip();
        jarFile.getEntries().forEach(entry => {
          if(filesToRename.includes(entry.entryName)) {
            newJarFile.addFile(entry.entryName.replaceAll('.lclass', '.class'), entry.getData(), entry.comment, entry.attr);
          } else {
            newJarFile.addFile(entry.entryName, entry.getData(), entry.comment, entry.attr)
          }
        });

        newJarFile.writeZip(`${currentFolderPath}\\currentJarFile.jar`);
        console.log(`lclasses converted`);
        resolve();
      } catch (error) {
        resolve({error});
      }
    }, 750);
  });
}

export async function convertClasses(currentFolderPath) {
  console.log(`Converting classes...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const jarFile = new AdmZip(`${currentFolderPath}\\currentJarFile.jar`);
        const newJarFile = new AdmZip();
        jarFile.getEntries().forEach(entry => {
          newJarFile.addFile(entry.entryName.replaceAll('.class', '.lclass'), entry.getData(), entry.comment, entry.attr);
        });
        newJarFile.writeZip(`${currentFolderPath}\\currentJarFile.jar`);
        console.log(`Classes converted`);
        resolve();
      } catch (error) {
        resolve({error});
      }
    }, 750);
  });
}

export async function findCommitId(currentFolderPath) {
  const mappings = getSetting('mappings');
  console.log(`Finding commit ID...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const scriptLocation = `${STFolderLocation}\\Scripts\\checkCommitId.txt`;
      try {
        const defaultScript = fs.readFileSync(scriptLocation, { encoding: 'utf8' });
        fs.writeFileSync(scriptLocation, defaultScript.replace('$commitIdFilePath', mappings.commit.filePath), { encoding: 'utf-8' });
        const output = execSync(startRecaf(currentFolderPath, scriptLocation)).toString();
        fs.writeFileSync(scriptLocation, defaultScript, { encoding: 'utf-8' });
        if(output.includes(mappings.commit.id) && output.includes(mappings.commit.fullId)) {
          console.log(`Commit ID found`);
          resolve();
        } else {
          console.log(`Commit ID not found (probably invalid Lunar version)`);
          resolve(null);
        }
      } catch (error) {
        resolve({error});
      }
    }, 1000);
  });
}

export async function patch(currentFolderPath, patchName) {
  const mappings = getSetting('mappings');
  console.log(`Executing patch "${patchName}"...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const patchs = mappings.patchs[patchName];
      for (const patchIndex in patchs) {
        const patch = patchs[patchIndex];
        switch (patch.patchType) {
          case "replace": {
            // Search for
            const searchForScriptLocation = `${STFolderLocation}\\Scripts\\${patch.scripts.searchFor}`;
            const defaultSearchForScript = fs.readFileSync(searchForScriptLocation, { encoding: 'utf-8' });
            fs.writeFileSync(searchForScriptLocation, defaultSearchForScript
              .replace('$dest', `${STFolderLocation}\\\\assembly.txt`)
              .replace('$classPath', patch.path)
              .replace('$method', patch.methodName));
            execSync(startRecaf(currentFolderPath, searchForScriptLocation));
            fs.writeFileSync(searchForScriptLocation, defaultSearchForScript);
            
            // Replace file
            const assemblyCode = fs.readFileSync(`${STFolderLocation}\\assembly.txt`, { encoding: 'utf-8' });
            fs.writeFileSync(`${STFolderLocation}\\assembly.txt`, assemblyCode.replaceAll(patch.searchFor, patch.replaceWith), { encoding: 'utf-8' });

            // Replace with
            const replaceWithScriptLocation = `${STFolderLocation}\\Scripts\\${patch.scripts.replaceWith}`
            const defaultReplaceWithScript = fs.readFileSync(replaceWithScriptLocation, { encoding: 'utf-8' });
            fs.writeFileSync(replaceWithScriptLocation, defaultReplaceWithScript
              .replace('$classPath', patch.path)
              .replace('$method', patch.methodName)
              .replace('$input', `${STFolderLocation}\\\\assembly.txt`)
              .replace('$outputFile', `${currentFolderPath}\\\\currentJarFile.jar`));
            execSync(startRecaf(currentFolderPath, replaceWithScriptLocation));
            fs.writeFileSync(replaceWithScriptLocation, defaultReplaceWithScript);
            console.log(`Patch "${patchName}" executed`)
            resolve();
            break;
          }
          default: {
            resolve();
            break;
          }
        }
      }
    }, 250);
  });
}

export async function saveBuild(currentFolderPath, selectedPatches) {
  console.log(`Saving build...`);
  // Applying patches
  for (const patchIndex in selectedPatches) {
    const patchName = selectedPatches[patchIndex];
    await patch(currentFolderPath, patchName);
  }

  await convertClasses(currentFolderPath);

  return new Promise((resolve) => {
    // Saving file
    setTimeout(() => {
      console.log(`Opening save dialog...`);
      try {
        let filePath = electron.remote.dialog.showSaveDialogSync({
          title: "Save your custom Lunar build",
          defaultPath: `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8\\lunar-prod-optifine.jar`,
          buttonLabel: "Save build",
          filters: [{ name: "JAR File", extensions: [ "jar" ] }],
          properties: [ "showHiddenFiles", "dontAddToRecent" ]
        });
        if(!filePath) {
          console.log(`Save path not choosed`);
          resolve(false);
          return;
        }
        console.log(`Copying JAR file to final destination...`);
        fs.copyFileSync(`${currentFolderPath}\\currentJarFile.jar`, filePath);
        console.log(`JAR file copied`);
        resolve(filePath);
      } catch (error) {
        resolve({error});
      }
    }, 1500);
  });
}

export async function clearCache(currentFolderPath) {
  console.log(`Clearing cache...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        console.log(currentFolderPath);
        fs.rmdirSync(currentFolderPath, { recursive: true, force: true });
        console.log(`Cache cleared`);
        resolve();
      } catch (error) {
        resolve({error}); 
      }
    }, 500);
  });
}

function startRecaf(currentFolderPath, scriptLocation) {
  return `"${getSetting('jrePath')}" -jar "${STFolderLocation}\\recaf.jar" "--input=${currentFolderPath.replaceAll('/', '\\\\').replaceAll('\\', '\\\\')}\\\\currentJarFile.jar" --cli "--script=${scriptLocation}"`;
}