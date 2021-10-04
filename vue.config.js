module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "solartweaks.patcher",
        productName: "Solar Tweaks",
        win: {
          target: "nsis",
          publisherName: "Solar Tweaks"
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        extraResources: [
          {
            from: "./src/template/",
            to: "template",
            filter: ["**/*"]
          }
        ]
      }
    }
  }
}
