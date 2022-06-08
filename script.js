const container = document.querySelector('.container');
const cl_header_final = document.getElementById('cl_final_header');
const home_team_element = document.getElementById('home_team');
const away_team_element = document.getElementById('away_team');
const home_score_element = document.getElementById('home_score');
const away_score_element = document.getElementById('away_score');

const home_team_lineup_table = document.getElementById('home_team_lineup');
const away_team_lineup_table = document.getElementById('away_team_lineup');


// Imported functions

import {extract_season_ids, extract_tactical_setups, extract_lineups, extract_goal_events, generate_lineup_table} from './functions.js'

// API endpoints

const champions_league_id = 16;
const competitions_url = 'https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json'

async function getData() {

    // Make competition data get request

    const competitions_response = await fetch(competitions_url);
    const competitions_data = await competitions_response.json();
    
    // Generate a random season id

    const random_season_id = extract_season_ids(competitions_data);
    
    // Generate Match id - Using champions_league_id + random_season_id

    const match_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/${champions_league_id}/${random_season_id}.json`
    const match_response = await fetch(match_url);
    const match_object = await match_response.json();

    // Extract match metadata from match object

    const match_id = match_object[0]['match_id'];
    let match_date = match_object[0]['match_date'];
    match_date = match_date.slice(0,4)
    const home_team = match_object[0]['home_team']['home_team_name'];
    const away_team = match_object[0]['away_team']['away_team_name'];
    const home_score = match_object[0]['home_score'];
    const away_score = match_object[0]['away_score'];

    console.log(match_id, match_date, home_team, away_team, home_score, away_score);
    

    // Generate Formations Using Match ID

    const event_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match_id}.json`
    const event_response = await fetch(event_url);
    const event_object = await event_response.json();

    const [home_team_formation, away_team_formation] = extract_tactical_setups(event_object);

    console.log(home_team_formation);
    console.log(away_team_formation);


    // Generate Lineups Using Match ID

    const lineup_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/lineups/${match_id}.json`
    const lineup_response = await fetch(lineup_url);
    const lineup_object = await lineup_response.json();

    console.log(lineup_object);

    const [home_team_lineup, away_team_lineup] = extract_lineups(lineup_object);

    console.log(home_team_lineup);
    console.log(away_team_lineup);
    
    // Generate Goal Events

    const [home_team_goal_events, away_team_goal_events] = extract_goal_events(event_object, home_team);
    
    console.log(home_team_goal_events);
    console.log(away_team_goal_events);
    
    // Appending text to the DOM

    cl_header_final.textContent += match_date;

    home_team_element.textContent += home_team;    
    away_team_element.textContent += away_team;    
    home_score_element.textContent += home_score;    
    away_score_element.textContent += away_score;    
   
    const home_team_table = generate_lineup_table(home_team_lineup);
    home_team_lineup_table.innerHTML = home_team_table;

    const away_team_table = generate_lineup_table(away_team_lineup);
    away_team_lineup_table.innerHTML = away_team_table;

    }

    https://stackoverflow.com/questions/44590393/es6-modules-undefined-onclick-function-after-import

    window.getData = getData; // modules are module scoped and not accessible to the window object

    // getData();

