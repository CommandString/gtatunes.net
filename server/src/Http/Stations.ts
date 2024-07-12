import { Request, Response } from 'express';
import {Controller} from "./Controller";
import {Station} from "../Stations/Station";
import BounceFM from "../Stations/SA/BounceFM";
import CSR from "../Stations/SA/CSR";
import KDst from "../Stations/SA/KDst";
import KJahWest from "../Stations/SA/KJahWest";
import KRose from "../Stations/SA/KRose";
import MasterSounds from "../Stations/SA/MasterSounds";
import PlaybackFM from "../Stations/SA/PlaybackFM";
import RadioLosSantos from "../Stations/SA/RadioLosSantos";
import RadioX from "../Stations/SA/RadioX";
import SFUR from "../Stations/SA/SFUR";
import WCTR from "../Stations/SA/WCTR";

declare module "express-serve-static-core" {
    interface Request {
        game?: {
            [stationKey: string]: Station
        };
        station?: Station;
    }
}

type GameStations = {
    [game: string]: {
        [stationKey: string]: Station
    }
};

export function getStations(): GameStations {
    let games: GameStations  = {};

    for (let [game, stations] of Object.entries({
        sa: [
            new BounceFM,
            new CSR,
            new KDst,
            new KJahWest,
            new KRose,
            new MasterSounds,
            new PlaybackFM,
            new RadioLosSantos,
            new RadioX,
            new SFUR,
            new WCTR
        ],
        vc: [],
        iii: []
    })) {
        let mappedStations: { [s: string]: Station; } = {};

        for (let station of stations) {
            mappedStations[station.key] = station;
        }

        games[game] = mappedStations;
    }

    return games;
}

export default class Stations extends Controller {
    public register(): void {
        const { http } = this.app;
        const stations = getStations();

        //################//
        //   MIDDLEWARE   //
        //################//
        const gameStationsUri = '/stations/:game(sa|vc|iii)';
        const gameStationUri = `${gameStationsUri}/:station([a-z_]+)`;

        const validGame = (req: Request, res: Response, next: Function): void => {
            if (['sa', 'vc', 'iii'].includes(req.params.game)) {
                req.game = stations[req.params.game];
                next();
                return;
            }

            res.send({
                error: 'Invalid game, must be sa, vc or iii'
            });
        };
        const validStation = (req: Request, res: Response, next: Function): void => {
            if (!req.game) {
                throw new Error('Valid game middleware must be run before valid station middleware.');
            }

            let station = req.game[req.params.station];

            if (station) {
                req.station = station;
                next();
                return;
            }

            res.send({
                error: 'Station not found, must be one of the following: ' + Object.keys(req.game).join(', ')
            });
        };

        http.get('/stations', (req: Request, res: Response): void => {
            res.send(stations);
        });

        http.get(gameStationsUri, validGame, (req: Request, res: Response): void => {
            res.send(req.game);
        });

        http.get(gameStationUri, validGame, validStation, (req: Request, res: Response): void => {
            res.send(req.station);
        });

        http.get(`${gameStationUri}/songs`, validGame, validStation, (req: Request, res: Response): void => {
            res.send(req.station!.songs);
        });
    }
}
