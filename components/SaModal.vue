<script setup lang="ts">
import type {Ref} from "vue";

defineProps({
    open: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['close']);
const container: Ref<HTMLElement|null> = ref(null);

onMounted(() => {
    if (container.value) {
        container.value.addEventListener('click', (e) => {
            if (e.target === container.value) {
                emits('close');
            }
        });
    }
});
</script>

<template>
    <div ref="container" class="modal-container">
        <div class="modal" :class="{'modal--open': open}">
            <div class="modal__title">
                <h2><slot name="title"/></h2>
                <div class="close" @click="() => emits('close')">Close</div>
            </div>
            <div class="modal__body">
                <slot name="body"/>
            </div>
            <div class="modal__close">
                <span class="close" @click="() => emits('close')">Close</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "/assets/scss/includes";

.modal-container {
    position: absolute;
    inset: 0;
    background: rgba(#000, 0.3);
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(5px);
    transition: opacity 150ms;
    cursor: url("@/assets/images/cursors/sa.png"), auto;

    &:has(.modal--open) {
        opacity: 1;
        pointer-events: unset;
    }

    .modal {
        position: fixed;
        inset: 50px 0 0 0;
        min-width: 300px;
        min-height: 270px;
        background-color: #121212;
        margin: 0 auto;
        z-index: 2;
        border-radius: 15px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 150ms;
        max-width: 1204px;
        width: 100%;
        max-height: calc(100vh - 100px);
        overflow: hidden;
        border: 1px solid #aaa;
        display: flex;
        flex-direction: column;
        height: fit-content;
        cursor: url("@/assets/images/cursors/sa.png"), auto;

        &--open {
            pointer-events: unset;
            opacity: 1;
        }

        .modal__title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-basis: 50px;
            padding: 10px 20px;
            box-sizing: border-box;

            h2 {
                font-size: 34px;
            }

            .close {
                @include breakpoint(510px) {
                    display: none;
                }
            }
        }

        .modal__body {
            flex: 1;
            overflow-y: auto;
            padding: 0 20px 15px;
            box-sizing: border-box;
            width: 100%;
        }

        .modal__title .close,
        .modal__close .close {
            font-family: "Bank Gothic", sans-serif;
            font-size: 20px;
            text-transform: uppercase;
            cursor: url("@/assets/images/cursors/sa-pointer.png"), pointer;
            color: #ccc;
            transition: color 150ms;

            &:hover {
                color: white;
            }
        }

        .modal__close {
            padding: 15px 20px;
            display: flex;
            justify-content: center;

            @media (min-width: 510px) {
                display: none;
            }
        }

        @include breakpoint(1274px) {
            max-width: calc(100vw - 100px);
            height: 100%;
        }
    }
}
</style>