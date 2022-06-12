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

    for (const competition_object of competitions_data) {
        if (competition_object['competition_name'] === 'Champions League') {
            season_ids.push(competition_object['season_id'])
        }
    }

    for (let i = 0; i < season_ids.length; i++) { // remove id 76 as it contains no data
        if (season_ids[i] === 76) {
            season_ids.splice(i, 1);
        }
    }

    const random_index = Math.floor(Math.random() * season_ids.length);

    let random_season_id = season_ids[random_index];

    console.log(season_ids);


    random_season_id = 25;
    // random_season_id = 37; // liverpool vs AC Milan 3-3

    console.log(random_season_id);


    return random_season_id;
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

                console.log(player_name);


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

export function populate_empty_pitch(lineup_array) {

    function extract_last_names(lineup_array) {

        const last_name_prefixes = ["at", "Aït", "al", "Al", "ben", "Ben", "bin", "Bin", "ibn", "Ibn", "da", "Da", "das", "Das", "de", "De", "degli", "Degli", "del", "Del", "dele", "Dele", "della", "Della", "der", "Der", "di", "Di", "dos", "Dos", "du", "Du", "el", "El", "van", "Van", "von", "Von"];

        const last_name_array = lineup_array.map((element) => {

            const split_names = element[2].split(" ");
            console.log(split_names);

            if (split_names.length > 1) {

                for (const prefix of last_name_prefixes) { // check for prefixes
                    for (const word of split_names) {
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
        const position_circle = document.querySelector(`#pos${i}_home`);
        position_circle.textContent = lineup_array[i - 1][0];

        const player_span = document.querySelector(`#span${i}_home`);
        player_span.textContent = last_name_array[i - 1];

        if (last_name_array[i - 1].length > 8) {
            player_span.style.fontSize = "14px";
        } else if (last_name_array[i - 1].length > 10) {
            player_span.style.fontSize = "12px";
        }
    }
}

export function calculate_positions(lineup_array) {

    for (let i = 1; i < lineup_array.length + 1; i++) {

        let iterated_position = document.getElementById(`container${i}_home`);

        // for away formation, bottom = top, left = right and right = left

        switch (lineup_array[i - 1][1]) {
            case "GK":
                iterated_position.style.bottom = "3%";
                iterated_position.style.left = "50%";
                iterated_position.style.transform = "translateX(-50%)";
                break;
            case "RB":
                iterated_position.style.bottom = "12.5%";
                iterated_position.style.right = "7.85%";
                break;
            case "RWB":
                break;
            case "RCB":
                iterated_position.style.bottom = "12.5%";
                iterated_position.style.right = "31%";
                break;
            case "CB":
                break;
            case "LCB":
                iterated_position.style.bottom = "12.5%";
                iterated_position.style.left = "31%";
                break;
            case "LB":
                iterated_position.style.bottom = "12.5%";
                iterated_position.style.left = "7.85%";
                break;
            case "LWB":

                break;
            case "RM":

                break;
            case "RCM":
                iterated_position.style.bottom = "27.1%";
                iterated_position.style.right = "31%";
                break;
            case "RDM":

                break;
            case "CM":

                break;
            case "CDM":
                iterated_position.style.bottom = "19.8%";
                iterated_position.style.left = "50%";
                iterated_position.style.transform = "translateX(-50%)";
                break;
            case "LCM":
                iterated_position.style.bottom = "27.1%";
                iterated_position.style.left = "31%";
                break;
            case "LDM":

                break;
            case "LM":

                break;
            case "RAM":

                break;
            case "CAM":
                iterated_position.style.bottom = "34.4%";
                iterated_position.style.left = "50%";
                iterated_position.style.transform = "translateX(-50%)";
                break;
            case "LAM":

                break;
            case "RW":

                break;
            case "RCF":
                iterated_position.style.bottom = "41.7%";
                iterated_position.style.right = "31%";
                break;
            case "SS":

                break;
            case "CF":
                iterated_position.style.bottom = "41.7%";
                iterated_position.style.left = "50%";
                iterated_position.style.transform = "translateX(-50%)";
                break;
            case "ST":

                break;
            case "LCF":
                iterated_position.style.bottom = "41.7%";
                iterated_position.style.left = "31%";
                break;
            case "LW":

                break;

        }

    }

}