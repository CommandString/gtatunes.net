import {Station, Song, audioFileLocation} from "../Station";

const key = 'sfur';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'SFUR';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Break 4 Love', ['Raze'], 1988, file('break_4_love')),
        new Song('Can You Feel It?', ['Mr. Fingers'], 1986, file('can_you_feel_it')),
        new Song('I Need A Rhythm', ['The 28th Street Crew'], 1989, file('i_need_a_rhythm')),
        new Song("I'll Be Your Friend", ['Robert Owens'], 1991, file('ill_be_your_friend')),
        new Song('Let The Music Use You', ['The Nightwriters'], 1987, file('let_the_music_use_you')),
        new Song('Ma Foom Bey', ['Cultural Vibe'], 1986, file('ma_foom_bey')),
        new Song('Make My Body Rock', ['Jomanda'], 1988, file('make_my_body_rock')),
        new Song('Move Your Body', ['Marshall Jefferson'], 1986, file('move_your_body')),
        new Song('Pacific 202', ['808 State'], 1988, file('pacific_202')),
        new Song('Promised Land', ['Joe Smooth'], 1987, file('promised_land')),
        new Song('Someday', ['CeCe Rogers'], 1991, file('somebody')),
        new Song('The Morning After (Sunrise Mix)', ['Fallout'], 1991, file('the_morning_after')),
        new Song('This Is Acid', ['Maurice'], 1989, file('this_is_acid')),
        new Song('Voodoo Ray', ['A Guy Called Gerald'], 1988, file('voodoo_ray')),
        new Song('Weekend', ['Todd Terry Project'], 1988, file('weekend')),
        new Song('Your Love', ['Frankie Knuckles'], 1986, file('your_love'))
    ]
}
