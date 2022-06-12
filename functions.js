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

    console.log(original_sorted_lineup);

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

            season_ids.push([competition_object['competition_id'],competition_object['season_id']]);
    }  

    competition_ids = Array.from(new Set(competition_ids));
    
    const random_competition_index = Math.floor(Math.random() * competition_ids.length);
    const random_competition_id = competition_ids[random_competition_index];

    const random_season_id_array = comp_and_season_map.get(random_competition_id);
    const random_season_index = Math.floor(Math.random() * random_season_id_array.length);
    const random_season_id = random_season_id_array[random_season_index];

    return [random_competition_id, random_season_id];
}
export function extract_tactical_setups(event_object) {

    const [home_team_tactical_data, away_team_tactical_data] = [event_object[0], event_object[1]];
    const [home_team_formation, away_team_formation] = [home_team_tactical_data['tactics']['formation'], away_team_tactical_data['tactics']['formation']];

    return [home_team_formation, away_team_formation];

}

export function extract_lineups(lineup_object) {

    const home_team_lineup_object = lineup_object[0]['lineup'];
    const away_team_lineup_object = lineup_object[1]['lineup'];

    function generate_lineups(lineup_object) {

        const extracted_lineup = [];

        for (const data of lineup_object) {

            if (data['positions'].length !== 0 && data['positions'][0]['start_reason'] === "Starting XI") {

                let player_name;

                if (data['player_nickname'] !== null) {
                    player_name = data['player_nickname'];
                } else {
                    player_name = data['player_name']
                }

                const player_number = data['jersey_number'].toString();

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
        return sorted_lineup;
    }

    const home_team_lineup_extracted = generate_lineups(home_team_lineup_object);
    const away_team_lineup_extracted = generate_lineups(away_team_lineup_object);

    return [home_team_lineup_extracted, away_team_lineup_extracted];
}

export function extract_goal_events(event_object, home_team) {

    const home_goal_events = [];
    const away_goal_events = [];

    for (const event of event_object) {

        if (event['type']['name'] == 'Shot' && event['shot']['outcome']['name'] === 'Goal' && event['period'] !== 5) {

            const timestamp = event['minute'].toString() + ':' + event['second'].toString();
            const goalscorer = event['player']['name'];

            const goal_event = goalscorer + ' - ' + timestamp;

            if (event['possession_team']['name'] === home_team) { // determine if goalscorer is from home or away team
                home_goal_events.push(goal_event);
            } else {
                away_goal_events.push(goal_event);
            }
        }
    }
    return [home_goal_events, away_goal_events];
}

export function generate_lineup_table(lineup_array) {

    console.log(lineup_array);
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

            const split_names = element[2].split(" ");

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
            player_span.style.fontSize = "12px";
        } else if (last_name_array[i - 1].length > 9) {
            player_span.style.fontSize = "14px";
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

        let position = lineup_array[i - 1][1]

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
                break;
            case "RCB":
                iterated_position.style[vertical_position] = "12.5%";
                iterated_position.style[right_side] = "31%";
                break;
            case "CB":
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
                iterated_position.style[vertical_position] = "34.4875%";
                iterated_position.style[right_side] = "31%";
                break;
            case "CAM":
                iterated_position.style[vertical_position] = "31.6625%";
                iterated_position.style[left_side] = "50%";
                iterated_position.style.transform = `translateX(${transform_percentage})`;
                break;
            case "LAM":
                iterated_position.style[vertical_position] = "34.4875%";
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
            }else if (position === "LDM") {
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
            if (position === "RCM" ) {
                iterated_position.style[right_side] = "31%";
            } else if (position === "RDM") {
                iterated_position.style[right_side] = "31%";
            } else if (position === "LCM") {
                iterated_position.style[left_side] = "31%";
            } else if (position === "LDM") {
                iterated_position.style[left_side] = "31%";
            }

        }

        else if (formation === 451) {
            if (position === "CF") {
                iterated_position.style[vertical_position] = "36.6625%";
            }
        }
    }
}