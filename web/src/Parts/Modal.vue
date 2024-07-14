<script setup>
defineProps({
    open: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['close'])

</script>

<template>
    <div class="modal" :class="{'modal--open': open}">
        <div class="modal__title">
            <h2><slot name="title"/></h2>
            <div class="modal__close" @click="() => emits('close')">Close</div>
        </div>
        <div class="modal__body">
            <slot name="body"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
    height: fit-content;
    max-height: calc(100vh - 100px);
    overflow: hidden;
    border: 1px solid #aaa;
    display: flex;
    flex-direction: column;

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

        .modal__close {
            font-family: "Bank Gothic", sans-serif;
            font-size: 20px;
            text-transform: uppercase;
            cursor: pointer;
            color: #ccc;
            transition: color 150ms;

            &:hover {
                color: white;
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

    &[data-modal="change-bg"] {
        .modal__body {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;

            @include breakpoint(1015px) {
                grid-template-columns: repeat(2, 1fr);
            }

            .bg-option {
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                    border-radius: 5px;
                    transition: filter 150ms;
                    filter: brightness(0.7);
                }

                &:hover img {
                    filter: brightness(1.3);
                }

                &:active img {
                    filter: brightness(1.1);
                }
            }
        }
    }

    &[data-modal="select-song"] {
        .modal__body {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .song {
                font-size: 16px;
                cursor: pointer;
                color: #aaa;
                font-family: "Outfit", sans-serif;

                .song__title,
                .song__artists {
                    display: inline-block;
                    font-size: 18px;
                    color: white;
                    transition: color 150ms;
                }

                &:hover {
                    .song__title,
                    .song__artists {
                        color: #B7D2F3;
                    }
                }

                @include breakpoint(700px) {
                    font-size: 14px;

                    .song__title,
                    .song__artists {
                        font-size: 16px;
                    }
                }
            }
        }
    }

    @include breakpoint(1274px) {
        max-width: 1100px;
    }

    @include breakpoint(1174px) {
        max-width: 1000px;
    }

    @include breakpoint(1074px) {
        max-width: 900px;
    }

    @include breakpoint(974px) {
        max-width: 800px;
    }

    @include breakpoint(874px) {
        max-width: 700px;
    }

    @include breakpoint(774px) {
        max-width: 600px;
    }

    @include breakpoint(674px) {
        max-width: 500px;
    }

    @include breakpoint(574px) {
        max-width: 400px;
    }

    @include breakpoint(474px) {
        max-width: 300px;
    }
}
</style>