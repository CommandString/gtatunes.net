import {Station, Song, audioFileLocation} from "../Station";

const key = 'radio_los_santos';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'Radio Los Santos';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song("Alwayz into Somethin'", ['N.W.A.'], 1991, file('alwayz_into_somethin')),
        new Song('Check Yo Self (The Message Remix)', ['Ice Cube'], 1993, file('check_yo_self')),
        new Song('Deep Cover', ['Dr. Dre', 'Snoop Dogg'], 1992, file('deep_cover')),
        new Song('Eazy-Er Said Than Dunn', ['Eazy-E'], 1988, file('eazyer_said_than_dunn')),
        new Song('Express Yourself', ['N.W.A.'], 1988, file('express_yourself')),
        new Song('Fuck wit Dre Day', ['Dr. Dre', 'Snoop Dogg'], 1992, file('fuck_wit_dre_day')),
        new Song('Guerillas in tha Mist', ['Da Lench Mob'], 1992, file('guerillas_in_tha_mist')),
        new Song('Hood Took Me Under', ["Compton's Most Wanted"], 1992, file('hood_took_me_under')),
        new Song('How I Could Just Kill a Man', ['Cypress Hill'], 1991, file('how_i_could_just_kill_a_man')),
        new Song("I Don't Give a Fuck", ['2Pac'], 1991, file('i_dont_give_a_fuck')),
        new Song('It Was a Good Day', ['Ice Cube'], 1992, file('it_was_a_good_day')),
        new Song("It's Funky Enough", ['The D.O.C.'], 1989, file('its_funky_enough')),
        new Song('La Raza', ['Kid Frost'], 1990, file('la_raza')),
        new Song('Murder Rap', ['Above the Law'], 1990, file('murder_rap')),
        new Song("Nuthin' but a 'G' Thang", ['Dr. Dre', 'Snoop Dogg'], 1992, file('nuthin_but_a_g_thang')),
        new Song('The Ghetto', ['Too $hort'], 1990, file('the_ghetto'))
    ]
}
