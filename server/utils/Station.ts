import ffmpeg, {FfmpegCommand} from "fluent-ffmpeg";
import path from "node:path";
import {readdir} from "node:fs/promises";

export const audioFolder = path.resolve(process.cwd(), 'audio');

const createConcatStream = (files: Array<string>): FfmpegCommand => {
    return ffmpeg()
        .input(`concat:${files.join('|')}`)
        .format('mp3')
        .on('error', (e) => {
            console.error(e);
        });
}

export abstract class Station {
    abstract readonly name: string;
    abstract readonly icon: string;
    abstract readonly songFolder: string|null;
    private songs: Song[]|null = null;

    public async getSongs(): Promise<Song[]> {
        if (this.songs) {
            return this.songs;
        }

        let pathPrefix = [audioFolder, this.songFolder ?? this.name];

        const files = await readdir(path.resolve(...pathPrefix));
        let songs = [];

        const getPaths = (title: string, type: 'Intro'|'Outro'): Array<string> => {
            let intros = [];

            for (let file of files) {
                if (file.includes(`${title} (${type}`)) {
                    intros.push(path.resolve(...pathPrefix, file));
                }
            }

            return intros;
        }

        for (let file of files) {
            if (!file.includes('(Mid)')) {
                continue;
            }

            let title = file.replace(' (Mid).ogg', '');

            songs.push(new Song(this, title, path.resolve(...pathPrefix, file), getPaths(title, 'Intro').reverse(), getPaths(title, 'Outro').reverse()));
        }

        return this.songs = songs;
    }

    public async getRandomSong(): Promise<Song> {
        let songs = await this.getSongs();
        return songs[Math.floor(Math.random() * songs.length)];
    }

    public async getRandomSegment(type: 'ID'|'DJ'|'Caller'): Promise<string> {
        let pathPrefix = [audioFolder, this.songFolder ?? this.name];
        const files = await readdir(path.resolve(...pathPrefix));
        let ids = [];

        for (let file of files) {
            if (file.includes(`(${type})`)) {
                ids.push(file);
            }
        }

        if (ids.length === 0) {
            throw new Error(`No ${type} files found`);
        }

        let randomId = ids[Math.floor(Math.random() * ids.length)];

        return path.resolve(...pathPrefix, randomId);
    }
}

export class Song {
    public constructor(
        public readonly station: Station,
        public readonly name: string,
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
