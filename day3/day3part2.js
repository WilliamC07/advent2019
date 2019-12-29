const fs = require('fs');

const question = fs.readFileSync("question.txt", "utf-8");
const instructionsA = question.split("\n")[0].split(",");

// x, y, steps to
const turns = [[0, 0, 0]];
let APosition = [0, 0];
let stepsToA = 0;
for(const instruction of instructionsA){
    const movement = parseInt(instruction.substring(1, instruction.length));
    stepsToA += movement;
    switch(instruction[0]){
        case 'R':
            APosition = [APosition[0] + movement, APosition[1]];
            break;
        case 'L':
            APosition = [APosition[0] - movement, APosition[1]];
            break;
        case 'U':
            APosition = [APosition[0], APosition[1] + movement];
            break;
        case 'D':
            APosition = [APosition[0], APosition[1] - movement];
            break;
    }
    turns.push([...APosition, stepsToA]);
}

const instructionsB = question.split("\n")[1].split(",");
let BPosition = [0, 0];
let stepsTotal = Number.MAX_SAFE_INTEGER;
let stepsToB = 0;
for(const instruction of instructionsB){
    const movement = parseInt(instruction.substring(1, instruction.length));
    let nextBPosition = [];
    stepsToB += movement;
    switch(instruction[0]){
        case 'R':
            nextBPosition = [BPosition[0] + movement, BPosition[1]];
            break;
        case 'L':
            nextBPosition = [BPosition[0] - movement, BPosition[1]];
            break;
        case 'U':
            nextBPosition = [BPosition[0], BPosition[1] + movement];
            break;
        case 'D':
            nextBPosition = [BPosition[0], BPosition[1] - movement];
            break;
    }

    // index grid from 1 onwards since 0, 0 will always intersect
    for(let i = 1; i < turns.length; i++){
        const intersection = get_intersection(turns[i], turns[i - 1], BPosition, nextBPosition);
        if(has_intersection(turns[i], turns[i - 1], BPosition, nextBPosition)){
            const steps = stepsToB - manhattanDistance(intersection, nextBPosition) + turns[i][2] - manhattanDistance(intersection, turns[i]);
            if(steps < stepsTotal){
                stepsTotal = steps;
            }
        }
    }

    BPosition = nextBPosition;
}

function has_intersection(pointA, pointB, pointC, pointD){
    let [a,b,c,d,p,q,r,s] = [pointA[0], pointA[1], pointB[0], pointB[1], pointC[0], pointC[1], pointD[0], pointD[1]];
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

function get_intersection(pointA, pointB, pointC, pointD){
    if(pointA[0] === pointB[0]){
        return [pointA[0], pointC[1]];
    }else{
        return [pointC[0], pointA[1]];
    }
}

function manhattanDistance(pointA, pointB){
    return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1])
}

console.log(`Steps: ${stepsTotal}`);