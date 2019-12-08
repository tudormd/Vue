import firebase from "firebase/app";

export default {
  actions: {
    async createCategory(
      { commit, dispatch }: { commit: any; dispatch: any },
      { title, limit }: { title: string; limit: number }
    ) {
      try {
        const uId = await dispatch("getUid");
        const category = await firebase
          .database()
          .ref(`/users/${uId}/categories`)
          .push({ title, limit });
        return { title, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async getCategories({ commit, dispatch }: { commit: any; dispatch: any }) {
      const uId = await dispatch("getUid");
      const categories =
        (await firebase
          .database()
          .ref(`/users/${uId}/categories`)
          .once("value")).val() || {};
      return Object.keys(categories).map(key => ({
        ...categories[key],
        id: key
      }));
    },
    async getCategoryById(
      { commit, dispatch }: { commit: any; dispatch: any },
      id: string
    ) {
      const uId = await dispatch("getUid");
      const category =
        (await firebase
          .database()
          .ref(`/users/${uId}/categories`)
          .child(id)
          .once("value")).val() || {};
      return { ...category, id };
    },

    async updateCategory(
      { commit, dispatch }: { commit: any; dispatch: any },
      { title, limit, id }: { title: string; limit: number; id: string }
    ) {
      try {
        const uId = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uId}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    }
  }
};
