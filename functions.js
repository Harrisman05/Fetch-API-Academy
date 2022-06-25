function sort_lineup(lineup_array) {

    let ranked_lineup = [];

    for (const nested_array of lineup_array) {

        switch (nested_array[1]) {
            case "GK":
                nested_array.push({
                    position_rank: 1
                });
                ranked_lineup.push(nested_array);
                break;
            case "RB":
                nested_array.push({
                    position_rank: 2
                });
                ranked_lineup.push(nested_array);
                break;
            case "RWB":
                nested_array.push({
                    position_rank: 3
                });
                ranked_lineup.push(nested_array);
                break;
            case "RCB":
                nested_array.push({
                    position_rank: 4
                });
                ranked_lineup.push(nested_array);
                break;
            case "CB":
                nested_array.push({
                    position_rank: 5
                });
                ranked_lineup.push(nested_array);
                break;
            case "LCB":
                nested_array.push({
                    position_rank: 6
                });
                ranked_lineup.push(nested_array);
                break;
            case "LB":
                nested_array.push({
                    position_rank: 7
                });
                ranked_lineup.push(nested_array);
                break;
            case "LWB":
                nested_array.push({
                    position_rank: 8
                });
                ranked_lineup.push(nested_array);
                break;
            case "RM":
                nested_array.push({
                    position_rank: 9
                });
                ranked_lineup.push(nested_array);
                break;
            case "RCM":
                nested_array.push({
                    position_rank: 10
                });
                ranked_lineup.push(nested_array);
                break;
            case "RDM":
                nested_array.push({
                    position_rank: 11
                });
                ranked_lineup.push(nested_array);
                break;
            case "CM":
                nested_array.push({
                    position_rank: 12
                });
                ranked_lineup.push(nested_array);
                break;
            case "CDM":
                nested_array.push({
                    position_rank: 12
                });
                ranked_lineup.push(nested_array);
                break;
            case "LCM":
                nested_array.push({
                    position_rank: 13
                });
                ranked_lineup.push(nested_array);
                break;
            case "LDM":
                nested_array.push({
                    position_rank: 14
                });
                ranked_lineup.push(nested_array);
                break;
            case "LM":
                nested_array.push({
                    position_rank: 15
                });
                ranked_lineup.push(nested_array);
                break;
            case "RAM":
                nested_array.push({
                    position_rank: 16
                });
                ranked_lineup.push(nested_array);
                break;
            case "CAM":
                nested_array.push({
                    position_rank: 17
                });
                ranked_lineup.push(nested_array);
                break;
            case "LAM":
                nested_array.push({
                    position_rank: 18
                });
                ranked_lineup.push(nested_array);
                break;
            case "RW":
                nested_array.push({
                    position_rank: 19
                });
                ranked_lineup.push(nested_array);
                break;
            case "RCF":
                nested_array.push({
                    position_rank: 20
                });
                ranked_lineup.push(nested_array);
                break;
            case "SS":
                nested_array.push({
                    position_rank: 21
                });
                ranked_lineup.push(nested_array);
                break;
            case "CF":
                nested_array.push({
                    position_rank: 22
                });
                ranked_lineup.push(nested_array);
                break;
            case "ST":
                nested_array.push({
                    position_rank: 23
                });
                ranked_lineup.push(nested_array);
                break;
            case "LCF":
                nested_array.push({
                    position_rank: 24
                });
                ranked_lineup.push(nested_array);
                break;
            case "LW":
                nested_array.push({
                    position_rank: 25
                });
                ranked_lineup.push(nested_array);
                break;

        }

    }

    const sorted_lineup = ranked_lineup.sort((a, b) => {
        return a[3].position_rank - b[3].position_rank;
    });

    const original_sorted_lineup = sorted_lineup.map((element) => {
        element.pop();
        return element;
    })

    return original_sorted_lineup;
}

// Season ID

