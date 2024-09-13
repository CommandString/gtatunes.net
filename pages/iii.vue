<script setup lang="ts">
import type {Ref} from "vue";
import type {APISong, APIStation} from "~/@types/api";

useSeoMeta({
    ogTitle: 'GTA III Radio',
    title: 'GTA III Radio',
    description: 'Play all of the radio stations from Grand Theft Auto: III.',
    ogDescription: 'Play all of the radio stations from Grand Theft Auto: III.',
    ogImage: '/logo.png',
});

let stations: Ref<APIStation[]|null> = ref(null);
let currentStation: Ref<APIStation|null> = ref(null);
let audio: Ref<HTMLAudioElement | null> = ref(null);
let switchAudio: Ref<HTMLAudioElement | null> = ref(null);
let currentSong: Ref<APISong | null> = ref(null);
let streamAudio: Ref<boolean> = ref(false);
let paused: Ref<boolean> = ref(true);
let selectingSong: Ref<boolean> = ref(false);
let isClicking: Ref<boolean> = ref(false);
let volume: Ref<number> = ref(17);
let showingHelpModal: Ref<boolean> = ref(false);

watch(volume, value => {
    audio.value!.volume = value / 17;
    localStorage.setItem('volume', value.toString());
});

watch(streamAudio, value => {
    localStorage.setItem('stream-audio', value ? '1' : '0');
});

onMounted(async () => {
    let stationReq = await fetch('/api/iii/stations');

    if (stationReq.ok) {
        stations.value = await stationReq.json();
    } else {
        alert('There was an issue fetching the radio stations. Please contact support or try again later!');
    }



    if (!audio.value) {
        return alert('Unable to find the audio element!');
    }

    audio.value.addEventListener('ended', async () => {
        await changeSong('next');
    });

    navigator.mediaSession.setActionHandler("play", async () => await playPause(false));
    navigator.mediaSession.setActionHandler("pause", async () => await playPause(true));
    navigator.mediaSession.setActionHandler("previoustrack", async () => await changeSong('previous'));
    navigator.mediaSession.setActionHandler("nexttrack", async () => await changeSong('next'));

    switchAudio.value?.addEventListener('play', () => {
        if (!paused.value) {
            switchAudio.value!.pause();
        }
    });

    document.addEventListener('keydown', (e) => {
        let check: Record<string, () => any> = {
            ' ': () => playPause(!paused.value),
            'ArrowLeft': () => changeSong('previous'),
            'ArrowRight': () => changeSong('next'),
            'ArrowUp': () => volume.value = Math.min(17, volume.value + 1),
            'ArrowDown': () => volume.value = Math.max(0, volume.value - 1),
            '/': () => e.ctrlKey ? showingHelpModal.value = !showingHelpModal.value : null
        };

        if (check[e.key]) {
            check[e.key]();

            e.preventDefault();
        }
    });

    document.addEventListener('mousedown', () => isClicking.value = true);
    document.addEventListener('mouseup', () => isClicking.value = false);

    volume.value = parseInt(localStorage.getItem('volume') ?? '17');
    streamAudio.value = (localStorage.getItem('stream-audio') ?? '0') === '1';
});

async function changeStation(station: APIStation | null) {
    currentStation.value = station;

    if (station === null) {
        currentSong.value = null;
        audio.value!.src = '';
        document.title = 'GTA III Radio';

        if (!switchAudio.value?.paused) {
            switchAudio.value!.pause();
            switchAudio.value!.currentTime = 0;
        }

        return;
    }

    await changeSong(station.songs[Math.floor(Math.random() * station.songs.length)]);
}

async function changeSong(
    song: APISong | 'next' | 'previous'
) {
    await playPause(true);

    if (currentStation.value === null) {
        return;
    }

    if (song === 'next' || song === 'previous') {
        let currentIndex = currentStation.value!.songs.findIndex(s => s.name === currentSong.value!.name);
        song = currentStation.value!.songs[song === 'next' ? currentIndex + 1 : currentIndex - 1] ?? currentStation.value!.songs[song === 'next' ? 0 : currentStation.value!.songs.length - 1];
    }

    if (!currentStation.value!.songs.includes(song)) {
        alert('Something went wrong. Please try again.');
        throw new Error('Invalid song');
    }

    currentSong.value = song;

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: `Loading ${currentSong.value!.name}...`,
            artist: currentSong.value!.artists.join(', '),
            artwork: [
                {src: currentStation.value!.icon, sizes: '512x512', type: 'image/png'}
            ]
        });
    }

    let audioOptions = new URLSearchParams({
        station: currentStation.value!.name,
        song: currentSong.value!.name,
        stream: streamAudio.value ? '1' : '0'
    });

    audio.value!.src = `/api/iii/play?${audioOptions.toString()}`;

    await switchAudio.value!.play();

    document.title = `${currentSong.value!.name} by ${currentSong.value!.artists.join(', ')}`;

    audio.value!.addEventListener('canplay', async () => {
        switchAudio.value!.pause();
        switchAudio.value!.currentTime = 0;

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: currentSong.value!.name,
                artist: currentSong.value!.artists.join(', '),
                artwork: [
                    {src: currentStation.value!.icon, sizes: '512x512', type: 'image/png'}
                ]
            });

            await playPause(true);
            await playPause(false);
        }
    }, {once: true});

    await playPause(false);
}

