// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future
: {
  compatibilityVersion
: 4,
},
app: {
  head : {
    script: [{src:"https://tally.so/widgets/embed.js"}]
  }
},
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
   '@nuxtjs/google-fonts',
   '@nuxt/icon',
   '@nuxtjs/tailwindcss'
  ],
 
   googleFonts: {
  families: {
    Inter: true, 
    Montserrat: true
   
  }
 }
})