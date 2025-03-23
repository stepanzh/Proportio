export function prettifyNumber(number) {
    if (isNaN(number)) {
        return ''
    }

    let rounded
    if (0 <= number && number < 10){
        rounded = number.toFixed(3);
    } else if (10 <= number && number < 100){
        rounded = number.toFixed(2);
    } else if (100 <= number && number < 1000){
        rounded = number.toFixed(1);
    } else {
        rounded = number.toFixed(0);
    }

    // TODO: dot and comma
    return parseFloat(rounded).toString()
}