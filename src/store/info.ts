import firebase from "firebase/app";
export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state: any, info: any) {
      state.info = info;
    },
    clearInfo(state: any) {
      state.info = {};
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }: { dispatch: any; commit: any }) {
      try {
        const uId = await dispatch("getUid");
        const info = (await firebase
          .database()
          .ref(`/user/${uId}/info`)
          .once("value")).val();
        commit("setInfo", info);
      } catch (error) {
        throw Error();
      }
    }
  },

  getters: {
    info: (s: any) => s.info
  }
};
