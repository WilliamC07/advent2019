// https://adventofcode.com/2019/day/1

const fs = require('fs');

const masses = fs.readFileSync("question.txt", "utf-8").split("\n").map(value => parseInt(value));
let total = masses.reduce((acc, current) => acc + calculateFuelFromMass(current), 0);
console.log(`Day 1 Part 1: ${total}`);

let totalWithFuel = masses.reduce((acc, current) => acc + calculateTotalFuel(current), 0);
console.log(`Day 1 Part 2: ${totalWithFuel}`);

function calculateTotalFuel(mass){
    const fuelMass = calculateFuelFromMass(mass);
    if(fuelMass <= 0){
        return 0;
    }else{
        return fuelMass + calculateTotalFuel(fuelMass)
    }
}

function calculateFuelFromMass(mass){
    return Math.floor(mass / 3) - 2;
}
