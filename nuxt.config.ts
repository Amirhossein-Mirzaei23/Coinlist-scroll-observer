// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-icon', '@vueuse/nuxt'],
  
//  io: {
//    // module options
//    sockets: [{
//      name: 'main',
//      url: ''
//    }]
//  },
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css' ,'animate.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
 

})
