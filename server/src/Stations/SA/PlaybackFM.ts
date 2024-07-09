import {Station, Song, audioFileLocation} from "../Station";

const key = 'playback_fm';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'Playback FM';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Road To The Riches', ['Kool G Rap', 'DJ Polo'], 1989, file('road_to_the_riches')),
        new Song('Warm It Up, Kane', ['Big Daddy Kane'], 1989, file('warm_it_up_kane')),
        new Song('The Godfather', ['Spoonie Gee'], 1987, file('the_godfather')),
        new Song('Me and the Biz', ['Masta Ace'], 1990, file('me_and_the_biz')),
        new Song('Children\'s Story', ['Slick Rick'], 1988, file('childrens_story')),
        new Song('Rebel Without A Pause', ['Public Enemy'], 1987, file('rebel_without_a_pause')),
        new Song('I Know You Got Soul', ['Eric B. & Rakim'], 1987, file('i_know_you_got_soul')),
        new Song('It Takes Two', ['Rob Base', 'DJ E-Z Rock'], 1988, file('it_takes_two')),
        new Song('B.Y.S.', ['Gang Starr'], 1989, file('bys')),
        new Song('Vapors', ['Biz Markie'], 1988, file('vapors')),
        new Song('Brand Nubian', ['Brand Nubian'], 1990, file('brand_nubian')),
        new Song('Critical Beatdown', ['Ultramagnetic MC\'s'], 1988, file('critical_beatdown'))
    ]
}
