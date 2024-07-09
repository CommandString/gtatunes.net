import {Station, Song, audioFileLocation} from "../Station";

const key = 'master_sounds';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'Master Sounds';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Cross the Tracks (We Better Go Back)', ['Maceo', 'The Macks'], 1974, file('cross_the_tracks')),
        new Song('Express Yourself', ['Charles Wright', 'The Watts 103rd Street Rhythm Band'], 1970, file('express_yourself')),
        new Song('Funky President', ['James Brown'], 1974, file('funky_president')),
        new Song('Green Onions', ['Booker T.', "The MG's"], 1962, file('green_onions')),
        new Song("Grunt", ["The J.B.'s"], 1970, file('grunt')),
        new Song('Hot Pants', ['Bobby Byrd'], 1971, file('hot_pants')),
        new Song('I Know You Got Soul', ['Bobby Byrd'], 1971, file('i_know_you_got_soul')),
        new Song('Jungle Fever', ['The Chakachas'], 1972, file('jungle_fever')),
        new Song('Low Rider', ['War'], 1975, file('low_rider')),
        new Song("Nautilus", ['Bob James'], 1974, file('nautilus')),
        new Song('Rock Creek Park', ['The Blackbyrds'], 1975, file('rock_creek_park')),
        new Song('Rock Me Again', ['Lyn Collins'], 1974, file('rock_me_again_and_again')),
        new Song("Smokin' Cheeba Cheeba", ['The Harlem Underground Band'], 1976, file('smokin_cheeba_cheeba')),
        new Song("Soul Power '74", ['Maceo', 'The Macks'], 1973, file('soul_power_74')),
        new Song('Tainted Love', ['Gloria Jones'], 1965, file('tainted_love')),
        new Song('The Payback', ['James Brown'], 1973, file('the_payback')),
        new Song('Think About It', ['Lyn Collins'], 1972, file('think_about_it')),
    ]
}
