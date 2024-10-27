// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future
: {
  compatibilityVersion
: 4,
},

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/google-fonts', '@nuxt/icon'],
 
   googleFonts: {
  families: {
    Inter: true, 
    Montserrat: true
   
  }
 }
})