<script setup>
import iii from "@/Assets/images/game-bgs/iii.jpg";
import sa from "@/Assets/images/game-bgs/sa.jpg";
import vc from "@/Assets/images/game-bgs/vc.jpg";
import saHero from "@/Assets/images/game-bgs/sa-hero.jpg";
import iiiLogo from "@/Assets/images/logos/iii.png";
import saLogo from "@/Assets/images/logos/sa.png";
import vcLogo from "@/Assets/images/logos/vc.png";
import gtaTunes from "@/Assets/images/logos/gtatunes.png";
import {DISCORD_LINK} from "@/Constants.js";

const games = [
    {
        name: "GTA San Andreas",
        key: 'sa',
        finished: true,
        image: sa,
        logo: saLogo
    },
    {
        name: "GTA Vice City",
        key: 'vc',
        finished: false,
        image: vc,
        logo: vcLogo
    },
    {
        name: "GTA III",
        key: 'iii',
        finished: false,
        image: iii,
        logo: iiiLogo
    }
];

const year = new Date().getFullYear();
</script>

<template>
    <section class="hero">
        <img class="hero__bg" :src="saHero">
        <div class="container">
            <img :src="gtaTunes" alt="Grand Theft Auto Tunes">
            <div class="hero__content">
                <p>
                    Listen to all of the radio stations from the GTA 3D universe in one place!
                </p>
                <a :href="DISCORD_LINK" target="_blank" class="button">Join Our Discord</a>
            </div>
        </div>
    </section>
    <div class="games-container">
        <div class="games">
            <RouterLink class="game" v-for="game of games" :to="{name: `station-${game.key}`}" :class="{'game--unfinished': !game.finished}">
                <div class="game__logo">
                    <img :src="game.logo" :alt="game.name">
                </div>
                <img class="game__image" :src="game.image" :alt="game.name">
            </RouterLink>
        </div>
        <div class="games-mobile">
            <RouterLink class="game" v-for="game of games" :to="{name: `station-${game.key}`}" :class="{'game--unfinished': !game.finished}">
                <div class="game__logo">
                    <img :src="game.logo" :alt="game.name">
                </div>
                <img class="game__image" :src="game.image" :alt="game.name">
            </RouterLink>
        </div>
    </div>
    <footer class="footer">
        <div class="container">
            <p>&copy; {{year}} GTATunes</p>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.hero {
    font-family: "Lexend Deca", sans-serif;
    padding: 0;
    position: relative;

    &::after, &__bg {
        position: absolute;
        inset: 0;
        height: 100%;
        width: 100%;
    }

    &::after {
        content: '';
        width: 100%;
        background: linear-gradient(to bottom, rgba(#000, 0.8), rgba(#000, 0.5), rgba(#000, 0.6));
    }

    &__bg {
        object-fit: cover;
        object-position: center;
    }

    .container {
        display: flex;
        gap: 10px;
        position: relative;
        z-index: 1;
        align-items: center;
        min-height: 500px;
        max-width: 850px;

        img {
            height: 232px;
            width: 232px;
        }

        .hero__content {
            p {
                font-size: 32px;
                line-height: 45px;
                font-weight: $fw-light;
            }

            a.button {
                display: block;
                background: $red;
                color: white;
                text-decoration: none;
                width: fit-content;
                padding: 10px 45px;
                transition: background-color 150ms;
                border-radius: 1px;

                &:hover {
                    background: darken($red, 5%);
                }
            }
        }

        @include breakpoint(880px) {
            img {
                height: 190px;
                width: 190px;
            }

            .hero__content p {
                font-size: 24px;
                line-height: 35px;
            }
        }

        @include breakpoint(540px) {
            .hero__content p {
                font-size: 20px;
                line-height: 30px;
            }
        }
    }

    @include breakpoint(740px) {
        padding: 50px 0;

        .container {
            flex-direction: column;
            justify-content: center;
            align-items: unset;
        }
    }
}

.games-container {
    $width: calc(100vw / 3);
    $height: 500px;
    $skew: 10deg;
    $offset: calc(#{$height} * tan(#{$skew}) * .5);

    overflow: hidden;

    .games {
        display: flex;
        overflow: hidden;
        width: calc(100vw + (#{$offset} * 3));
        height: 100%;
        transform: translateX(calc($offset * -2));

        .game {
            position: relative;
            width: $width;
            height: $height;
            transform: skewX($skew * -1);
            margin-left: $offset;
            overflow: hidden;
            user-select: none;
            transition: width 200ms;
            cursor: pointer;

            &__logo {
                position: absolute;
                inset: 50% 0 0 50%;
                transform: translate(-50%, -50%) skewX($skew);
                z-index: 1;
                width: 200px;
                height: fit-content;
                pointer-events: none;

                img {
                    width: 100%;
                    transition: transform 200ms;
                }
            }

            &__image {
                width: calc(100% + #{$offset} * 2);
                height: 100%;
                object-fit: cover;
                transform: skewX($skew);
                margin-left: calc(#{$offset} * -1);
                pointer-events: none;
            }

            &:hover {
                width: $width * 1.3;
            }

            &--unfinished {
                pointer-events: none;

                .game__logo::after {
                    content: 'Coming Soon';
                    position: absolute;
                    text-transform: uppercase;
                    font-weight: $fw-bold;
                    top: 100%;
                    left: 0;
                    height: fit-content;
                    z-index: 1;
                    font-size: 26px;
                    text-align: center;
                    width: 100%;
                    color: #ddd;
                }

                .game__logo img, .game__image {
                    filter: grayscale(100%);
                    opacity: 0.5;
                }
            }
        }
    }

    .games-mobile {
        display: none;
        grid-template-columns: repeat(3, 1fr);
        height: $height;

        @include breakpoint(920px) {
            grid-template-columns: repeat(2, 1fr);
            height: calc(($height * 2) - 150px);

            .game:last-child {
                height: calc($height - 150px);
                grid-column: span 2;
            }
        }

        @include breakpoint(700px) {
            grid-template-columns: 1fr;
            height: unset;

            .game:last-child {
                height: unset;
                grid-column: unset;
            }
        }

        .game {
            position: relative;
            user-select: none;
            cursor: pointer;
            overflow: hidden;
            height: $height;

            &__logo {
                position: absolute;
                z-index: 1;
                width: 200px;
                height: fit-content;
                pointer-events: none;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                img {
                    width: 100%;
                    transition: transform 200ms;
                }
            }

            &__image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                pointer-events: none;
                transition: transform 200ms;
            }

            &:hover .game__image,
            &:hover .game__logo img {
                transform: scale(1.1);
            }

            &--unfinished {
                pointer-events: none;

                .game__logo::after {
                    content: 'Coming Soon';
                    position: absolute;
                    text-transform: uppercase;
                    font-weight: $fw-bold;
                    top: 100%;
                    left: 0;
                    height: fit-content;
                    z-index: 1;
                    font-size: 26px;
                    text-align: center;
                    width: 100%;
                    color: #ddd;
                }

                .game__logo img, .game__image {
                    filter: grayscale(100%);
                    opacity: 0.5;
                }
            }

            &:not(.game--unfinished)::after {
                position: absolute;
                content: 'Click To Listen';
                font-size: 20px;
                z-index: 1;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                text-transform: uppercase;
                font-weight: $fw-bold;
            }
        }
    }

    @include breakpoint(1000px) {
        .games {
            display: none;
        }

        .games-mobile {
            display: grid;
        }
    }
}

footer.footer {
    padding: 20px 0;
    font-size: 14px;
    font-weight: $fw-regular;
    background: $red;

    p {
        margin: 0;
        font-size: 16px;
    }
}
</style>
