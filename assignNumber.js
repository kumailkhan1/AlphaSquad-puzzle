
var numbersArray = [];
function assignNumber(number) {
    if (number < 0) {
        throw new Error("Negative input");
      }
    const gridCell = document.getElementsByClassName("gridCell");
    let count = 0;
    while (count < (number * number)) {
        let randomNum = Math.floor((Math.random() * (number * number) + 1));
        if (numbersArray.indexOf(randomNum) === -1) {
            numbersArray.push(randomNum);
            count++;
        }

    }
    for (let i = 0; i < numbersArray.length; i++) {
        gridCell[i].innerText = numbersArray[i];
    }

};

module.exports = assignNumber;