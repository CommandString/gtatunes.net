export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['@/assets/scss/main.scss'],
    modules: ["@nuxtjs/google-fonts", 'nuxt-svgo'],
    googleFonts: {
        families: {
            Outfit: true,
            'Lexend Deca': true,
        }
    },
    devServer: {
        port: 8000
    },
    app: {
        head: {
            link: [{ rel: 'icon', href: '/logo.png' }]
        }
    },
})