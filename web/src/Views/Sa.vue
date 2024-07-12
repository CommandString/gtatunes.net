<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
import Modal from "@/Parts/Modal.vue";
import NextIcon from "@/Parts/Icons/NextIcon.vue";
import PlayIcon from "@/Parts/Icons/PlayIcon.vue";
import PauseIcon from "@/Parts/Icons/PauseIcon.vue";

/**
 * @type {Object} audio
 * @property {HTMLAudioElement} value
 */
const audio = ref(null);

/**
 * @type {Object} container
 * @property {HTMLElement} value
 */
const container = ref(null);

const backgrounds = [
    ["Vinewood", "/bgs/sa/vinewood.png", "vinewood"],
    ["Las Venturas Desert", "/bgs/sa/las-venturas-desert.png", "las-venturas-desert"],
    ["Los Santos", "/bgs/sa/los-santos.png", "los-santos"],
    ["Las Venturas", "/bgs/sa/las-venturas.png", "las-venturas"],
    ["San Fierro", "/bgs/sa/san-fierro.png", "san-fierro"],
    ["San Fierro Bridge", "/bgs/sa/san-fierro-bridge.png", "san-fierro-bridge"],
];

/**
 * @typedef {Object} Station
 * @property {string} name
 * @property {string} key
 * @property {string} icon
 * @property {Song[]} songs
 */

/**
 * @typedef {Object} Song
 * @property {string} title
 * @property {string[]} artists
 * @property {number} year
 * @property {string} audio
 */

/**
 * @type {Object}
 * @property {number} volume
 * @property {Station[]} stations
 * @property {Station|null} currentStation
 * @property {Song|null} currentSong
 * @property {boolean} selectingBackground
 * @property {boolean} selectingSong
 * @property {string} background
 * @property {boolean} paused
 */
let state = reactive({
    volume: 0,
    stations: null,
    currentStation: null,
    currentSong: null,
    selectingBackground: false,
    selectingSong: false,
    background: backgrounds[0][2],
    paused: true
})

watch(() => state.volume, (value) => {
    audio.value.volume = value / 16;
});

onMounted(async () => {
    state.stations = await fetch('/api/stations/sa').then(res => res.json());

    //########################//
    //   SETUP AUDIO PLAYER   //
    //########################//
    audio.value.addEventListener('timeupdate', () => {
        let currentTime = container.value.querySelector('.time .time__current');
        let totalTime = container.value.querySelector('.time .time__total');

        if (state.currentSong !== null) {
            let progress = audio.value.currentTime / audio.value.duration;
            container.value.querySelector('.controls__scrub .progress__bar').style.width = `${progress * 100}%`;

            let formatTime = (time) => {
                let minutes = Math.floor(time / 60);
                let seconds = Math.floor(time % 60);

                let formated = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                return (formated === 'NaN:NaN') ? '0:00' : formated;
            }

            let formattedCurrentTime = formatTime(audio.value.currentTime);
            let formattedTotalTime = formatTime(audio.value.duration);

            if (formattedCurrentTime !== currentTime.innerText) {
                currentTime.innerText = formattedCurrentTime;
            }

            if (formattedTotalTime !== totalTime.innerText) {
                totalTime.innerText = formattedTotalTime;
            }
        }
    });

    audio.value.addEventListener('ended', async () => {
        let currentSongIndex = state.currentStation.songs.findIndex(song => song === state.currentSong);
        state.currentSong = state.currentStation.songs[currentSongIndex + 1] ?? state.currentStation.songs[0];

        audio.value.src = state.currentSong.audio;
        await audio.value.play();
    });

    audio.value.addEventListener('pause', () => state.paused = true);
    audio.value.addEventListener('play', () => state.paused = false);

    state.volume = 2;

    //####################//
    //   SCRUB CONTROLS   //
    //####################//
    let moving = null;

    container.value.querySelector('.progress').addEventListener('mousemove', (event) => {
        if (moving || event.buttons !== 1) {
            return;
        }

        moving = setTimeout(() => {
            let scrubControls = container.value.querySelector('.controls__scrub')
            let progress = event.offsetX / scrubControls.querySelector('.progress').offsetWidth;

            audio.value.currentTime = audio.value.duration * progress;
            moving = null;
        }, 100);
    });

    container.value.querySelector('.progress').addEventListener('mousedown', (event) => {
        let scrubControls = container.value.querySelector('.controls__scrub')
        let progress = event.offsetX / scrubControls.querySelector('.progress').offsetWidth;

        audio.value.currentTime = audio.value.duration * progress;
    });
});

