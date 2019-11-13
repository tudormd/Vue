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
        throw error;
      }
    }
  }
};