export function extract_season_ids(competitions_data) {

    let season_ids = [];
    let competition_ids = [];

    let comp_and_season_map = new Map();

    for (const competition_object of competitions_data) {

        competition_ids.push(competition_object['competition_id']);

        if (!comp_and_season_map.has(competition_object['competition_id'])) {
            comp_and_season_map.set(competition_object['competition_id'], []);
        }

        if (comp_and_season_map.has(competition_object['competition_id'])) {
            comp_and_season_map.get(competition_object['competition_id']).push(competition_object['season_id']);
        }

        season_ids.push([competition_object['competition_id'], competition_object['season_id']]);
    }

    competition_ids = Array.from(new Set(competition_ids));

    const random_competition_index = Math.floor(Math.random() * competition_ids.length);
    let random_competition_id = competition_ids[random_competition_index];

    const random_season_id_array = comp_and_season_map.get(random_competition_id);
    const random_season_index = Math.floor(Math.random() * random_season_id_array.length);
    let random_season_id = random_season_id_array[random_season_index];

    console.log(`Comp id - ${random_competition_id}, Season id - ${random_season_id}`);


    // random_competition_id = 2;
    // random_season_id = 44;

    return [random_competition_id, random_season_id];
}

export function generate_random_match_id(match_object_array) {

    const random_match_id_index = Math.floor(Math.random() * match_object_array.length);
    console.log(`Random match index - ${random_match_id_index}`);

    let random_match_object = match_object_array[random_match_id_index];
    random_match_object = match_object_array[random_match_id_index];

    // random_match_object = match_object_array[29];

    return random_match_object;

}

export function extract_tactical_setups(event_object) {

    const [home_team_tactical_data, away_team_tactical_data] = [event_object[0], event_object[1]];
    const [home_team_formation, away_team_formation] = [home_team_tactical_data['tactics']['formation'], away_team_tactical_data['tactics']['formation']];

    return [home_team_formation, away_team_formation];

}

export function extract_lineups(lineup_object, home_team, away_team) {

    let home_team_lineup_object = '';
    let away_team_lineup_object = '';

    for (let i = 0; i < lineup_object.length; i++) {
        if (lineup_object[i]["team_name"] === home_team) {
            home_team_lineup_object = lineup_object[i]['lineup'];
        } else if ((lineup_object[i]["team_name"] === away_team)) {
            away_team_lineup_object = lineup_object[i]['lineup'];
        }
    }

    // console.log(lineup_object);
    // console.log(home_team_lineup_object);

    function generate_lineups(lineup_object) {

        const extracted_lineup = [];

        for (const data of lineup_object) {

            if (data['positions'].length !== 0 && data['positions'][0]['start_reason'] === "Starting XI") {

                let player_name;
                let player_number;

                if (data['player_nickname'] !== null) {
                    player_name = data['player_nickname'];
                } else {
                    player_name = data['player_name']
                }

                if (data['jersey_number'] === 0) {
                    player_number = "?"
                } else {
                    player_number = data['jersey_number'].toString();
                }

                const player_position = data['positions'][0]['position'];
                const player_position_split = player_position.split(" ");
                let player_position_initials = '';

                for (const word of player_position_split) {
                    if (word === "Goalkeeper") {
                        player_position_initials += 'GK';
                    } else {
                        player_position_initials += word[0];
                    }
                }
                extracted_lineup.push([player_number, player_position_initials, player_name]);
            }
        }
        const sorted_lineup = sort_lineup(extracted_lineup);
        // console.log(sorted_lineup);

        return sorted_lineup;
    }

    const home_team_lineup_extracted = generate_lineups(home_team_lineup_object);
    const away_team_lineup_extracted = generate_lineups(away_team_lineup_object);

    return [home_team_lineup_extracted, away_team_lineup_extracted];
}

