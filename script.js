const container = document.querySelector('.container');

// Imported functions

import {extract_season_ids, extract_tactical_setups, extract_goal_events} from './functions.js'

// API endpoints

const champions_league_id = 16;
const competitions_url = 'https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json'

async function getData() {

    // Make competition data get request

    const competitions_response = await fetch(competitions_url);
    const competitions_data = await competitions_response.json();
    console.log(competitions_data);
    
    // Generate a random season id

    const random_season_id = extract_season_ids(competitions_data);
    
    // Generate Match id - Using champions_league_id + random_season_id

    const match_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/${champions_league_id}/${random_season_id}.json`
    const match_response = await fetch(match_url);
    const match_object = await match_response.json();

    // Extract match metadata from match object

    const match_id = match_object[0]['match_id'];
    const match_date = match_object[0]['match_date'];
    const home_team = match_object[0]['home_team']['home_team_name'];
    const away_team = match_object[0]['away_team']['away_team_name'];
    const home_score = match_object[0]['home_score'];
    const away_score = match_object[0]['away_score'];

    console.log(match_date, home_team, away_team, home_score, away_score);
    

    // Generate Event information - Using Match ID

    const event_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match_id}.json`
    const event_response = await fetch(event_url);
    const event_object = await event_response.json();

    const [home_team_formation, away_team_formation, home_team_lineup_extracted, away_team_lineup_extracted] = extract_tactical_setups(event_object);

    console.log(home_team_formation);
    console.log(away_team_formation);
    console.log(home_team_lineup_extracted);
    console.log(away_team_lineup_extracted);

    const [home_team_goal_events, away_team_goal_events] = extract_goal_events(event_object, home_team);
    
    console.log(home_team_goal_events);
    console.log(away_team_goal_events);
    
    container.textContent = home_team_lineup_extracted

    }

    https://stackoverflow.com/questions/44590393/es6-modules-undefined-onclick-function-after-import

    window.getData = getData; // modules are module scoped and not accessible


