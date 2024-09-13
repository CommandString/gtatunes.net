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
            <div class="modal__body">
                <slot name="body"/>
            </div>
            <div class="modal__title">
                <h2><slot name="title"/></h2>
                <div class="close black" @click="() => emits('close')">Close</div>
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
    @include iii_cursor();

    &:has(.modal--open) {
        opacity: 1;
        pointer-events: unset;
    }

    .modal {
        position: fixed;
        inset: 50px 0 0 0;
        min-width: 300px;
        min-height: 270px;
        background-color: rgba(#000, 0.5);
        margin: 0 auto;
        z-index: 2;
        border-radius: 20px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 150ms;
        max-width: 1204px;
        width: 100%;
        max-height: calc(100vh - 100px);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: fit-content;
        @include iii_cursor();

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(#fff, 0.1);
            border-radius: 20px;
            border: 1px solid rgba(#fff, 0.1);
            z-index: -1;
        }

        &--open {
            pointer-events: unset;
            opacity: 1;
        }

        .modal__title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 25px 10px;
            box-sizing: border-box;
            background-color: #F1B039;
            color: black;
            margin-bottom: 20px;

            h2 {
                font-size: 34px;
                font-weight: $fw-regular;
                font-family: "Pricedown", sans-serif;
            }

            @include breakpoint(510px) {
                justify-content: center;
                margin-bottom: 0;

                .close {
                    display: none;
                }
            }
        }

        .modal__body {
            flex: 1;
            overflow-y: auto;
            padding: 15px 20px 15px;
            box-sizing: border-box;
            width: 100%;

            :deep(h2) {
                font-family: "Pricedown", sans-serif;
                font-weight: $fw-regular;
                color: #000;
                position: relative;
                padding: 5px 0 10px;
                z-index: 1;

                &::before {
                    content: '';
                    background: #F1B039;
                    position: absolute;
                    inset: 0;
                    z-index: -1;
                    left: -20px;
                    right: -20px;
                }
            }
        }

        .modal__title .close,
        .modal__close .close {
            font-family: "Pricedown", sans-serif;
            font-size: 1.3em;
            text-transform: uppercase;
            color: #ccc;
            transition: color 150ms;

            &:hover {
                color: white;
            }

            &.black {
                color: #000;

                &:hover {
                    color: #444;
                }
            }
        }

        .modal__close {
            padding: 15px 20px;
            display: flex;
            justify-content: center;
            margin-bottom: 20px;

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