function wheelToChangeStation(e: WheelEvent) {
    e.preventDefault();

    let direction = e.deltaY < 0 ? 1 : -1;

    if (!currentStation.value) {
        changeStation(stations.value![direction === 1 ? 0 : stations.value!.length - 1]);
        return;
    }

    let currentIndex = stations.value!.findIndex(station => station === currentStation.value);
    let newIndex = Math.max(-1, Math.min(stations.value!.length, currentIndex + direction));

    changeStation(stations.value![newIndex] ?? null);
}

async function playPause(pause: boolean) {
    if (pause === audio.value?.paused) {
        return;
    }

    if (!pause) {
        try {
            await audio.value!.play();
        } catch (e) {
            console.error(e)
        }
    } else {
        audio.value!.pause();
    }

    paused.value = pause;
}

function volumeBarHover(i: number): void {
    if (!isClicking.value) {
        return;
    }

    volume.value = i;
}
</script>

<template>
<main>
    <audio ref="audio"/>
    <audio ref="switchAudio" src="/audio/switch-station.mp3" loop/>
    <span class="version pricedown">v6</span>
    <div class="radio-container">
        <div class="top">
            <div class="settings">
                <div class="setting setting--volume"
                    @wheel="(e) => {
                        e.preventDefault();

                        if (e.deltaY > 0) {
                        volume = Math.max(0, volume - 1);
                        } else {
                            volume = Math.min(17, volume + 1);
                        }
                    }">
                    <span>
                        Music Volume
                    </span>
                    <div class="volume">
                        <div
                            v-for="i in 18" class="volume__bar"
                            :class="{'active': i-1 <= volume}"
                            @click="() => volume = i-1"
                            @mouseover="() => volumeBarHover(i-1)"
                        ></div>
                    </div>
                </div>
                <div class="setting setting--current-station" @wheel="wheelToChangeStation">
                    <span>Radio Station</span>
                    <span>{{ currentStation?.name ?? 'None' }}</span>
                </div>
                <div
                    class="setting setting--stream setting--toggle"
                    :class="{ 'active': streamAudio }"
                    @click="() => streamAudio = !streamAudio">
                    <span class="setting__name">Stream Audio</span>
                    <span class="setting__value">{{ streamAudio ? 'On' : 'Off' }}</span>
                </div>
                <div
                    class="setting"
                    @click="() => {
                        if (currentStation === null) {
                            return;
                        }

                        selectingSong = true;
                    }"
                    :class="{'disabled': currentStation === null}"
                >
                    <span class="setting__name">Select Song</span>
                </div>
                <div class="setting"
                    :class="{ 'active': showingHelpModal }"
                    @click="() => showingHelpModal = !showingHelpModal">
                    <span class="setting__name">Help</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="radio-stations" @wheel="wheelToChangeStation">
                <div
                    class="radio-station"
                    :class="{'active': currentStation?.name === station.name}"
                    v-for="station of stations"
                    @click="() => changeStation((currentStation?.name === station.name) ? null : station)"
                >
                    <img :src="station.icon" :alt="station.name">
                    <img :src="station.icon" :alt="station.name">
                </div>
            </div>
            <div class="controls"
                     :class="{'controls--hidden': currentSong === null || currentStation === null}">
                    <div v-if="currentStation !== null && currentSong !== null"
                         class="controls__currently-playing">
                        <div class="station">
                            <img :src="currentStation.icon" :alt="currentStation.name">
                        </div>
                        <div class="song">
                            <div class="song__title">{{ currentSong.name }}</div>
                            <div class="song__meta">{{ currentSong.artists.join(', ') }}</div>
                        </div>
                    </div>
                    <div class="controls__state">
                        <div v-if="audio" class="controls__media">
                            <SvgoNextIcon
                                :fontControlled="false"
                                class="previous-song"
                                @click="() => (audio!.currentTime < 5) ?
                                changeSong('previous') :
                                audio!.currentTime = 0"
                            />
                            <SvgoPauseIcon
                                :fontControlled="false"
                                class="play-icon"
                                @click="() => playPause(true)"
                                :class="{'hidden': paused}"
                            />
                            <SvgoPlayIcon
                                :fontControlled="false"
                                class="pause-icon"
                                @click="() => playPause(false)"
                                :class="{'hidden': !paused}"
                            />
                            <SvgoNextIcon @click="() => changeSong('next')"/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <div class="gta-iii-radio">
        <span>GTA III Radio</span>
    </div>
    <IIIModal class="select-song" :open="selectingSong" @close="() => selectingSong = false">
        <template v-slot:title>Change Song</template>
        <template v-slot:body>
            <div
                class="song"
                :class="{'song--disabled': song === currentSong}"
                v-for="song in currentStation?.songs ?? []"
                @click="() => {
                    if (song === currentSong) {
                        return;
                    }

                    selectingSong = false;

                    changeSong(song);
                }"
            >
                <div class="song__title">
                    {{ song.name }}
                </div>
                <div class="song__artists">
                    {{ song.artists.join(', ') }}
                </div>
            </div>
        </template>
    </IIIModal>
    <IIIModal class="help-modal" :open="showingHelpModal" @close="() => showingHelpModal = false">
        <template #title>Help</template>
        <template #body>
            <h2>Shortcuts</h2>
            <div class="shortcuts">
                <div class="shortcut">
                    <kbd>UP</kbd>
                    <p>Increase Volume</p>
                </div>
                <div class="shortcut">
                    <kbd>DOWN</kbd>
                    <p>Decrease Volume</p>
                </div>
                <div class="shortcut">
                    <kbd>LEFT</kbd>
                    <p>Previous Song</p>
                </div>
                <div class="shortcut">
                    <kbd>RIGHT</kbd>
                    <p>Next Song</p>
                </div>
                <div class="shortcut">
                    <kbd>SPACE</kbd>
                    <p>Pause/Play Song</p>
                </div>
            </div>
            <p>You can also use <kbd>CTRL</kbd> + <kbd>/</kbd> to toggle this modal.</p>
            <h2>Special Features</h2>
            <p>You can scroll on the audio label to change volume. You can also scroll while hovering hover the radio station icons to change the station.</p>
            <h2>Stream Audio Setting</h2>
            <p>This is really a performance and compatibility option. If you're on mobile you will <b>NOT</b> see this
                option as it will not work. Pretty much the songs are streamed from multiple audio files or if you
                disable this option it will wait for the audio files to finish being combined to prevent issues on
                mobile.</p>
        </template>
    </IIIModal>
