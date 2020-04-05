require("dotenv").config();

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "nuxt-ssr-firebase",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "A example repo for using nuxt with firebase hosting and cloud functions",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  plugins: ["@/plugins/mixins"],
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
        },
      },
    ],
  ],
  bootstrapVue: {
    icons: true, // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  buildDir: "nuxt",
  build: {
    extractCSS: true,
    babel: {
      presets: ({ isServer }) => [
        [
          "@nuxt/babel-preset-app",
          {
            targets: isServer ? { node: "8.11.1" } : { browsers: ["defaults"] },
          },
        ],
      ],
    }
  },
};
