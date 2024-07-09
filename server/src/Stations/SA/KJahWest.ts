import {Station, Song, audioFileLocation} from "../Station";

const key = 'k_jah_west';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'K-Jah West';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Armagideon Time', ['Willi Williams'], 1992, file('armagideon_time')),
        new Song('Bam Bam', ['Sister Nancy'], 1982, file('bam_bam')),
        new Song('Batty Rider', ['Buju Banton'], 1992, file('batty_rider')),
        new Song('Chase The Devil', ['Max Romeo', 'The Upsetters'], 1976, file('chase_the_devil')),
        new Song('Cokane In My Brain', ['Dillinger'], 1976, file('cokane_in_my_brain')),
        new Song("Don't Let It Go To Your Head", ['Black Harmony'], 1979, file('dont_let_it_go_to_your_head')),
        new Song('Drum Pan Sound', ['Reggie Stepper'], 1988, file('drum_pan_sound')),
        new Song('Funky Kingston', ['Toots', 'The Maytals'], 1972, file('funky_kingston')),
        new Song('Great Train Robbery', ['Black Uhuru'], 1986, file('great_train_robbery')),
        new Song('Here I Come', ['Barrington Levy'], 1985, file('here_i_come')),
        new Song('King Tubby Meets Rockers Uptown', ['Augustus Pablo'], 1974, file('king_tubby_meets_rockers_uptown')),
        new Song('Pressure Drop', ['Toots', 'The Maytals'], 1969, file('pressure_drop')),
        new Song('I Chase the Devil', ['Max Romeo'], 1976, file('i_chase_the_devil')),
        new Song('Revolution', ['Dennis Brown'], 1985, file('revolution')),
        new Song('Ring My Bell', ['Blood Sisters'], 1979, file('ring_my_bell')),
        new Song('Sidewalk Killer', ['I-Roy'], 1972, file('sidewalk_killer')),
        new Song('Wicked Inna Bed', ['Shabba Ranks'], 1989, file('wicked_inna_bed')),
    ]
}
