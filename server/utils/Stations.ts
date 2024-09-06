import { Station } from "./Station";

let stations: Station[]|null;

export class BounceFM extends Station {
    name = 'Bounce FM';
    icon = `/station-icons/sa/bounce_fm.png`;
    songFolder = null;
}

export class CSR extends Station {
    name = 'CSR';
    icon = `/station-icons/sa/csr.png`;
    songFolder = null;
}

export class KDst extends Station {
    name = 'K-DST';
    icon = `/station-icons/sa/k_dst.png`;
    songFolder = null;
}

export class KJah extends Station {
    name = 'K-Jah';
    icon = `/station-icons/sa/k_jah_west.png`;
    songFolder = null;
}

export class KRose extends Station {
    name = 'K-Rose';
    icon = `/station-icons/sa/k_rose.png`;
    songFolder = null;
}

export class MasterSounds extends Station {
    name = 'Master Sounds';
    icon = `/station-icons/sa/master_sounds.png`;
    songFolder = null;
}

export class PlaybackFM extends Station {
    name = 'Playback FM';
    icon = `/station-icons/sa/playback_fm.png`;
    songFolder = null;
}

export class RadioX extends Station {
    name = 'Radio X';
    icon = `/station-icons/sa/radio_x.png`;
    songFolder = null;
}

export class SFUR extends Station {
    name = 'SFUR';
    icon = `/station-icons/sa/sfur.png`;
    songFolder = null;
}

export class RadioLosSantos extends Station {
    name = 'Radio Los Santos';
    icon = `/station-icons/sa/radio_los_santos.png`;
    songFolder = null;
}

export class WCTR extends Station {
    name = 'WCTR';
    icon = `/station-icons/sa/wctr.png`;
    songFolder = null;
}

export function getStations(): Station[] {
    if (!stations) {
        stations = [
            new BounceFM(),
            new CSR(),
            new KDst(),
            new KJah(),
            new KRose(),
            new MasterSounds(),
            new PlaybackFM(),
            new RadioX(),
            new SFUR(),
            new RadioLosSantos(),
            new WCTR()
        ];
    }

    return stations;
}

export function getStationByName(name: string): Station|null {
    return getStations().find(station => station.name.toLowerCase() === name.toLowerCase()) ?? null;
}
