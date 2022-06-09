function sort_lineup(lineup_array) {

    let ranked_lineup = [];
    
    for (const nested_array of lineup_array) {

        switch (nested_array[1]) {
            case "GK":
                nested_array.push({position_rank: 1});
                ranked_lineup.push(nested_array);
                break;
            case "RB":
                nested_array.push({position_rank: 2});
                ranked_lineup.push(nested_array);
                break;
            case "RWB":
                nested_array.push({position_rank: 3});
                ranked_lineup.push(nested_array);
                break;
            case "RCB":
                nested_array.push({position_rank: 4});
                ranked_lineup.push(nested_array);
                break;
            case "CB":
                nested_array.push({position_rank: 5});
                ranked_lineup.push(nested_array);
                break;
            case "LCB":
                nested_array.push({position_rank: 6});
                ranked_lineup.push(nested_array);
                break;
            case "LB":
                nested_array.push({position_rank: 7});
                ranked_lineup.push(nested_array);
                break;
            case "LWB":
                nested_array.push({position_rank: 8});
                ranked_lineup.push(nested_array);
                break;
            case "RM":
                nested_array.push({position_rank: 9});
                ranked_lineup.push(nested_array);
                break;
            case "RCM":
                nested_array.push({position_rank: 10});
                ranked_lineup.push(nested_array);
                break;
            case "RDM":
                nested_array.push({position_rank: 11});
                ranked_lineup.push(nested_array);
                break;
            case "CM":
                nested_array.push({position_rank: 12});
                ranked_lineup.push(nested_array);
                break;
            case "CDM":
                nested_array.push({position_rank: 12});
                ranked_lineup.push(nested_array);
                break;
            case "LCM":
                nested_array.push({position_rank: 13});
                ranked_lineup.push(nested_array);
                break;
            case "LDM":
                nested_array.push({position_rank: 14});
                ranked_lineup.push(nested_array);
                break;
            case "LM":
                nested_array.push({position_rank: 15});
                ranked_lineup.push(nested_array);
                break;
            case "RAM":
                nested_array.push({position_rank: 16});
                ranked_lineup.push(nested_array);
                break;
            case "CAM":
                nested_array.push({position_rank: 17});
                ranked_lineup.push(nested_array);
                break;
            case "LAM":
                nested_array.push({position_rank: 18});
                ranked_lineup.push(nested_array);
                break;
            case "RW":
                nested_array.push({position_rank: 19});
                ranked_lineup.push(nested_array);
                break;
            case "RCF":
                nested_array.push({position_rank: 20});
                ranked_lineup.push(nested_array);
                break;
            case "SS":
                nested_array.push({position_rank: 21});
                ranked_lineup.push(nested_array);
                break;
            case "CF":
                nested_array.push({position_rank: 22});
                ranked_lineup.push(nested_array);
                break;
            case "ST":
                nested_array.push({position_rank: 23});
                ranked_lineup.push(nested_array);
                break;
            case "LCF":
                nested_array.push({position_rank: 24});
                ranked_lineup.push(nested_array);
                break;
            case "LW":
                nested_array.push({position_rank: 25});
                ranked_lineup.push(nested_array);
                break;

        }

    }

    const sorted_lineup = ranked_lineup.sort((a,b) => {
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

    console.log(competitions_data);
    
    for (const competition_object of competitions_data) {
        if (competition_object['competition_name'] === 'Champions League') {
            season_ids.push(competition_object['season_id'])
        }
    }

    season_ids.pop() // removes 76 season id, which contains no data
    
    const random_index = Math.floor(Math.random() * season_ids.length);
    
    let random_season_id = season_ids[random_index];
    random_season_id = 37; // liverpool vs AC Milan 3-3
    
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
       
    console.log(home_team_lineup_object);
    console.log(away_team_lineup_object);
    
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
        
                extracted_lineup.push([player_number, player_position_initials, player_name])
                
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



