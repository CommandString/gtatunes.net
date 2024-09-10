import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";
import path from "node:path";
import {readdir} from "node:fs/promises";

const AUDIO_FOLDER = path.resolve(process.cwd(), 'audio', 'sa');

const createConcatStream = (files: Array<string>): FfmpegCommand => {
    return ffmpeg()
        .input(`concat:${files.join('|')}`)
        .format('mp3')
        .on('error', (e) => {
            console.error(e);
        });
}

/**
 * [title, artists, year, file_name]
 * The title is used if file_name is null
 */
export type SongMetaData = [string, string[], number, string|null];

export abstract class Station {
    abstract readonly name: string;
    abstract readonly icon: string;
    abstract readonly songFolder: string|null;
    protected readonly abstract songMetadata: SongMetaData[];
    private songs: Song[]|null = null;
    private segments: {
        id: string[]|null,
        dj: string[]|null,
        caller: string[]|null,
    } = {id: null, dj: null, caller: null};

    public async getSongs(): Promise<Song[]> {
        if (this.songs) {
            return this.songs;
        }

        let pathPrefix = [AUDIO_FOLDER, this.songFolder ?? this.name];

        const files = await readdir(path.resolve(...pathPrefix));
        let songs = [];

        const getPaths = (title: string, type: 'intro'|'outro'|'mid'): Array<string> => {
            let intros = [];

            for (let file of files) {
                if (file.toLowerCase().includes(`${title.toLowerCase()} (${type}`)) {
                    intros.push(path.resolve(...pathPrefix, file));
                }
            }

            return intros;
        }

        for (let [title, artists, year, fileName] of this.songMetadata) {
            songs.push(new Song(this, title, artists, year, getPaths(fileName ?? title, 'mid')[0], getPaths(fileName ?? title, 'intro').reverse(), getPaths(fileName ?? title, 'outro').reverse()));
        }

        return this.songs = songs;
    }

    public async getRandomSong(): Promise<Song> {
        let songs = await this.getSongs();
        return songs[Math.floor(Math.random() * songs.length)];
    }

    public async getRandomSegment(type: 'ID'|'DJ'|'Caller'): Promise<string> {
        let segments = [];
        let pathPrefix = [AUDIO_FOLDER, this.songFolder ?? this.name];

        if (!this.segments[type.toLowerCase() as 'id'|'dj'|'caller']) {
            const files = await readdir(path.resolve(...pathPrefix));

            for (let file of files) {
                if (file.includes(`(${type})`)) {
                    segments.push(file);
                }
            }

            if (segments.length === 0) {
                throw new Error(`No ${type} segments found`);
            }

            this.segments[type.toLowerCase() as 'id'|'dj'|'caller'] = segments;
        } else {
            segments = this.segments[type.toLowerCase() as 'id'|'dj'|'caller']!;
        }

        let randomId = segments[Math.floor(Math.random() * segments.length)];

        return path.resolve(...pathPrefix, randomId);
    }
}

export class Song {
    public constructor(
        public readonly station: Station,
        public readonly name: string,
        public readonly artists: string[],
        public readonly year: number,
        public readonly midPath: string,
        public readonly intros: Array<string>,
        public readonly outros: Array<string>,
    ) {
    }

    async createStream(
        intro: number = 0,
        outro: number = 0,
        segmentType: 'ID'|'DJ'|'Caller'|false = false,
    ): Promise<FfmpegCommand> {
        let introPath = this.intros[intro] ?? this.intros[0];
        let outroPath = this.outros[outro] ?? this.outros[0];

        const files = [
            introPath,
            this.midPath,
            outroPath,
        ];

        if (segmentType !== false) {
            try {
                let idFile = await this.station.getRandomSegment(segmentType);
                files.unshift(idFile);
            } catch (e) {

            }
        }

        return createConcatStream(files);
    }
}
