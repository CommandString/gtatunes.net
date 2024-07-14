import { Request, Response } from 'express';
import {Controller} from "./Controller";
import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg';
import {PassThrough} from "node:stream";

export default class Routes extends Controller {
    public register(): void {
        const { http } = this.app;
        const file = (name: string) => `${__dirname}/../../audio/Bounce FM/${name}.ogg`;

        const startStream = (files: Array<string>): FfmpegCommand => {
            return ffmpeg()
                .input(`concat:${files.join('|')}`)
                .format('ogg')
                .on('error', (e) => {
                    console.error(e);
                });
        }

        let passThrough: PassThrough|null = null;

        http.get('/radio', (req: Request, res: Response): void => {
            if (passThrough) {
                passThrough.end();
                passThrough = null;
            }

            passThrough = new PassThrough();

            res.set({
                'Content-Type': 'audio/ogg',
                'Transfer-Encoding': 'chunked'
            });

            res.on('close', () => {
                if (!passThrough) {
                    return;
                }

                passThrough.end();
                passThrough = null;
            });

            startStream([
                file("(ID) 'Party ship's crash landed'"),
                file('You Dropped a Bomb on Me (Intro DJ #2)'),
                file('You Dropped a Bomb on Me (Mid)'),
                file('You Dropped a Bomb on Me (Outro DJ #1)')
            ]).pipe(passThrough, {end: false}).pipe(res);
        });

        /**
        http.get('/audio', (req: Request, res: Response): void => {
            res.set({
                'Content-Type': 'audio/ogg',
                'Transfer-Encoding': 'chunked'
            });

            const passThrough = new PassThrough();

            const ffmpegStream = startStream([
                file('You Dropped a Bomb on Me (Intro DJ #2)'),
                file('You Dropped a Bomb on Me (Mid)'),
                file('You Dropped a Bomb on Me (Outro DJ #1)')
            ]).on('end', () => {
                startStream([
                    file('Funky Worm (Intro DJ #1)'),
                    file('Funky Worm (Mid)'),
                    file('Funky Worm (Outro DJ #2)')
                ]).pipe(passThrough, {end: false});
            }).on('error', () => {
                passThrough.end();
            });

            setTimeout(() => {
                console.log('Switching stream')
                ffmpegStream.kill('SIGKILL');

                startStream([
                    file('You Dropped a Bomb on Me (Intro DJ #2)'),
                    file('You Dropped a Bomb on Me (Mid)'),
                    file('You Dropped a Bomb on Me (Outro DJ #1)')
                ]).pipe(passThrough);
            }, 10000)

            ffmpegStream.pipe(passThrough, {end: false}).pipe(res);

            res.on('close', () => {
                ffmpegStream.kill('SIGKILL');
                passThrough.end();
            });
        });
        */
    }
}
