import {Station, Song, audioFileLocation} from "../Station";

const key = 'radio_x';
const file = (name: string) => audioFileLocation('sa', key, name);

export default class extends Station {
    name = 'Radio X';
    key = key;
    icon = `/station-icons/sa/${this.key}.png`;
    songs = [
        new Song('Been Caught Stealing', ["Jane's Addiction"], 1990, file('been_caught_stealing')),
        new Song('Cult of Personality', ['Living Colour'], 1988, file('cult_of_personality')),
        new Song('Fools Gold', ['The Stone Roses'], 1989, file('fools_gold')),
        new Song('Hellraiser', ['Ozzy Osbourne'], 1991, file('hellraiser')),
        new Song('Killing in the Name', ['Rage Against the Machine'], 1992, file('killing_in_the_name')),
        new Song('Midlife Crisis', ['Faith No More'], 1992, file('midlife_crisis')),
        new Song('Mother', ['Danzig'], 1988, file('mother')),
        new Song("Movin' On Up", ['Primal Scream'], 1991, file('movin_on_up')),
        new Song('Personal Jesus', ['Depeche Mode'], 1989, file('personal_jesus')),
        new Song('Plus Dedans', ['Mylène Farmer'], 1991, file('plus_dedans')),
        new Song("Pretend We're Dead", ['L7'], 1992, file('pretend_were_dead')),
        new Song('Rusty Cage', ['Soundgarden'], 1991, file('rusty_cage')),
        new Song('Them Bones', ['Alice in Chains'], 1992, file('them_bones')),
        new Song('Unsung', ['Helmet'], 1992, file('unsung')),
        new Song('Welcome to the Jungle', ["Guns N' Roses"], 1987, file('welcome_to_the_jungle'))
    ]
}
