import {Duplex, PassThrough, Readable, Writable} from "node:stream";
import {getStations} from "~/server/utils/Stations";
import type {Song} from "~/server/utils/Station";

export default defineEventHandler(async (event) => {
    let query = getQuery(event);

    if (!query.station) {
        setResponseStatus(event, 400);

        return {
            error: 'Station query parameter is required'
        };
    }

    const stations = getStations();

    let stationParam = (query.station as string).toLowerCase();
    let station = stations.find(station => station.name.toLowerCase() === stationParam);

    if (!station) {
        setResponseStatus(event, 404);

        return {
            error: 'Station not found',
            stations: stations.map(station => station.name)
        };
    }

    let song: Song|undefined;

    if (!query.song) {
        song = await station.getRandomSong()
    } else if (typeof query.song === 'string') {
        let songParam = (query.song as string).toLowerCase();

        song = (await station.getSongs()).find(song => song.name.toLowerCase() === songParam);

        if (!song) {
            setResponseStatus(event, 404);

            return {
                error: `Invalid song`,
                songs: (await station.getSongs()).map(song => song.name)
            };
        }
    }

    let segment: string|boolean = (query.segment ?? false) as string|boolean;

    if (segment) {
        segment = (segment as string).toLowerCase();

        if (!['id', 'dj', 'caller'].includes(segment)) {
            setResponseStatus(event, 400);

            return {
                error: 'Invalid segment',
                segments: ['ID', 'DJ', 'Caller']
            };
        }

        segment = segment === 'caller' ? 'Caller' : segment.toUpperCase();
    }

    const commaSeparatedNumberList = (number: number) => {
        let string = '';
        let i = 0;

        while (i < number) {
            string += `${i}`;

            if (i !== number - 1) {
                string += ', ';
            }

            i++;
        }

        return string;
    }

    let intro: number|null = null, outro: number|null = null;

    if (query.intro) {
        intro = parseInt(query.intro as string);

        if (isNaN(intro)) {
            setResponseStatus(event, 400);

            return {
                error: 'Invalid intro'
            };
        }

        if (!song!.intros[intro]) {
            setResponseStatus(event, 400);

            return {
                error: 'Invalid outro',
                intros: commaSeparatedNumberList(song!.intros.length)
            };
        }
    }

    if (query.outro) {
        outro = parseInt(query.outro as string);

        if (isNaN(outro)) {
            setResponseStatus(event, 400);

            return {
                error: 'Invalid outro'
            };
        }

        if (!song!.outros[outro]) {
            setResponseStatus(event, 400);

            return {
                error: 'Invalid outro',
                outros: commaSeparatedNumberList(song!.intros.length)
            };
        }
    }

    if (query.stream && query.stream !== '1' && query.stream !== '0') {
        setResponseStatus(event, 400);

        return {
            error: 'Invalid stream parameter',
            stream: '1 or 0'
        };
    }

    let randType = () => Math.floor(Math.random() * 3) as 0|1|2;
    let songStream = await song!.createStream(
        intro ?? randType(),
        outro ?? randType(),
        segment as 'ID'|'DJ'|'Caller'|false
    );

    setHeader(event, 'Content-Type', 'audio/mpeg');

    event.node.req.on('close', () => {
        console.log('Request closed.');
        songStream.kill('SIGKILL');
    });


    let stream = new PassThrough();
    songStream.pipe(stream);

    if (query.stream === '1') {
        setHeader(event, 'Transfer-Encoding', 'chunked');
        await sendStream(event, stream);
    } else {
        let data = Buffer.from('');

        stream.on('data', (chunk: Buffer) => {
            data = Buffer.concat([data, chunk]);
        });

        return new Promise((resolve) => {
            songStream.on('end', async () => {
                resolve(data);
            });
        });
    }
});