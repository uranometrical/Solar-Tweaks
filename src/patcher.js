import fs from 'fs';
import fse from 'fs-extra';
import process from 'process';
import { execSync } from 'child_process';
import electron from 'electron';
import * as AdmZip from 'adm-zip';

import { mappings } from './mappings';

const LTFolderLocation = `${process.env.LOCALAPPDATA}\\LunarTweaks`;
const LTTempFolderLocation = `${LTFolderLocation}\\Temp`;
const lcJreLocation = `${process.env.USERPROFILE}\\.lunarclient\\jre\\zulu16.30.15-ca-fx-jre16.0.1-win_x64\\bin\\java.exe`;

export async function checkLTFolder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if(!fs.existsSync(LTFolderLocation)) {
          fse.copySync(`${__dirname}\\..\\template`, LTFolderLocation);
          resolve();
        } else resolve();
      } catch (error) {
        resolve({error});
      }
    }, 500);
  });
}

export async function checkJavaInstallation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(fs.existsSync(lcJreLocation)) {
        resolve(true);
      } else resolve(false);
    }, 500);
  });
}

export async function copyJarFileToTemp(filePath) {
  return new Promise((resolve) => {
    try {
      const date = new Date();
      const currentFolder = `${LTTempFolderLocation}\\${date.getTime().toString()}`
      fs.mkdirSync(currentFolder);
      setTimeout(() => {
        fs.copyFileSync(filePath, `${currentFolder}\\currentJarFile.jar`);
        resolve(currentFolder);
      }, 1000);
    } catch (error) {
      resolve({error});
    }
  });
}

export async function convertLclasses(currentFolderPath) {
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
        resolve();
      } catch (error) {
        resolve({error});
      }
    }, 750);
  });
}

export async function convertClasses(currentFolderPath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const jarFile = new AdmZip(`${currentFolderPath}\\currentJarFile.jar`);
        const newJarFile = new AdmZip();
        jarFile.getEntries().forEach(entry => {
          newJarFile.addFile(entry.entryName.replaceAll('.class', '.lclass'), entry.getData(), entry.comment, entry.attr);
        });
        newJarFile.writeZip(`${currentFolderPath}\\currentJarFile.jar`);
        resolve();
      } catch (error) {
        resolve({error});
      }
    }, 750);
  });
}

export async function findCommitId(currentFolderPath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const scriptLocation = `${LTFolderLocation}\\Scripts\\checkCommitId.txt`;
      try {
        const defaultScript = fs.readFileSync(scriptLocation, { encoding: 'utf8' });
        fs.writeFileSync(scriptLocation, defaultScript.replace('$commitIdFilePath', mappings.commit.filePath), { encoding: 'utf-8' });
        const output = execSync(startRecaf(currentFolderPath, scriptLocation)).toString();
        fs.writeFileSync(scriptLocation, defaultScript, { encoding: 'utf-8' });
        if(output.includes(mappings.commit.id) && output.includes(mappings.commit.fullId)) {
          resolve();
        } else resolve(null);
      } catch (error) {
        resolve({error});
      }
    }, 1000);
  });
}

export async function patch(currentFolderPath, patchName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const patchs = mappings.patchs[patchName];
      for (const patchIndex in patchs) {
        const patch = patchs[patchIndex];
        switch (patch.patchType) {
          case "replace": {
            // Search for
            const searchForScriptLocation = `${LTFolderLocation}\\Scripts\\${patch.scripts.searchFor}`;
            const defaultSearchForScript = fs.readFileSync(searchForScriptLocation, { encoding: 'utf-8' });
            fs.writeFileSync(searchForScriptLocation, defaultSearchForScript
              .replace('$dest', `${LTFolderLocation}\\\\AssemblyCode\\\\${patch.textFile}`)
              .replace('$classPath', patch.path)
              .replace('$method', patch.methodName));
            execSync(startRecaf(currentFolderPath, searchForScriptLocation));
            fs.writeFileSync(searchForScriptLocation, defaultSearchForScript);
            
            // Replace file
            const assemblyCode = fs.readFileSync(`${LTFolderLocation}\\AssemblyCode\\${patch.textFile}`, { encoding: 'utf-8' });
            fs.writeFileSync(`${LTFolderLocation}\\AssemblyCode\\${patch.textFile}`, assemblyCode.replaceAll(patch.searchFor, patch.replaceWith), { encoding: 'utf-8' });

            // Replace with
            const replaceWithScriptLocation = `${LTFolderLocation}\\Scripts\\${patch.scripts.replaceWith}`
            const defaultReplaceWithScript = fs.readFileSync(replaceWithScriptLocation, { encoding: 'utf-8' });
            fs.writeFileSync(replaceWithScriptLocation, defaultReplaceWithScript
              .replace('$classPath', patch.path)
              .replace('$method', patch.methodName)
              .replace('$input', `${LTFolderLocation}\\\\AssemblyCode\\\\${patch.textFile}`)
              .replace('$outputFile', `${currentFolderPath}\\\\currentJarFile.jar`));
            execSync(startRecaf(currentFolderPath, replaceWithScriptLocation));
            fs.writeFileSync(replaceWithScriptLocation, defaultReplaceWithScript);
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
  // Applying patches
  for (const patchIndex in selectedPatches) {
    const patchName = selectedPatches[patchIndex];
    await patch(currentFolderPath, patchName);
  }

  await convertClasses(currentFolderPath);

  return new Promise((resolve) => {
    // Saving file
    setTimeout(() => {
      try {
        let filePath = electron.remote.dialog.showSaveDialogSync({
          title: "Save your custom Lunar build",
          defaultPath: `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8\\lunar-prod-optifine.jar`,
          buttonLabel: "Save build",
          filters: [{ name: "JAR File", extensions: [ "jar" ] }],
          properties: [ "showHiddenFiles", "dontAddToRecent" ]
        });
        if(!filePath) {
          resolve(false);
          return;
        }
        fs.copyFileSync(`${currentFolderPath}\\currentJarFile.jar`, filePath);
        resolve(filePath);
      } catch (error) {
        resolve({error});
      }
    }, 1500);
  });
}

export async function clearCache(currentFolderPath) {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        console.log(currentFolderPath);
        fs.rmdirSync(currentFolderPath, { recursive: true, force: true });
        resolve();
      } catch (error) {
        resolve({error}); 
      }
    }, 500);
  });
}

function startRecaf(currentFolderPath, scriptLocation) {
  return `"${lcJreLocation}" -jar "${LTFolderLocation}\\recaf.jar" "--input=${currentFolderPath.replaceAll('/', '\\\\').replaceAll('\\', '\\\\')}\\\\currentJarFile.jar" --cli "--script=${scriptLocation}"`;
}