/**
 * @param {Station|null} station
 */
async function changeStation(station) {
    try {
        state.currentStation = station;
        state.currentSong = station === null ? null : station.songs[Math.floor(Math.random() * station.songs.length)];

        if (state.currentSong === null) {
            audio.value.src = '';
            return;
        }

        audio.value.src = state.currentSong.audio;
        await audio.value.play();
    } catch (e) {
    }
}

function wheelToChangeStation(e) {
    e.preventDefault();

    let direction = e.deltaY < 0 ? 1 : -1;
    let stations = Object.values(state.stations);

    if (!state.currentStation) {
        changeStation(stations[direction === 1 ? 0 : stations.length - 1]);
        return;
    }

    let currentIndex = stations.findIndex(station => station === state.currentStation);
    let newIndex = Math.max(-1, Math.min(stations.length, currentIndex + direction));

    changeStation(stations[newIndex] ?? null);
}
</script>

<template>
    <section ref="container" class="radio" :class="state.background">
        <audio ref="audio"></audio>
        <div class="container">
            <h1>San Andreas Radio</h1>
            <div class="settings">
                <div class="setting setting--volume">
                    <span @wheel="(e) => {
                        if (e.deltaY > 0) {
                            state.volume = Math.max(0, state.volume - 1);
                        } else {
                            state.volume = Math.min(16, state.volume + 1);
                        }
                    }" @click="state.volume = (state.volume === 0) ? 2 : 0">Audio</span>
                    <div class="volume">
                        <div
                            v-for="i in [...Array(16).keys()]" class="volume__bar" :class="{'active': i <= state.volume}"
                            @click="state.volume = i"
                        ></div>
                    </div>
                </div>
                <div class="setting disabled"><span>Custom MixTape</span></div>
                <div class="setting" @click="() => state.selectingBackground = true"><span>Change Background</span></div>
                <div
                    class="setting"
                    @click="() => {
                        if (state.currentStation === null) {
                            return;
                        }

                        state.changingSong = true;
                    }"
                    :class="{'disabled': state.currentStation === null}"
                ><span>Select Song</span></div>
            </div>
        </div>
        <div class="radio__bottom-wrapper">
            <div class="setting">
                <span
                    @wheel="wheelToChangeStation"
                    @click="() => changeStation(null)"
                >Radio Station</span>
                <span>{{state.currentStation?.name ?? 'None'}}</span>
            </div>
            <div class="radio-stations" @wheel="wheelToChangeStation">
                <div
                    v-for="station in state.stations"
                    class="radio-station"
                    :class="{'active': state.currentStation?.name === station.name}"
                    @click="() => changeStation((state.currentStation?.name === station.name) ? null : station)"
                >
                    <img :src="station.icon" :alt="station.name">
                    <img :src="station.icon" :alt="station.name">
                </div>
            </div>
            <div class="controls" :class="{'controls--hidden': state.currentSong === null || state.currentStation === null}">
                <div v-if="state.currentStation !== null && state.currentSong !== null" class="controls__currently-playing">
                    <div class="station">
                        <img :src="state.currentStation.icon" alt="">
                    </div>
                    <div class="song">
                        <div class="song__title">{{state.currentSong.title}}</div>
                        <div class="song__artists">{{state.currentSong.artists.join(', ')}}</div>
                    </div>
                </div>
                <div class="controls__state">
                    <div class="controls__scrub">
                        <div class="progress">
                            <div class="progress__bar"></div>
                        </div>
                        <div class="time">
                            <span class="time__current">0:00</span>
                            <span class="time__total">0:00</span>
                        </div>
                    </div>
                    <div v-if="audio" class="controls__media">
                        <NextIcon class="previous-song" @click="() => {
                            if (audio.currentTime < 5) {
                                let currentSongIndex = state.currentStation.songs.findIndex(song => song === state.currentSong);
                                state.currentSong = state.currentStation.songs[currentSongIndex - 1] ?? state.currentStation.songs[state.currentStation.songs.length - 1];

                                audio.src = state.currentSong.audio;
                                audio.play();
                                return;
                            }

                            audio.currentTime = 0;
                        }"/>
                        <PlayIcon
                            class="play-icon"
                            @click="() => audio.play()"
                            :class="{'hidden': !state.paused}"
                        />
                        <PauseIcon
                            class="pause-icon"
                            @click="() => audio.pause()"
                            :class="{'hidden': state.paused}"
                        />
                        <NextIcon @click="() => {
                            let currentSongIndex = state.currentStation.songs.findIndex(song => song === state.currentSong);
                            state.currentSong = state.currentStation.songs[currentSongIndex + 1] ?? state.currentStation.songs[0];

                            audio.src = state.currentSong.audio;
                            audio.play();
                        }"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Modal class="change-background" :open="state.selectingBackground" @close="() => state.selectingBackground = false">
        <template v-slot:title>Background</template>
        <template v-slot:body>
            <div
                class="bg-option"
                :class="{'bg-option--disabled': state.background === bgClass}"
                v-for="[name, src, bgClass] in backgrounds"
                @click="() => {
                    state.selectingBackground = false;
                    state.background = bgClass;
                }"
            >
                <img :src="src" :alt="name">
            </div>
        </template>
    </Modal>
    <Modal class="select-song" :open="state.changingSong" @close="() => state.changingSong = false">
        <template v-slot:title>Change Song</template>
        <template v-slot:body>
            <div
                class="song"
                :class="{'song--disabled': song.title === state.currentSong?.title}"
                v-for="song in state.currentStation?.songs ?? []"
                @click="() => {
                    if (song.title === state.currentSong?.title) {
                        return;
                    }

                    state.changingSong = false;

                    audio.src = song.audio;
                    audio.play();
                    state.currentSong = song;
                }"
            >
                <div class="song__title" v-text="song.title"></div> - <div class="song__artists" v-text="song.artists.join(', ')"></div>
            </div>
        </template>
    </Modal>
