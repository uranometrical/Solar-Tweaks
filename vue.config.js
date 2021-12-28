module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: "rising-sun.patcher",
        productName: "Rising Sun",
        win: {
          target: "nsis",
          publisherName: "Uranometrical Team"
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