export function extract_goal_events(event_object, home_team) {

    const home_goal_events = [];
    const away_goal_events = [];

    const home_goal_locations = [];
    const away_goal_locations = [];


    for (const event of event_object) {

        if (event['type']['name'] === 'Shot' && event['shot']['outcome']['name'] === 'Goal' && event['period'] !== 5) {

            const timestamp = event['minute'].toString() + ':' + event['second'].toString();
            const goalscorer = event['player']['name'];

            const goal_event = goalscorer + ' - ' + timestamp;

            const goal_start_location = event["location"];

            let goal_end_location = event["shot"]["end_location"];
            goal_end_location.pop();
            const goal_location_object = {}

            goal_location_object.goalscorer = goalscorer;
            goal_location_object.goal_start_location = goal_start_location;
            goal_location_object.goal_end_location = goal_end_location;
            goal_location_object.own_goal_check = false;


            if (event['possession_team']['name'] === home_team) { // determine if goalscorer is from home or away team
                home_goal_events.push(goal_event);
                home_goal_locations.push(goal_location_object);
            } else {
                away_goal_events.push(goal_event);
                away_goal_locations.push(goal_location_object);
            }

        } else if (event["type"]["name"] === "Own Goal For") { // accounting for own goal

            console.log("found own goal");
            console.log(event);

            const timestamp = event['minute'].toString() + ':' + event['second'].toString();

            const own_goal_location_object = {};

            own_goal_location_object.own_goal_check = true;

            if (event.location !== undefined) {
                own_goal_location_object.goal_start_location = event.location;
               
                if (own_goal_location_object.goal_start_location[0] < 60) {
                    own_goal_location_object.goal_end_location = [0,40] 
                } else {
                    own_goal_location_object.goal_end_location = [120,40] 
                }
            }
            
            const goals_against_event_id = event.related_events[0];
            console.log(event.related_events);

            for (const goals_against_event of event_object) { // messy, but using related id as foreign key to access name data for own goals

                if (goals_against_event_id === goals_against_event.id) {
                  
                    if (goals_against_event.location !== undefined) {
                        own_goal_location_object.goal_start_location = goals_against_event.location;

                        if (own_goal_location_object.goal_start_location[0]) {
                            own_goal_location_object.goal_end_location = [0,40] 
                        } else {
                            own_goal_location_object.goal_end_location = [120,40] 
                        }
                       
                    }

                    console.log(goals_against_event);

                    console.log(goals_against_event['player']['name']);

                    own_goal_location_object.goalscorer = goals_against_event['player']['name'];
                    
                }
                
            }

            const own_goal_event = own_goal_location_object.goalscorer + ' - ' + timestamp;

            if (event['possession_team']['name'] === home_team) { // determine if goalscorer is from home or away team
                home_goal_events.push(own_goal_event);
                home_goal_locations.push(own_goal_location_object);
            } else {
                away_goal_events.push(own_goal_event);
                away_goal_locations.push(own_goal_location_object);
            }

        } 
    }
    return [home_goal_events, away_goal_events, home_goal_locations, away_goal_locations];
}

export function generate_lineup_table(lineup_array) {

    let lineup_table = ''
    for (let nested_array of lineup_array) {
        const lineup_row = `<tr><td>${nested_array[0]}</td><td>${nested_array[1]}</td><td>${nested_array[2]}</td></tr>`;
        lineup_table += lineup_row;
    }
    return lineup_table;
}

