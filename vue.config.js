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
          oneClick: true,
          allowToChangeInstallationDirectory: false
        },
        mac: {
          category: "public.app-category.games"
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
