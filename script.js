const container = document.querySelector('.container');
const cl_header_final = document.getElementById('cl_final_header');
const home_team_element = document.getElementById('home_team');
const away_team_element = document.getElementById('away_team');
const home_score_element = document.getElementById('home_score');
const away_score_element = document.getElementById('away_score');

const home_team_lineup_table = document.getElementById('home_team_lineup');
const away_team_lineup_table = document.getElementById('away_team_lineup');


// Imported functions

import {
    extract_season_ids,
    generate_random_match_id,
    extract_tactical_setups,
    extract_lineups,
    extract_goal_events,
    generate_lineup_table,
    populate_empty_pitch,
    calculate_positions,
    fit_canvas_to_pitch,
    center_canvas_img,
    generate_scaled_goal_event
} from './functions.js'

// API endpoints

let competition_id

async function getData() {

    // Make competition data get request
    const competitions_url = 'https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json';
    const competitions_response = await fetch(competitions_url);
    const competitions_data = await competitions_response.json();

    // Generate a random season id

    let [random_competition_id, random_season_id] = extract_season_ids(competitions_data);

    // Generate Random Match id - Using competition_id + random_season_id

    console.log(random_competition_id, random_season_id);

    const match_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/${random_competition_id}/${random_season_id}.json`
    const match_response = await fetch(match_url);
    const match_object = await match_response.json();
    const random_match_object = generate_random_match_id(match_object);
    console.log(random_match_object);


    // Extract match metadata from match object

    let match_id = random_match_object['match_id'];
    // match_id = 18240;
    let match_date = random_match_object['match_date'];
    console.log(match_date);
    match_date = match_date.slice(0, 4);
    const home_team = random_match_object['home_team']['home_team_name'];
    const away_team = random_match_object['away_team']['away_team_name'];
    const home_score = random_match_object['home_score'];
    const away_score = random_match_object['away_score'];

    console.log(match_id, match_date, home_team, away_team, home_score, away_score);


    // Generate Formations Using Match ID

    const event_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${match_id}.json`
    const event_response = await fetch(event_url);
    const event_object = await event_response.json();

    const [home_team_formation, away_team_formation] = extract_tactical_setups(event_object);

    console.log(`Home team formation - ${home_team} - ${home_team_formation}`);
    console.log(`Away team formation - ${away_team} - ${away_team_formation}`);


    // Generate Lineups Using Match ID

    const lineup_url = `https://raw.githubusercontent.com/statsbomb/open-data/master/data/lineups/${match_id}.json`
    const lineup_response = await fetch(lineup_url);
    const lineup_object = await lineup_response.json();

    const [home_team_lineup, away_team_lineup] = extract_lineups(lineup_object, home_team, away_team);

    // Generate Goal Events

    const [home_team_goal_events, away_team_goal_events] = extract_goal_events(event_object, home_team);

    // Appending text to the DOM

    home_team_element.textContent += home_team;
    away_team_element.textContent += away_team;
    home_score_element.textContent += home_score;
    away_score_element.textContent += away_score;

    const home_team_table = generate_lineup_table(home_team_lineup);
    home_team_lineup_table.innerHTML = home_team_table;

    const away_team_table = generate_lineup_table(away_team_lineup);
    away_team_lineup_table.innerHTML = away_team_table;

    // populating empty pitch

    populate_empty_pitch('home', home_team_lineup);
    populate_empty_pitch('away', away_team_lineup);

    // calculate pitch positions

    calculate_positions('home', home_team_lineup, home_team_formation);
    calculate_positions('away', away_team_lineup, away_team_formation);
}

// HTML Canvas for goal events

console.log("hello");

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
fit_canvas_to_pitch(canvas);

const canvas_width = 465.956;
const canvas_height = 622.669;

context.fillRect(0,0,30, 30);
context.fillRect(canvas_width - 30, 622.669 - 30, 30, 30); 

const football_png = new Image();
football_png.src = "assets/football.png";


// bayern vs borssuia goal events 

const mandzukic_start_coords = [117, 43];
const mandzukic_end_coords = [120, 40.5];

const robben_start_coords = [112,41];
const robben_end_coords = [120, 42.6];


const gundogan_start_coords = [108, 40];
const gundogan_end_coords = [120, 43];

    

// generate_scaled_goal_event(canvas_width, canvas_height, mandzukic_start_coords);
// generate_scaled_goal_event(canvas_width, canvas_height, mandzukic_end_coords);

// generate_scaled_goal_event(canvas_width, canvas_height, robben_start_coords);
// generate_scaled_goal_event(canvas_width, canvas_height, robben_end_coords);

generate_scaled_goal_event(canvas_width, canvas_height, gundogan_start_coords);
generate_scaled_goal_event(canvas_width, canvas_height, gundogan_end_coords);

//stackoverflow.com/questions/44590393/es6-modules-undefined-onclick-function-after-import

    window.getData = getData; // modules are module scoped and not accessible to the window object


getData();