export function populate_empty_pitch(team, lineup_array) {

    function extract_last_names(lineup_array) {

        const last_name_prefixes = ["at", "Aït", "al", "Al", "ben", "Ben", "bin", "Bin", "ibn", "Ibn", "da", "Da", "das", "Das", "de", "De", "degli", "Degli", "del", "Del", "dele", "Dele", "della", "Della", "der", "Der", "di", "Di", "dos", "Dos", "du", "Du", "el", "El", "ter", "Ter", "van", "Van", "von", "Von"];

        const last_name_array = lineup_array.map((element) => {

            const trimmed_names = element[2].trim();
            const split_names = trimmed_names.split(" ");

            if (split_names.length > 1) {

                for (const word of split_names) {
                    for (const prefix of last_name_prefixes) {
                        if (word === prefix) {
                            const prefix_index = split_names.indexOf(prefix);
                            const prefix_second_name = split_names.slice(prefix_index).join(" ");
                            return prefix_second_name;
                        }
                    }
                }
                return split_names.at(-1);

            } else {
                return split_names[0];
            }
        });

        return last_name_array;
    }

    const last_name_array = extract_last_names(lineup_array);

    for (let i = 1; i < last_name_array.length + 1; i++) {
        const position_circle = document.querySelector(`#pos${i}_${team}`);
        position_circle.textContent = lineup_array[i - 1][0];

        const player_span = document.querySelector(`#span${i}_${team}`);
        player_span.textContent = last_name_array[i - 1];

        if (last_name_array[i - 1].length > 14) {
            player_span.style.fontSize = "11px";
        } else if (last_name_array[i - 1].length > 10) {
            player_span.style.fontSize = "13px";
        }
    }
}

export function calculate_positions(team, lineup_array, formation) {


    for (let i = 1; i < lineup_array.length + 1; i++) {

        let iterated_position = document.getElementById(`container${i}_${team}`);

        // default positions are for HOME TEAM
        let [vertical_position, left_side, right_side, transform_percentage] = ["bottom", "left", "right", "-50%"];

        if (team === "away") {
            vertical_position = "top";
            left_side = "right";
            right_side = "left";
            transform_percentage = "50%";
        }

        let position = lineup_array[i - 1][1];

        switch (position) {
            case "GK":
                iterated_position.style[vertical_position] = "2.6%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "RB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[right_side] = "7.85%";
                break;
            case "RWB":
                iterated_position.style[vertical_position] = "17.2828125%";
                iterated_position.style[right_side] = "7.85%";
                break;
            case "RCB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[right_side] = "31%";
                break;
            case "CB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "LCB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[left_side] = "31%";
                break;
            case "LB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[left_side] = "7.85%";
                break;
            case "LWB":
                iterated_position.style[vertical_position] = "17.2828125%";
                iterated_position.style[left_side] = "7.85%";
                break;
            case "RM":
                iterated_position.style[vertical_position] = "25.275%";
                iterated_position.style[right_side] = "7.85%";
                break;
            case "RCM":
                iterated_position.style[vertical_position] = "25.275%";
                iterated_position.style[right_side] = "25.2125%";
                break;
            case "RDM":
                iterated_position.style[vertical_position] = "22.065625%";
                iterated_position.style[right_side] = "25.2125%"
                break;
            case "CM":
                iterated_position.style[vertical_position] = "25.275%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "CDM":
                iterated_position.style[vertical_position] = "22.065625%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "LCM":
                iterated_position.style[vertical_position] = "25.275%";
                iterated_position.style[left_side] = "25.2125%";
                break;
            case "LDM":
                iterated_position.style[vertical_position] = "22.065625%";
                iterated_position.style[left_side] = "25.2125%"
                break;
            case "LM":
                iterated_position.style[vertical_position] = "25.275%";
                iterated_position.style[left_side] = "7.85%";
                break;
            case "RAM":
                iterated_position.style[vertical_position] = "33.4875%";
                iterated_position.style[right_side] = "31%";
                break;
            case "CAM":
                iterated_position.style[vertical_position] = "31.6625%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "LAM":
                iterated_position.style[vertical_position] = "33.4875%";
                iterated_position.style[left_side] = "31%";
                break;
            case "RW":
                iterated_position.style[vertical_position] = "38.05%";
                iterated_position.style[right_side] = "13.6375%";
                break;
            case "RCF":
                iterated_position.style[vertical_position] = "41.7%";
                iterated_position.style[right_side] = "31%";
                break;
            case "SS":
                iterated_position.style[vertical_position] = "31.6625%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "CF":
                iterated_position.style[vertical_position] = "41.7%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "ST":

                break;
            case "LCF":
                iterated_position.style[vertical_position] = "41.7%";
                iterated_position.style[left_side] = "31%";
                break;
            case "LW":
                iterated_position.style[vertical_position] = "38.05%";
                iterated_position.style[left_side] = "13.6375%";
                break;
        }

        // special changes for rarer formations

        if (formation === 442) {

            if (position === "RCM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "RDM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "LCM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "LDM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "RCF") {
                iterated_position.style[vertical_position] = "36.4875%";
            } else if (position === "LCF") {
                iterated_position.style[vertical_position] = "36.4875%";
            }

        } else if (formation === 4141) {
            if (position === "CF") {
                iterated_position.style[vertical_position] = "36.6625%";
            }

        } else if (formation === 4411) {
            if (position === "RCM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "RDM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "LCM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "LDM") {
                iterated_position.style[left_side] = "31%";
            }

        } else if (formation === 451) {
            if (position === "CF") {
                iterated_position.style[vertical_position] = "41.75%";
            }
        } else if (formation === 352) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            } else if (position === "RCM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "RDM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "LCM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "LDM") {
                iterated_position.style[left_side] = "31%";
            }

        } else if (formation === 3421) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            } else if (position === "RCM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "RDM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "LCM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "LDM") {
                iterated_position.style[left_side] = "31%";
            }

        } else if (formation === 3412) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            }

        } else if (formation === 343) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            }
        } else if (formation === 3142) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            }
        } else if (formation === 541) {
            if (position === "LCB") {
                iterated_position.style[left_side] = "25.2125%";
            } else if (position === "RCB") {
                iterated_position.style[right_side] = "25.2125%";
            }
        }
    }
}

