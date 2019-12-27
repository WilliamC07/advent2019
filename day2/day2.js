const fs = require('fs');

const int_code = fs.readFileSync("question.txt", "utf-8").split(",").map(current => parseInt(current));

// Part 1
const part1_input = [...int_code];
part1_input[1] = 12;
part1_input[2] = 2;
console.log(`Day 2 Part 1: ${run_intcode(part1_input)}`);

// Part 2
let noun = 0;
let verb = 0;
for(let noun = 0; noun <= 99; noun++){
    for(let verb = 0; verb <= 99; verb++){
        const part2_input = [...int_code];
        part2_input[1] = noun;
        part2_input[2] = verb;
        if(run_intcode(part2_input) == 19690720){
            console.log(`Noun: ${noun} Verb: ${verb}`);
            console.log(`Day 2 Part 2: ${100 * noun + verb}`);
            process.exit(1);
        }
    }
}

function run_intcode(int_code){
    let index = 0;
    loop: while(true){
        switch(int_code[index]){
            case 1:
                // add
                int_code[int_code[index + 3]] = int_code[int_code[index + 1]] + int_code[int_code[index + 2]];
                break;
            case 2:
                // multiply
                int_code[int_code[index + 3]] = int_code[int_code[index + 1]] * int_code[int_code[index + 2]];
                break;
            case 99:
                // terminate
                break loop;
            default:
                console.log(`Exiting on code ${index} value ${int_code[index]}`);
                process.exit(1);

        }
        index += 4;
    }
    return int_code[0];
}
