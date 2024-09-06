<script setup lang="ts">
import type {Ref} from "vue";
import type {APIStation, APISong} from "~/@types/api";

useSeoMeta({
    ogTitle: 'San Andreas Radio',
    title: 'San Andreas Radio',
    description: 'Play all of the radio stations from Grand Theft Auto: San Andreas.',
    ogDescription: 'Play all of the radio stations from Grand Theft Auto: San Andreas.',
    ogImage: '/logo.png',
});

type BackgroundKey =
    'vinewood'
    | 'las-venturas-desert'
    | 'las-venturas'
    | 'san-fierro'
    | 'los-santos'
    | 'san-fierro-bridge';
type Background = {
    key: BackgroundKey
    name: string
    image: string
}

const BACKGROUNDS: Background[] = [
    {
        name: "Vinewood",
        key: "vinewood",
        image: "/bgs/sa/vinewood.png",
    },
    {
        name: "Las Venturas Desert",
        key: "las-venturas-desert",
        image: "/bgs/sa/las-venturas-desert.png",
    },
    {
        name: "Los Santos",
        key: "los-santos",
        image: "/bgs/sa/los-santos.png",
    },
    {
        name: "Las Venturas",
        key: "las-venturas",
        image: "/bgs/sa/las-venturas.png",
    },
    {
        name: "San Fierro",
        key: "san-fierro",
        image: "/bgs/sa/san-fierro.png",
    },
    {
        name: "San Fierro Bridge",
        key: "san-fierro-bridge",
        image: "/bgs/sa/san-fierro-bridge.png",
    }
];

let volume: Ref<number> = ref(17);
let audio: Ref<HTMLAudioElement | null> = ref(null);
let switchAudio: Ref<HTMLAudioElement | null> = ref(null);
let background: Ref<BackgroundKey> = ref('vinewood');
let stations: Ref<APIStation[] | null> = ref(null);
let currentStation: Ref<APIStation | null> = ref(null);
let currentSong: Ref<APISong | null> = ref(null);
let streamAudio: Ref<boolean> = ref(false);
let disableDJs: Ref<boolean> = ref(false);
let showingHelpModal: Ref<boolean> = ref(false);
let paused: Ref<boolean> = ref(true);
let muted: Ref<boolean> = ref(false);
let selectingBackground: Ref<boolean> = ref(false);
let selectingSong: Ref<boolean> = ref(false);

watch(background, value => {
    if (localStorage.getItem('background') === value) {
        return;
    }

    localStorage.setItem('background', value);
});

onMounted(async () => {

    if (!stationsReq.ok) {
        return alert('There was an issue fetching the radio stations. Please contact support or try again later.');
    }

    stations.value = await stationsReq.json();
    background.value = localStorage.getItem('background') as BackgroundKey ?? 'vinewood';
    volume.value = parseInt(localStorage.getItem('volume') ?? '17');
    streamAudio.value = localStorage.getItem('stream-audio') === '1';
    disableDJs.value = localStorage.getItem('disable-djs') === '1';

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
});

watch(volume, value => {
    audio.value!.volume = value / 17;
    localStorage.setItem('volume', value.toString());
});

watch(muted, value => {
    audio.value!.muted = value;
});

watch(streamAudio, value => {
    localStorage.setItem('stream-audio', value ? '1' : '0');
})

watch(disableDJs, value => {
    localStorage.setItem('disable-djs', value ? '1' : '0');
})