</template>

<style scoped lang="scss">
:global(body:has(.loading-image--active)) {
    overflow: hidden;
}

.loading-image {
    position: absolute;
    cursor: pointer;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: #000;
    object-fit: contain;
    display: block;
    pointer-events: none;
    opacity: 0;
    transition: opacity 500ms ease-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;

        @include breakpoint(1204px) {
            object-fit: cover;
        }

        @include breakpoint(818px) {
            height: 90%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        @include breakpoint(750px) {
            height: 75%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        @include breakpoint(640px) {
            height: 60%;
        }

        @include breakpoint(500px) {
            height: 45%;
        }
    }

    span {
        position: absolute;
        z-index: 1;
        bottom: 20px;
        font-size: 22px;
        width: 100%;
        text-align: center;
    }

    &--active {
        opacity: 1;
        pointer-events: unset;
    }
}

section.radio {
    $gradient-transparency: 0.5;
    $gradient-overlay: linear-gradient(rgba(0, 0, 0, $gradient-transparency), rgba(0, 0, 0, $gradient-transparency));

    min-height: 100vh;
    width: 100%;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: black;
    display: flex;
    gap: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @include breakpoint(1167px) {
        background-size: contain;
    }

    &.las-venturas-desert {
        background-image: $gradient-overlay, url("/bgs/sa/las-venturas-desert.png");
    }

    &.los-santos {
        background-image: $gradient-overlay, url("/bgs/sa/los-santos.png");
    }

    &.las-venturas {
        background-image: $gradient-overlay, url("/bgs/sa/las-venturas.png");
    }

    &.san-fierro {
        background-image: $gradient-overlay, url("/bgs/sa/san-fierro.png");
    }

    &.san-fierro-bridge {
        background-image: $gradient-overlay, url("/bgs/sa/san-fierro-bridge.png");
    }

    &.vinewood {
        background-image: $gradient-overlay, url("/bgs/sa/vinewood.png");
    }

    .container {
        display: flex;
        flex-direction: column;
        width: 100%;

        > h1 {
            margin-bottom: 25px;
            font-size: 50px;
            font-family: 'Diploma', cursive;
            font-weight: $fw-regular;
            color: #B7D2F3;

            @include breakpoint(550px) {
                font-size: 40px;
            }
        }
    }

    .settings {
        list-style-type: none;
        padding: 0 20px;
        margin: 0 0 20px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;

        @include breakpoint(550px) {
            padding: 0;
        }

        .setting {
            display: flex;
            align-items: center;
            width: fit-content;

            span {
                font-family: "Bank Gothic", sans-serif;
                color: #B7D2F3;
                opacity: 50%;
                font-weight: $fw-light;
                font-size: 34px;
                cursor: pointer;
                transition: opacity 150ms;
                text-transform: uppercase;
                user-select: none;
            }

            span:hover {
                opacity: 100%;
            }

            &.disabled span {
                opacity: 30%;
                pointer-events: none;
            }

            &--volume {
                width: 100%;
                display: flex;
                justify-content: space-between;

                &:has(.volume:hover) span {
                    opacity: 100%;
                }

                .volume {
                    $base: 30%;
                    $bars: 15;

                    display: flex;
                    align-items: flex-end;
                    gap: 2px;
                    height: 40px;

                    .volume__bar {
                        width: 11px;
                        background-color: #4A5A6B;
                        transition: background-color 50ms;
                        border-radius: 10px;
                        border: 2px darken(#4A5A6B, 10%) solid;
                        position: relative;

                        &:not(:last-child)::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 100%;
                            height: 100%;
                            width: 4px;
                        }

                        &.active {
                            background-color: #B7D2F3;
                        }
                    }

                    .volume__bar:nth-child(1) {
                        height: 100%;
                        opacity: 0;
                    }

                    .volume__bar:nth-child(2) {
                        height: $base;
                    }

                    @for $i from 1 through $bars {
                        .volume__bar:nth-child(#{$i + 1}) {
                            height: calc($base + #{$i * calc((100% - $base) / $bars)});
                        }
                    }

                    &:has(.volume__bar:hover) {
                        .volume__bar {
                            background-color: #B7D2F3;
                        }

                        .volume__bar:hover ~ .volume__bar {
                            background-color: #4A5A6B;
                        }
                    }

                    @include breakpoint(800px) {
                        gap: 3px;

                        .volume__bar {
                            width: 11px;
                        }
                    }
                }
            }

            @include breakpoint(640px) {
                &--volume {
                    display: none;
                }

                span {
                    font-size: 28px;
                }
            }
        }
    }

    .radio-stations {
        display: flex;
        gap: 20px;
        row-gap: 30px;
        width: fit-content;
        margin: 0 auto;
        user-select: none;

        @include breakpoint(1400px) {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }

        @include breakpoint(920px) {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }

        .radio-station {
            cursor: pointer;
            position: relative;
            height: 100px;

            img {
                width: 100px;
                height: 100px;
                object-fit: contain;
                display: block;
                opacity: 0.4;
                transition: opacity 150ms, transform 150ms;
                inset: 0;

                @include breakpoint(600px) {
                    max-width: 150px;
                    margin: 0 auto;
                }
            }

            img:first-child {
                filter: blur(5px);
                opacity: 0;
                position: absolute;
            }

            p {
                display: none;
            }

            &:hover {
                img {
                    opacity: 0.6;
                    transform: scale(1.02);
                }

                img:first-child {
                    opacity: 0.3;
                }
            }

            &.active {
                img {
                    opacity: 1;
                    transform: scale(1.05);
                }

                img:first-child {
                    opacity: 0.8;
                }
            }
        }
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 0 50px 10px;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        height: 200px;

        @include breakpoint(1400px) {
            margin-bottom: 20px;
        }

        @include breakpoint(1090px) {
            padding: 0;
        }

        &--hidden {
            pointer-events: none;
            opacity: 0;
        }

        &__state {
            display: flex;
            flex-direction: column;
            user-select: none;

            .controls__media {
                display: flex;
                align-self: center;
                gap: 20px;

                :deep(svg) {
                    $size: 25px;

                    width: $size;
                    height: $size;
                    fill: white;
                    cursor: pointer;

                    &.previous-song {
                        transform: rotate(180deg);
                    }

                    &.hidden {
                        display: none;
                    }

                    &.play-icon {
                        transform: translateX(2px);
                    }

                    &.pause-icon {
                        transform: scale(1.1);
                    }
                }
            }
        }

        &__currently-playing {
            display: flex;
            gap: 10px;
            align-items: center;
            transition: opacity 250ms;
            flex-basis: 40%;
            margin-left: 20px;

            .station {
                height: 100px;
                width: 100px;
                flex-shrink: 0;

                img {
                    height: 100%;
                    width: 100%;

                    display: block;
                    object-fit: contain;
                    object-position: center;
                }
            }

            .song__title {
                font-size: 24px;
                font-weight: $fw-medium;
                margin-bottom: 2px;
            }

            .song__artists {
                color: #bbb;
            }
        }

        &__scrub {
            position: relative;
            margin: 0 20px;
            flex-basis: 60%;
            display: flex;
            flex-direction: column;
            user-select: none;

            .progress {
                position: relative;
                width: 100%;
                height: 10px;
                background-color: #4A5A6B;
                border-radius: 10px;
                margin-bottom: 5px;
                cursor: pointer;
                overflow: hidden;

                .progress__bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: #B7D2F3;
                    border-radius: 10px;
                    width: 0;
                    transition: width 150ms;
                }
            }

            .time {
                font-size: 30px;
                display: flex;
                justify-content: space-between;
            }
        }
    }

    .radio__bottom-wrapper {
        @include breakpoint(1400px) {
            width: 100%;
            padding: 0 50px;
        }

        @include breakpoint(820px) {
            padding: 0 20px;
        }

        span {
            font-family: "Bank Gothic", sans-serif;
            font-weight: $fw-light;
            color: #999;
        }

        .setting {
            display: flex;
            justify-content: space-between;
            max-width: 1365px;
            margin: 0 auto 30px;

            @include breakpoint(880px) {
                display: none;
            }

            span {
                color: #B7D2F3;
                font-size: 34px;
                cursor: pointer;
                transition: opacity 150ms;
                text-transform: uppercase;
                user-select: none;
            }

            span:hover {
                opacity: 100%;
            }
        }

        .radio-stations {
            margin-bottom: 50px;
        }
    }
}

.change-background :deep(.modal__body) {
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

        &--disabled {
            user-select: none;
            pointer-events: none;
            filter: unset;
            opacity: 0.2;
        }
    }
}

.select-song :deep(.modal__body) {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .song {
        font-size: 16px;
        cursor: pointer;
        color: #aaa;
        font-family: "Outfit", sans-serif;

        &.song--disabled {
            opacity: 0.5;
            pointer-events: none;
            user-select: none;
        }

        &__title,
        &__artists {
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
</style>
