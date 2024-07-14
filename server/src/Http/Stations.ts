import {Controller} from "./Controller";
import {PassThrough} from "node:stream";
import RadioX from "../Stations/RadioX";
import CSR from "../Stations/CSR";
import KRose from "../Stations/KRose";
import KDst from "../Stations/KDst";
import SFUR from "../Stations/SFUR";
import BounceFM from "../Stations/BounceFM";
import KJah from "../Stations/KJah";
import {Station} from "../Stations/Station";
import MasterSounds from "../Stations/MasterSounds";
import PlaybackFM from "../Stations/PlaybackFM";
import RadioLosSantos from "../Stations/RadioLosSantos";
import {createWriteStream} from "node:fs";
import path from "node:path";
import {unlink} from "node:fs/promises";
import * as fs from "node:fs";
import {readFileSync} from "fs";

export default class extends Controller {
    public register(): void {
        const { http } = this.app;

        http.get('')

        const stations: Array<Station> = [
            new BounceFM(),
            new CSR(),
            new KDst(),
            new KJah(),
            new KRose(),
            new MasterSounds(),
            new PlaybackFM(),
            new RadioX(),
            new SFUR(),
            new RadioLosSantos()
        ];

        http.get('/stations', async (req, res) => {
            let mappedStations = [];

            for (let station of stations) {
                mappedStations.push({
                    name: station.name,
                    icon: station.icon,
                    songs: (await station.getSongs()).map(song => song.name)
                });
            }

            res.send(mappedStations);

        })

        http.get('/play', async (req, res) => {
            if (!req.query.station) {
                res.status(400).send({
                    error: 'Station query parameter is required'
                });

                return;
            }

            let stationParam = (req.query.station as string).toLowerCase();
            let station = stations.find(station => station.name.toLowerCase() === stationParam);

            if (!station) {
                res.status(404).send({
                    error: 'Station not found',
                    stations: stations.map(station => station.name)
                });

                return;
            }

            let song;

            if (!req.query.song) {
                song = await station.getRandomSong()
            } else if (typeof req.query.song === 'string') {
                let songParam = (req.query.song as string).toLowerCase();

                song = (await station.getSongs()).find(song => song.name.toLowerCase() === songParam);

                if (!song) {
                    res.status(404).send({
                        error: `Invalid song`,
                        songs: (await station.getSongs()).map(song => song.name)
                    });

                    return;
                }
            }

            let segment = req.query.segment ?? false;

            if (segment) {
                segment = (segment as string).toLowerCase();

                if (!['id', 'dj', 'caller'].includes(segment)) {
                    res.status(400).send({
                        error: 'Invalid segment',
                        segments: ['ID', 'DJ', 'Caller']
                    });

                    return;
                }

                if (segment === 'caller') {
                    segment = 'Caller';
                } else {
                    segment = segment.toUpperCase();
                }
            }



            let randType = () => Math.floor(Math.random() * 3) as 0|1|2;
            let songStream = await song!.createStream(
                randType(),
                randType(),
                segment as 'ID'|'DJ'|'Caller'|false
            );

            let stream = new PassThrough();

            res.header({
                'Content-Type': 'audio/mpeg'
            })

            songStream.pipe(stream).pipe(res);

            req.on('close', () => {
                console.log('Request closed.');
                songStream.kill('SIGKILL');
            });

            //
            // const tempDir = path.resolve(__dirname + '/../../temp');
            // const tempPath = path.join(tempDir, `temp-${Date.now()}`);
            // const stream = createWriteStream(tempPath);
            //
            // console.log(`Creating stream for ${song!.name}`);
            //
            // songStream.pipe(stream);
            //
            // songStream.on('end', async () => {
            //     stream.end();
            //     console.log(`Stream ended for ${song!.name}`);
            //
            //     res.header({
            //         'Content-Type': 'audio/mpeg'
            //     }).send(readFileSync(tempPath))
            //
            //     console.log('Deleting temp file.')
            //     await unlink(tempPath);
            // });
            //
            // req.on('end', async () => {
            //     console.log(`Sent ${song!.name} to client.`);
            // })
        });
    }
}
