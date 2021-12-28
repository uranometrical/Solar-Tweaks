<template>
  <div>
    <v-app-bar dark class="flex-grow-0">
      <div class="d-flex">
        <v-img src="icon.png" contain height="64px" width="64px" class="funny-logo" />
        <v-app-bar-title class="align-self-center">&nbsp;&nbsp;&nbsp;Rising Sun</v-app-bar-title>
      </div>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-2"
            @click="openSettings()"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Open Settings</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-2 red--text"
            @click="openLink('https://discord.gg/GCwERqUBhz')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-discord</v-icon>
          </v-btn>
        </template>
        <span>Rising Sun Discord</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            small
            class="mr-2"
            @click="openLink('https://discord.gg/SolarTweaks')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-discord</v-icon>
          </v-btn>
        </template>
        <span>Solar Tweaks Discord</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small @click="showCredits = true" v-bind="attrs" v-on="on">
            <v-icon>mdi-copyright</v-icon>
          </v-btn>
        </template>
        <span>Show Credits</span>
      </v-tooltip>
      <v-dialog v-model="showCredits" width="500">
        <v-card>
          <v-card-title class="text-h5 primary">
            About
          </v-card-title>
          <v-card-text class="mt-5">
            Rising Sun
            <br />
            A Uranometrical fork of SolarTweaks.
            <br /><br />
            Forked and added to by
            <strong>Tomat</strong><br /><br />
            A big thanks to
            <ul>
              <li>
                <strong>Cy0ze</strong> for developing and designing the original
                SolarTweaks program
              </li>
              <li>
                <strong>Prorok</strong> for saving <strong>Cy0ze</strong> a lot
                of time for the Hypixel Mods patch
              </li>
              <li>
                <strong>Aetopia</strong> for coding and maintaining
                <a
                  @click="
                    openLink(
                      'https://github.com/Aetopia/Lunar-Client-Lite-Launcher'
                    )
                  "
                  >Lunar Client Lite</a
                >
                <v-icon color="blue" size="20" class="ml-1"
                  >mdi-open-in-new</v-icon
                >
                <br /><span class="italic"
                  >(We are not affiliated with Lunar Client Lite or
                  Aetopia!)</span
                >
              </li>
              <li>
                <strong>Specially</strong> for being a super cool person,
                promoting and trusting <strong>Cy0ze</strong>.
                <a @click="openLink('https://www.youtube.com/c/SpeciallyMC')"
                  >His YouTube channel</a
                >
                <v-icon color="blue" size="20" class="ml-1"
                  >mdi-open-in-new</v-icon
                >
              </li>
            </ul>
            <br />
            <span class="version"
              >Rising Sun <strong>v{{ softwareVersion }}</strong
              ><br />SolarTweaks
              <strong>v{{ solarTweaksVersion }}</strong></span
            >
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="openLink('https://github.com/uranometrical/rising-sun')"
            >
              <v-icon left>mdi-github</v-icon>
              <span>GitHub</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="showCredits = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <Settings />
  </div>
</template>

<script>
import Settings from "./Settings.vue";

import electron from "electron";

export default {
  name: "AppBar",

  components: {
    Settings,
  },

  data: () => ({
    showCredits: false,
    softwareVersion: electron.remote.app.getVersion(),
    solarTweaksVersion: "3.0.3",
    iconDir: __dirname + "/src/icon.png",
  }),

  methods: {
    openLink(link) {
      require("electron").shell.openExternal(link);
    },
    openSettings() {
      this.$store.commit("markSettingsOpenedAs", true);
    },
  },

  mounted() {},
};
</script>

<style>
.italic {
  font-style: italic;
}

.v-app-bar-title__content {
  width: 200px !important;
}

#settings-btn {
  border-radius: 100%;
}

.funny-logo {
}
</style>
