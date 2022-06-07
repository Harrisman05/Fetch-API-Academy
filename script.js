const container = document.querySelector('.container');

// Imported functions

import {sum} from './functions.js'
import {extract_season_ids} from './functions.js'

// API endpoints

const champions_league_id = 16;
const competitions_url = 'https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json'

async function getData() {
    const response = await fetch(competitions_url);
    const competitions_data = await response.json();
    console.log(competitions_data);
    
    // const total = sum(1,1);
    // container.textContent = total; 

    const season_ids = extract_season_ids(competitions_data);
    console.log(season_ids);
    
}

getData();


