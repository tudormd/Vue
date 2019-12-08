import firebase from "firebase/app";
export default {
  actions: {
    async createRecord(
      { commit, dispatch }: { commit: any; dispatch: any },
      record: {
        categoryId: string;
        ammount: number;
        description: string;
        type: string;
        data: JSON;
      }
    ) {
      try {
        const uId = await dispatch("getUid");
        const r = await firebase
          .database()
          .ref(`/users/${uId}/records`)
          .push(record);
        return r;
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async getRecords({ commit, dispatch }: { commit: any; dispatch: any }) {
      try {
        const uId = await dispatch("getUid");
        const records =
          (await firebase
            .database()
            .ref(`/users/${uId}/records`)
            .once("value")).val() || {};
        return Object.keys(records).map(key => ({ ...records[key], id: key }));
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async getRecordById(
      { commit, dispatch }: { commit: any; dispatch: any },
      id: string
    ) {
      try {
        const uId = await dispatch("getUid");
        const record =
          (await firebase
            .database()
            .ref(`/users/${uId}/records`)
            .child(id)
            .once("value")).val() || {};
        return { ...record, id };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
