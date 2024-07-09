import {Station, Song, audioFileLocation} from "../Station";

const key = 'csr';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'CSR 103.9';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('I\'m So Into You', ['SWV'], 1992, file('im_so_into_you')),
        new Song('Keep On Movin', ['Soul II Soul'], 1989, file('keep_on_movin')),
        new Song('So You Like What You See', ['Samuelle'], 1990, file('so_you_like_what_you_see')),
        new Song('Rub You The Right Way', ['Johnny Gill'], 1990, file('rub_you_the_right_way')),
        new Song('Sensitivity', ['Ralph Tresvant'], 1990, file('sensitivity')),
        new Song('Groove Me', ['Guy'], 1988, file('groove_me')),
        new Song('Don\'t Be Afraid', ['Aaron Hall'], 1992, file('dont_be_afraid')),
        new Song('Motownphilly', ['Boyz II Men'], 1991, file('motownphilly')),
        new Song('Poison', ['Bell Biv DeVoe'], 1990, file('poison')),
        new Song('I Got the Feeling', ['Today'], 1990, file('i_got_the_feeling')),
        new Song('New Jack Swing', ['Wrecks-N-Effect'], 1989, file('new_jack_swing')),
        new Song('Don\'t Be Cruel', ['Bobby Brown'], 1988, file('dont_be_cruel')),
        new Song('My Lovin\' (You\'re Never Gonna Get It)', ['En Vogue'], 1992, file('my_lovin_never_gonna_get_it')),
    ]
}
