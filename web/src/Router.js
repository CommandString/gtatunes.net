import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/Views/Home.vue";
import {APP_NAME, DISCORD_LINK} from "@/Constants.js";

export default (() => {
    let router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home,
                meta: {
                    title: APP_NAME
                }
            },
            {
                path: '/discord',
                name: 'Discord',
                beforeEnter: () => window.location.href = DISCORD_LINK
            },
            {
                path:'/sa',
                name: 'station-sa',
                redirect: '/'
            },
            {
                path:'/iii',
                name: 'station-iii',
                redirect: '/'
            },
            {
                path:'/vc',
                name: 'station-vc',
                redirect: '/'
            }
        ]
    });

    router.beforeEach((to, from, next) => {
        if (to.meta.title) {
            document.title = to.meta.title;
        }

        next();
    });

    return router;
});
