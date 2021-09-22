module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "lunartweaks.patcher",
        productName: "Lunar Tweaks",
        win: {
          target: "nsis",
          publisherName: "Lunar Tweaks"
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
