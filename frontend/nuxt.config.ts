// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/tailwindcss",
        "shadcn-nuxt",
        "@nuxt/fonts",
        "@nuxt/icon",
    ],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "UI",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
    fonts: {
        families: [{ name: "Inter", provider: "google" }],
    },
});