</main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/includes";

$yellow: #F1B039;
$hover-yellow: lighten($yellow, 10%);

main {
    background: url('@/assets/images/iii-bg.png') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    padding: 20px;
    position: relative;
    @include iii_cursor();

    @include breakpoint(730px) {
        background-size: cover;
        background-position: center;
    }

    &::after {
        content: '';
        position: absolute;
        inset: 20px;
        background: rgba(#fff, 0.1);
        border-radius: 20px;
        border: 1px solid rgba(#fff, 0.1);
    }

    .version {
        position: absolute;
        bottom: 0.7em;
        right: 40px;
        font-size: 2em;
        color: $yellow;
        font-family: "Pricedown", sans-serif;
        border-radius: 5px;
    }

    .gta-iii-radio {
        position: absolute;
        bottom: 60px;
        left: 20px;
        right: 20px;
        height: fit-content;
        background: $yellow;
        display: flex;
        justify-content: flex-end;
        z-index: 1;

        span {
            display: block;
            font-size: 3em;
            margin-right: 30px;
            color: #000;
            font-family: "Pricedown", sans-serif;
            margin-bottom: 10px;
        }
    }

    .radio-container {
        height: calc(100% - 110px);
        padding: 50px 0 0;
        color: $yellow;
        font-family: 'pricedown', sans-serif;
        letter-spacing: 0.1px;
        position: relative;
        z-index: 1;
        overflow: auto;
        font-size: 2em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include breakpoint(764px) {
            height: calc(100% - 105px);
        }

        @include breakpoint(520px) {
            font-size: 1.8em;
        }

        .top {
            .settings {
                display: flex;
                flex-direction: column;
                margin-bottom: 50px;

                .setting {
                    padding: 5px 120px 10px;
                    display: flex;
                    justify-content: space-between;
                    user-select: none;

                    &:hover {
                        background: rgba(lighten(#53675A, 10%), 0.5);
                    }

                    &.disabled {
                        pointer-events: none;
                        opacity: 50%;
                    }

                    &--current-station,
                    &--stream {
                        @include breakpoint(490px) {
                            display: none;
                        }
                    }
                    
                    &--volume {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        @include breakpoint(550px) {
                            display: none;
                        }

                        &:has(.volume:hover) span {
                            opacity: 100%;
                        }

                        .volume {
                            $base: 15%;
                            $bars: 17;
                            $volume-bar-width: 20px;
                            $gap: 10px;

                            display: flex;
                            align-items: flex-end;
                            height: 40px;

                            &--muted {
                                pointer-events: none;
                            }

                            .volume__bar {
                                width: calc($volume-bar-width + $gap);
                                border-radius: 1px;
                                transition: background-color 50ms;
                                position: relative;
                                user-select: none;

                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    height: 100%;
                                    width: $volume-bar-width;
                                    background-color: darken($yellow, 20%);
                                    pointer-events: none;
                                    box-shadow: 4px 4px 0 #000;
                                }

                                &.active::after {
                                    background-color: $hover-yellow;
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
                                .volume__bar::after {
                                    background-color: $hover-yellow;
                                }

                                .volume__bar:hover ~ .volume__bar::after {
                                    background-color: darken($yellow, 20%);
                                }
                            }

                            @include breakpoint(1080px) {
                                .volume__bar {
                                    width: 12px;

                                    &::after {
                                        width: 7px;
                                        box-shadow: 2px 2px 0 #000;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .bottom {
            padding: 0 100px;

            .radio-stations {
                display: grid;
                grid-template-columns: repeat(9, 1fr);
                align-items: center;
                gap: 50px;
                padding: 0 25px;

                @include breakpoint(1800px) {
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                }

                .radio-station {
                    opacity: 50%;
                    scale: 1;
                    transition: opacity 150ms, scale 150ms;
                    max-width: 3em;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    img:last-child {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        opacity: 0;
                        filter: blur(5px);
                        z-index: -1;
                        transition: opacity 150ms;
                    }

                    &:hover {
                        opacity: 0.5;
                        scale: 1.05;

                        img:last-child {
                            opacity: 0.5;
                        }
                    }

                    &.active{
                        opacity: 100%;
                        scale: 1.1;

                        img:last-child {
                            opacity: 1;
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
                margin: 40px auto 0;
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

                        svg {
                            $size: 25px;

                            width: $size;
                            height: $size;
                            fill: white;

                            &.previous-song {
                                transform: rotate(180deg);
                            }

                            &.hidden {
                                display: none;
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

                        @include breakpoint(500px) {
                            width: 75px;
                            height: 75px;
                        }

                        img {
                            height: 100%;
                            width: 100%;

                            display: block;
                            object-fit: contain;
                            object-position: center;
                        }
                    }

                    .song__title {
                        font-weight: $fw-medium;
                        margin-bottom: 2px;
                        font-family: "Pricedown", sans-serif;
                        letter-spacing: 0.1px;
                        font-size: 0.9em;
                    }

                    .song__meta {
                        color: #ccc;
                        font-size: 0.7em;
                        font-family: "Pricedown", sans-serif;
                        letter-spacing: 0.1px;
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
        }

        @mixin setHorizontalPaddingBreakpoint($max-width, $horizontal-padding) {
            @include breakpoint($max-width) {
                .top .settings .setting {
                    padding-left: $horizontal-padding;
                    padding-right: $horizontal-padding;
                }

                .bottom {
                    padding-left: $horizontal-padding - 20px;
                    padding-right: $horizontal-padding - 20px;
                }
            }
        }

        @include setHorizontalPaddingBreakpoint(770px, 80px);
        @include setHorizontalPaddingBreakpoint(650px, 25px);
    }

    :deep(.modal-container) {
        z-index: 2;
    }

    .select-song :deep(.modal__body) {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .song {
            font-size: 16px;
            color: #aaa;
            font-family: "Outfit", sans-serif;

            &.song--disabled {
                opacity: 0.5;
                pointer-events: none;
                user-select: none;
            }

            &__title {
                display: inline-block;
                font-size: 18px;
                color: white;
                transition: color 150ms;
            }

            &:hover {
                .song__title {
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

    .help-modal {
        p {
            line-height: 27px;
        }

        kbd {
            background: $yellow;
            padding: 2px 12px;
            border-radius: 5px;
            text-align: center;
            font-family: Pricedown, sans-serif;
            color: black;
        }

        .shortcuts {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .shortcut {
                display: flex;
                gap: 10px;
                align-items: center;
                flex-grow: 1;

                kbd {
                    width: 100px;
                }

                p {
                    margin: 0;
                }
            }
        }
    }

    @include breakpoint(550px) {
        padding: 0;

        &::after {
            inset: 0;
            border-radius: 0;
            border: none;
        }

        .version {
            color: black;
            z-index: 2;
            bottom: 15px;
            right: 5px;
            font-size: 1.5em;
        }

        .gta-iii-radio {
            bottom: 0;
            left: 0;
            right: 0;
            justify-content: center;

            span {
                position: relative;
                left: 15px;
            }
        }

        .radio-container {
            height: calc(100vh - 65px);
            padding-top: 30px;
        }
    }
}
</style>