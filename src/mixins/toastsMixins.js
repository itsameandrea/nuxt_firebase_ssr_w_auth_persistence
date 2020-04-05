export default {
  methods: {
    toastSuccess(message) {
      this.$bvToast.toast(message, {
        title: "Success 🚀",
        variant: "success",
        solid: true,
      });
    },
    toastError(message) {
      this.$bvToast.toast(message, {
        title: "Error 💣",
        variant: "danger",
        solid: true,
      });
    },
  },
};
