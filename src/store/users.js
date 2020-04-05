import Cookies from "js-cookie"

export const state = () => ({
  currentUser: null,
})

export const getters = {
  currentUser: (state) => state.currentUser,
}

export const mutations = {
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  logout(state) {
    state.currentUser = null
  },
}

export const actions = {
  async createUser({ dispatch }, { email, password, name }) {
    const { user } = await this.$fireAuth.createUserWithEmailAndPassword(
      email,
      password
    )

    await this.$fireStore.collection("users").doc(user.uid).set({
      email,
      name,
      uid: user.uid,
    })

    const token = await this.$fireAuth.currentUser.getIdToken(true)
    Cookies.set("access_token", token)

    dispatch("getCurrentUser", { user })

    return user.uid
  },
  async login({ dispatch }, { email, password }) {
    try {
      const { user } = await this.$fireAuth.signInWithEmailAndPassword(
        email,
        password
      )

      const token = await this.$fireAuth.currentUser.getIdToken(true)
      Cookies.set("access_token", token)

      dispatch("getCurrentUser", { user })

      return user.uid
    } catch (error) {
      return error
    }
  },
  async logout({ commit }) {
    try {
      await this.$fireAuth.signOut()
      Cookies.remove("access_token")
      commit("logout")
      return
    } catch (error) {
      console.log(error)
    }
  },
  async getCurrentUser({ commit }, { user }) {
    let currentUser = await this.$fireStore
      .collection("users")
      .doc(user.uid)
      .get()

    currentUser = currentUser.data()

    commit("setCurrentUser", currentUser)
  }
}
