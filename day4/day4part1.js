let numberPasswords = 0;
for(let i = 357253; i <= 892942; i++){
    if(check(i)){
        numberPasswords++;
    }
}

console.log("Answer: " + numberPasswords);

function check(number){
    let adjacentCondition = false;

    let previous = 10;
    for(let i = 1; i <= 6; i++){
        let place = number % 10;
        if(place === previous){
            adjacentCondition = true;
        }
        if(place > previous){
            return false;
        }

        previous = place;
        number = Math.floor(number / 10);
    }

    return adjacentCondition;
}