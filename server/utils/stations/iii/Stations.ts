import { Station} from "~/server/utils/stations/iii/Station";
import path from "node:path";

const audioFile = (file: string) => path.resolve(process.cwd(), 'audio', 'iii', file);

export class Flashback extends Station {
    name = "Flashback 95.6"
    file = audioFile("FLASH.wav");
    icon = '/station-icons/iii/flashback-fm.png';

    constructor() {
        super([
            ["Rush Rush", ["Debbie Harry"], 1983, 0, 195],
            ["Shake It Up", ["Elizabeth Daily"], 1983, 244, 444],
            ["Scarface (Push It To The Limit)", ["Paul Engemann"], 1983, 526, 672],
            ["She's On Fire", ["Amy Holland"], 1983, 678, 885],
            ["I'm Hot Tonight", ["Elizabeth Daily"], 1983, 939, 1110],
        ]);
    }
}

export class HeadRadio extends Station {
    name = "Head Radio";
    file = audioFile("HEAD.wav");
    icon = '/station-icons/iii/head-radio.png';

    constructor() {
        super([
            ["Stripe Summer", ["Dil-Don't"], 2001, 13, 154],
            ["Good Thing", ["Whatever"], 2001, 199, 371],
            ["Fade Away", ["Craig Gray"], 2001, 371, 558],
            ["Change", ["Conor & Jay"], 2001, 571, 735],
            ["See Through You", ["Frankie Fame"], 2001, 784, 960],
            ["Electronic Go Go", ["Scatwerk"], 2001, 968, 1112],
            ["Life Is But A Mere Supply", ["Heavenly States"], 2001, 1174, 1312],
        ]);
    }
}

export class DoubleClefFM extends Station {
    name = 'Double Clef FM';
    file = audioFile('CLASS.wav');
    icon = '/station-icons/iii/double-clef-fm.webp';

    constructor() {
        super([
            ["Le Nozze Di Figaro", ["Mozart"], 1786, 9, 221],
            ["La Traviata", ["Giuseppe Verdi"], 1853, 418, 598],
            ["Lucia Di Lammermoor", ["Gaetano Donizetti"], 1835, 620, 835],
            ["Rigoletto", ["Giuseppe Verdi"], 1851, 965, 1159],
            ["Don Giovanni", ["Mozart"], 1787, 1172, 1233],
        ]);
    }
}

export class KJAHRadio extends Station {
    name = 'K-JAH Radio';
    file = audioFile('KJAH.wav');
    icon = '/station-icons/iii/kjah.svg';

    constructor() {
        super([
            ["Dance of the Vampires", ["Scientist"], 1981, 0, 241],
            ["Your Teeth In My Neck", ["Scientist"], 1981, 242, 518],
            ["The Corpse Rises", ["Scientist"], 1981, 520, 711],
            ["The Mummy's Shroud", ["Scientist"], 1981, 727, 991],
            ["Plague of Zombies", ["Scientist"], 1981, 992, 1143],
        ]);
    }
}

export class RiseFM extends Station {
    name = 'Rise FM';
    file = audioFile('RISE.wav');
    icon = '/station-icons/iii/rise-fm.webp';

    constructor() {
        super([
            ["Shake", ["Chris Walsh & Dave Beran"], 2001, 0, 95],
            ["Deep Time", ["Shiver"], 2001, 95, 315],
            ["InnerBattle", ["R.R.D.S"], 2001, 315, 841],
            ["Score", ["Slyder"], 2000, 841, 1256],
            ["Neo", ["Slyder"], 2000, 1256, 1568],
        ]);
    }
}

export class MSXFM extends Station {
    name = "MSX FM";
    file = audioFile('MSX.wav');
    icon = '/station-icons/iii/msx-fm.svg';
    constructor() {
        super([
            ["Quagmire", ["Calyx"], 2001, 0, 171],
            ["Get Wild", ["Rascal & Klone"], 2000, 171, 354],
            ["Judgement Day", ["Ryme Tyme"], 2000, 354, 482],
            ["Force", ["Hex"], 2000, 482, 568],
            ["First Contact", ["Omni Trio"], 2001, 568, 651],
            ["Spectre", ["Aquasky"], 2001, 651, 759],
            ["Winner Takes All", ["Rascal & Klone"], 2000, 759, 1045],
            ["T Minus", ["Ryme Tyme"], 2000, 1045, 1093],
            ["Spasm", ["nCode"], 1999, 1093, 1274],
            ["Monolith", ["D. Kay"], 2000, 1274, 1392],
            ["Iceberg", ["Dom & Ryme Tyme"], 2000, 1392, 1500],
        ]);
    }
}

