/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 贺朋展
 * @Date: 2020-12-25 13:44:27
 * @LastEditors: 贺朋展
 * @LastEditTime: 2020-12-27 13:47:06
 */

export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'fe-financial-system',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: '/echarts.min.js', async: true, defer: true }
        ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'static/css/common.css',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/element-ui'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
    ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
    },
    axios: {
        proxy: true
    },
    proxy: {
        "/api": "http://www.clib.info/"
        // "/api": "http://192.168.50.67:8080/"
      
    }
}