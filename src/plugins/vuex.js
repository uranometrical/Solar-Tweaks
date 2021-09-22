import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileChoosed: false,
    lunarFilePath: "",
    builded: false,
    outputPath: "",
    currentFolderPath: "",
  },
  mutations: {
    markFileAsChoosed(state, bool) {
      state.fileChoosed = bool;
    },
    markBuildedAs(state, bool) {
      state.builded = bool;
    },
    setLunarFilePath(state, path) {
      state.lunarFilePath = path;
    },
    setCurrentFolderPath(state, path) {
      state.currentFolderPath = path;
    },
    setOutputFilePath(state, path) {
      state.outputPath = path;
    }
  }
});