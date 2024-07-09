<script setup>
import {RouterView} from 'vue-router';
import {onMounted} from "vue";
import logo from "@/Assets/images/logos/gtatunes.png";

onMounted(() => {
    let icon = document.createElement('link');
    icon.rel = 'icon';
    icon.href = logo;
    document.head.append(icon);
})
</script>

<template>
    <RouterView/>
</template>

<style lang="scss">
@import "@/Assets/scss/main";
</style>

