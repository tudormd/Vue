import firebase from "firebase/app";

export default {
  actions: {
    async login(
      { dispatch, commit }: { [key: string]: any },
      { email, password }: { email: string; password: string }
    ) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async logout({ commit }: { commit: any }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async register(
      { dispatch, commit }: { [key: string]: any },
      {
        email,
        password,
        name
      }: { email: string; password: string; name: string }
    ) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uId = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uId}/info`)
          .set({
            bill: 1000,
            name
          });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
