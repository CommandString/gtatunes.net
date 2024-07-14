import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/Views/Home.vue";
import {APP_NAME, DISCORD_LINK} from "@/Constants.js";
import Sa from "@/Views/Sa.vue";
import SaIcon from "@/Assets/images/logos/sa.png";

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
                component: Sa,
                meta: {
                    title: 'San Andreas Radio',
                    icon: SaIcon
                }
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

        if (to.meta.icon) {
            document.querySelector('link[rel="icon"]').href = to.meta.icon;
        }

        next();
    });

    return router;
});