async function changeSong(
    song: APISong | 'next' | 'previous',
    segment: 'id' | 'dj' | 'caller' | 'random' | false = false
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

    if (segment && !disableDJs.value) {
        if (segment === 'random') {
            segment = ['id', 'dj', 'caller'][Math.floor(Math.random() * 3)] as 'id' | 'dj' | 'caller';
        }

        audioOptions.set('segment', segment);
    }

    if (disableDJs.value) {
        audioOptions.set('intro', '0');
        audioOptions.set('outro', '0');
    }

    audio.value!.src = `/api/play?${audioOptions.toString()}`;

    await switchAudio.value!.play();

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

async function changeStation(station: APIStation | null) {
    currentStation.value = station;

    if (station === null) {
        currentSong.value = null;
        audio.value!.src = '';

        if (!switchAudio.value?.paused) {
            switchAudio.value!.pause();
            switchAudio.value!.currentTime = 0;
        }

        return;
    }

    await changeSong(station.songs[Math.floor(Math.random() * station.songs.length)], 'id');
}

function wheelToChangeStation(e: WheelEvent) {
    e.preventDefault();

    let direction = e.deltaY < 0 ? 1 : -1;

    if (!currentStation) {
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
</script>

<template>
    <section class="radio" :class="background">
        <audio ref="audio"></audio>
        <audio ref="switchAudio" src="/audio/switch-station.mp3" loop></audio>
        <div class="container">
            <h1 class="radio-title">San Andreas</h1>
            <div class="settings">
                <div class="setting setting--volume active">
                <span
                    class="setting__name"
                    @wheel="(e) => {
                        e.preventDefault();

                        if (e.deltaY > 0) {
                            volume = Math.max(0, volume - 1);
                        } else {
                            volume = Math.min(17, volume + 1);
                        }
                    }"
                    @click="(e) => muted = !muted"
                >
                    Audio
                </span>
                    <div class="volume" :class="{
                        'volume--muted': muted
                    }">
                        <div
                            v-for="i in 17" class="volume__bar"
                            :class="{'active': i <= volume && !muted}"
                            @click="() => volume = i"
                        ></div>
                    </div>
                </div>
                <div
                    class="setting"
                    @click="() => selectingBackground = true">
                    <span class="setting__name">Change Background</span>
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
                <div
                    class="setting setting--stream setting--toggle"
                    :class="{ 'active': streamAudio }">
                    <span @click="() => streamAudio = !streamAudio" class="setting__name">Stream Audio</span>
                    <span class="setting__value">{{ streamAudio ? 'On' : 'Off' }}</span>
                </div>
                <div
                    class="setting setting--toggle"
                    :class="{ 'active': disableDJs }">
                    <span @click="() => disableDJs = !disableDJs" class="setting__name">Disable DJs</span>
                    <span class="setting__value">{{ disableDJs ? 'On' : 'Off' }}</span>
                </div>
                <div class="setting"
                     :class="{ 'active': showingHelpModal }">
                    <span @click="() => showingHelpModal = !showingHelpModal" class="setting__name">Help</span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="current-station">
            <span
                @wheel="wheelToChangeStation"
                @click="() => changeStation(null)"
            >
                Radio Station
            </span>
                <span>
                {{ currentStation?.name ?? 'None' }}
            </span>
            </div>
            <div @wheel="wheelToChangeStation" class="stations">
                <div
                    v-for="station in stations"
                    class="station"
                    :class="{'active': currentStation?.name === station.name}"
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
            <p class="version">v4</p>
        </div>
    </section>
    <Modal class="change-background" :open="selectingBackground" @close="() => selectingBackground = false">
        <template v-slot:title>Background</template>
        <template v-slot:body>
            <div
                class="bg-option"
                v-for="bg in BACKGROUNDS"
                :class="{'bg-option--disabled': background === bg.name}"
                @click="() => {
                    selectingBackground = false;
                    background = bg.key;
                }"
            >
                <img :src="bg.image" :alt="bg.name" :class="{'middle': bg.key === 'san-fierro'}">
            </div>
        </template>
    </Modal>
    <Modal class="select-song" :open="selectingSong" @close="() => selectingSong = false">
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
    </Modal>
    <Modal class="help-modal" :open="showingHelpModal" @close="() => showingHelpModal = false">
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
            <h2>Disable DJs Setting</h2>
            <p>Enabling this option will remove inserts such as segments and prevent DJ voice over for the song intros
                and outros. Do note that SFUR does not have any audio files without the DJ so you will still hear
                the DJ in the intros and outros!</p>
        </template>
    </Modal>
</template>

<style scoped lang="scss">
@import "/assets/scss/includes";

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
    font-family: 'Diploma', sans-serif;
    font-weight: $fw-regular;
    color: #B7D2F3;
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
    background-attachment: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    height: 100vh;
    overflow: auto;

    .container {
        width: 100%;
    }

    @include breakpoint(1167px) {
        background-size: cover;
        background-position: top right;
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
        background-position: top center;
    }

    &.san-fierro-bridge {
        background-image: $gradient-overlay, url("/bgs/sa/san-fierro-bridge.png");
    }

    &.vinewood {
        background-image: $gradient-overlay, url("/bgs/sa/vinewood.png");
    }

    h1.radio-title {
        margin-bottom: 0.45em;
        font-size: 3.1em;
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

            &__name, &__value {
                font-family: "Bank Gothic", sans-serif;
                color: #B7D2F3;
                opacity: 50%;
                font-weight: $fw-light;
                font-size: 1.9em;
                transition: opacity 150ms;
                text-transform: uppercase;
                user-select: none;
            }

            &__name {
                cursor: pointer;

                @media (hover: hover) {
                    &:hover {
                        opacity: 100%;
                    }
                }
            }

            &--toggle {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

            &.active span {
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
                    $base: 15%;
                    $bars: 16;

                    display: flex;
                    align-items: flex-end;
                    gap: 7px;
                    height: 40px;

                    &--muted {
                        pointer-events: none;
                    }

                    .volume__bar {
                        width: 7px;
                        background-color: #4A5A6B;
                        border-radius: 1px;
                        transition: background-color 50ms;
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
                span {
                    opacity: 75%;
                }

                &--volume, &--stream {
                    display: none;
                }
            }
        }
    }

    .current-station {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;

        @include breakpoint(840px) {
            display: none;
        }

        span {
            font-family: "Bank Gothic", sans-serif;
            color: #B7D2F3;
            font-weight: $fw-light;
            font-size: 1.9em;
            cursor: pointer;
            transition: opacity 150ms;
            text-transform: uppercase;
            user-select: none;
        }
    }

    .stations {
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        gap: 20px;
        align-items: center;
        margin-bottom: 40px;

        @include breakpoint(1100px) {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        }

        .station {
            cursor: pointer;
            position: relative;
            height: 100px;

            img {
                width: 100%;
                height: 100%;
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

                svg {
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
                margin-bottom: 5px;
            }

            .song__meta {
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

    .version {
        font-size: 0.9em;
        color: #ccc;
        margin: 0 auto;
        width: fit-content;
    }
}

.change-background :deep(.modal__body) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    @include breakpoint(1015px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(600px) {
        grid-template-columns: repeat(1, 1fr);
    }

    .bg-option {
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: right;
            display: block;
            border-radius: 5px;
            transition: filter 150ms;
            filter: brightness(0.7);

            &.middle {
                object-position: center;
            }
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
        background: #526785;
        padding: 2px 12px;
        border-radius: 5px;
        text-align: center;
        font-family: "Bank Gothic", sans-serif;
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
</style>