export function fit_canvas_to_pitch(canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

export function center_canvas_img(image, x_coord, y_coord) {

    const off_center_x_coord = x_coord;
    const off_center_y_coord = y_coord;

    const image_width = image.width;
    const image_height = image.height;

    const centered_x = (off_center_x_coord) - (image_width / 2);
    const centered_y = (off_center_y_coord) - (image_height / 2);

    return [centered_x, centered_y];

}

function transform_coordinates(football_png, coordinates, canvas_width, canvas_height, team) {

    const swapped_coords = coordinates.reverse(); // reversed as statsbomb x and y access are in reverse order

    console.log(swapped_coords);
    

    if (team === "home") {
        swapped_coords[0] = 80 - swapped_coords[0];
        swapped_coords[1] = 120 - swapped_coords[1];
    }

    const coords_scale_factor = [swapped_coords[0] / 80, swapped_coords[1] / 120];

    const scaled_coords = [canvas_width * coords_scale_factor[0], canvas_height * coords_scale_factor[1]];

    let [centered_x_coord, centered_y_coord] = center_canvas_img(football_png, scaled_coords[0], scaled_coords[1]);

    return [centered_x_coord, centered_y_coord];

}

export function generate_scaled_goal_event(football_png, canvas_width, canvas_height, start_coordinates, end_coordinates, team) {

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    const [start_x_coord, start_y_coord] = transform_coordinates(football_png, start_coordinates, canvas_width, canvas_height, team);
    const [end_x_coord, end_y_coord] = transform_coordinates(football_png, end_coordinates, canvas_width, canvas_height, team);

    context.drawImage(football_png, start_x_coord, start_y_coord);

    context.beginPath();
    context.setLineDash([3, 3]);
    context.moveTo(start_x_coord + football_png.width / 2, start_y_coord + football_png.height / 2);
    context.lineTo(end_x_coord + football_png.width / 2, end_y_coord + football_png.height / 2);
    context.stroke();

}