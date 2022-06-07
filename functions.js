export function sum(a, b) {
    return a + b;
}

// Season ID

let season_id = []

export function extract_season_ids(competitions_data) {

    console.log(competitions_data);
    
    for (const competition_object of competitions_data) {
        if (competition_object['competition_name'] === 'Champions League') {
            season_id.push(competition_object['season_id'])
        }
    }

    season_id.pop() // removes 76 season id, which contains no data
    return season_id;
    
}



