<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

let route = useRoute();
</script>

<template>
    <section class="E500" v-if="error?.statusCode === 500">
        <div class="container">
            <h2>Something went wrong!</h2>
            <p>Please take a screenshot of this page and send it to us!</p>
            <div v-html="error?.stack" class="stack-trace"></div>
            <router-link to="/" class="bank-gothic">Go Home</router-link>
        </div>
    </section>
    <section class="E404" v-else>
        <img src="@/assets/images/wrong-side-of-the-tracks.webp" alt="">
        <span>All we had to do was follow the damn URL CJ!</span>
        <div class="container">
            <p>{{route.path}} does not exist!</p>
            <router-link to="/" class="bank-gothic">Go Home</router-link>
        </div>
    </section>
</template>

<style scoped lang="scss">
a {
    display: block;
    width: fit-content;
    font-size: 1.2em;
    color: #fff;
}

.E404 {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100vh;

    .container {
        padding-top: 530px;

        a {
            margin: 0 auto;
        }

        p {
            margin: 0 auto 15px;
            width: fit-content;
            font-size: 1.4em;
        }
    }

    img {
        display: block;
        width: 1200px;
        height: 500px;
        object-fit: cover;
        border-radius: 5px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        user-select: none;
        pointer-events: none;
    }

    span {
        position: absolute;
        top: 440px;
        left: 50%;
        font-size: 1.3em;
        transform: translateX(-50%);
        text-shadow: 2px 2px 0 #000;
        width: 100vw;
        text-align: center;
        user-select: none;
    }
}
</style>