export class Lips106 extends Station {
    name = "Lips 106";
    file = audioFile('LIPS.wav');
    icon = '/station-icons/iii/lips.png';

    constructor() {
        super([
            ["Bump To The Music", ["Fatamarse"], 2001, 74, 333],
            ["Feels Like I Just Can't Take No More", ["April's In Paris"], 2001, 333, 530],
            ["Forever", ["Lucy"], 2001, 530, 748],
            ["Pray It Goes Ok?", ["Boyz 2 Girlz"], 2001, 748, 938],
            ["Grand Theft Auto", ["Da Shootaz"], 1997, 938, 1041],
            ["Rubber Tip", ["Funky BJs"], 2001, 1041, 1178],
        ]);
    }
}

export class GameRadioFM extends Station {
    name = "Game Radio FM";
    file = audioFile('GAME.wav');
    icon = '/station-icons/iii/game-radio.png';

    constructor() {
        super([
            ["We're Live (Danger)", ["Royce Da 5'9\""], 2001, 0, 0],
            ["Nature Freestyle", ["Nature"], 2001, 32, 182],
            ["JoJo Pellegrino Freestyle", ["JoJo Pellegrino"], 2001, 182, 228],
            ["Spit Game", ["Royce Da 5'9\" & Pretty Ugly"], 2001, 228, 455],
            ["I'm the King", ["Royce Da 5'9\""], 1999, 455, 715],
            ["By a Stranger", ["Black Rob"], 2000, 715, 770],
            ["Rising to the Top", ["Agallah & Sean Price"], 2001, 770, 916],
        ]);
    }
}

export class ChatterboxFM extends Station {
    name = "Chatterbox FM";
    file = audioFile('CHAT.wav');
    icon = '/station-icons/iii/chatterbox.svg';

    constructor() {
        super([
            ["Roadkill Expert", ["Lazlow"], 2001, 0, 0],
            ["Woman Doubts Lazlow's Name is Real", ["Lazlow"], 2001, 0, 0],
            ["Gardener", ["Lazlow"], 2001, 0, 0],
            ["Concerned Mother", ["Lazlow"], 2001, 0, 0],
            ["Paranoid Guy", ["Lazlow"], 2001, 0, 0],
            ["Shout-Out", ["Lazlow"], 2001, 0, 0],
            ["Another Lunatic", ["Lazlow"], 2001, 0, 0],
            ["Short Guy", ["Lazlow"], 2001, 0, 0],
            ["Gun Advocate", ["Lazlow"], 2001, 0, 0],
            ["Guy Complaining About Taxes", ["Lazlow"], 2001, 0, 0],
            ["Freddy Needs a Nanny", ["Lazlow"], 2001, 0, 0],
            ["Math Freak", ["Lazlow"], 2001, 0, 0],
            ["Fernando Martinez", ["Lazlow"], 2001, 0, 0],
            ["Pest Control Guy", ["Lazlow"], 2001, 0, 0],
            ["Killer Bees", ["Lazlow"], 2001, 0, 0],
            ["C.R.A.P.", ["Lazlow"], 2001, 0, 0],
            ["International Puppetry Festival", ["Lazlow"], 2001, 0, 0],
            ["Naturist", ["Lazlow"], 2001, 0, 0],
            ["Shut Down the Schools", ["Lazlow"], 2001, 0, 0],
            ["Woman Who Loves the Internet", ["Lazlow"], 2001, 0, 0],
            ["Maria", ["Lazlow"], 2001, 0, 0],
            ["Activist", ["Lazlow"], 2001, 0, 0],
            ["Chatterbox Fan", ["Lazlow"], 2001, 0, 0],
            ["Reed Tucker (Guest)", ["Lazlow"], 2001, 0, 0],
            ["Another Paranoid Guy", ["Lazlow"], 2001, 0, 0],
            ["All-American Man", ["Lazlow"], 2001, 0, 0],
            ["Lady Complaining about Manners", ["Lazlow"], 2001, 0, 0],
            ["The Nanny Guy", ["Lazlow"], 2001, 0, 0],
            ["War Veteran", ["Lazlow"], 2001, 0, 0],
            ["Tony the Mafia Guy", ["Lazlow"], 2001, 0, 0],
        ]);
    }
}

let stations: Station[]|null = null;

export function getStations(): Station[] {
    if (!stations) {
        stations = [
            new Flashback,
            new HeadRadio,
            new DoubleClefFM,
            new KJAHRadio,
            new RiseFM,
            new MSXFM,
            new Lips106,
            new GameRadioFM,
        ];
    }

    return stations;
}
