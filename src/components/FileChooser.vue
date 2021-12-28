<template>
  <div>
    <v-card id="specs-card" elevation="5" class="full-centered">
      <v-card-title>Client Specifications</v-card-title>

      <v-card-text>
        Welcome to <strong>Rising Sun</strong>, a fork of
        <strong>Solar Tweaks</strong>. We offer a greater set of features to
        utilize.
        <br />
        <br />
        Neither <strong>Rising Sun</strong>—nor
        <strong>Solar Tweaks</strong>—are endorsed by
        <strong>Moonsworth LLC.</strong> or its affiliates, so this software is
        "use at your own risk".
        <br />
        <h2 class="mt-6 header">Version</h2>
        <strong>Rising Sun</strong> offers support for multiple versions, pick a
        selected version from the dropdown below.
        <v-col class="d-flex">
          <v-select
            :items="resolvedVersions"
            label="Minecraft Version"
            outlined
          ></v-select>
        </v-col>
        <br />
        <v-btn color="#FF4F58" class="horizontally-centered" @click="chooseFile"
          >Choose file</v-btn
        >
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >Dismiss</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import electron from "electron";
import { getSetting } from "../settings";
import process from "process";

export default {
  name: "FileChooser",

  data: () => ({
    snackbarText: "",
    snackbar: false,
    resolvedVersions: ["1.7", "1.8", "1.12", "1.16", "1.17", "1.18"],
  }),
  methods: {
    chooseFile() {
      let filePath;
      if (!getSetting("autoSelectFile")) {
        filePath = electron.remote.dialog.showOpenDialogSync({
          title: "Choose a Lunar jar file...",
          defaultPath: `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8`,
          buttonLabel: "Choose",
          properties: ["openFile", "showHiddenFiles", "dontAddToRecent"],
          filters: [{ name: "JAR File", extensions: ["jar"] }],
        });
      } else {
        filePath = [
          `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8\\lunar-prod-optifine.jar`,
        ];
      }

      if (filePath) {
        if (filePath.length > 1) {
          this.snackbarText = "You can only select one file";
          this.snackbar = true;
          return;
        }
        this.$store.commit("setLunarFilePath", filePath[0]);
        this.$store.commit("markFileAsChoosed", true);
      } else {
        this.snackbarText = "Please select a file";
        this.snackbar = true;
      }
    },
  },
};
</script>

<style>
.full-centered {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.horizontally-centered {
  margin-top: 1em;
  left: 50%;
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}

.specs-card {
  border-radius: 10px;
}

.header {
  color: white;
}
</style>
