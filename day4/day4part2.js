let numberPasswords = 0;
for(let i = 357253; i <= 892942; i++){
    if(check(i)){
        numberPasswords++;
    }
}

console.log(numberPasswords);

function check(number){
    let previous = 10;
    let numbers = [];
    for(let i = 1; i <= 6; i++){
        let place = number % 10;
        numbers.push(place);

        if(place > previous){
            return false;
        }

        previous = place;
        number = Math.floor(number / 10);
    }
    for(let i = 0; i < 6;){
        let consec = 0;
        while(numbers[i] === numbers[i + consec]){
            consec++;
        }
        if(consec === 2){
            return true;
        }
        i += consec;
    }

    return false;
}