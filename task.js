const assignNumber = require("./assignNumber");
document.addEventListener('DOMContentLoaded', (event) => {
    var highScorers;
    var dragElement = null;
    var timeStarted, playerName, endTime;
    var highScoreTable = document.getElementById("highscoreTable");
    updateTable(JSON.parse(localStorage.getItem("TopScorers")));
    document.getElementById("btn").addEventListener("click", generateGrid, false);

    function onDragStart(e) {
        this.style.opacity = '0.4';
        // this.style.backgroundColor = "blue";
        dragElement = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerText);

    }

    function onDragEnd(e) {
        this.style.opacity = '1';
    }

    function onDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function onDrop(e) {

        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragElement !== this) {
            dragElement.innerHTML = this.innerText;
            this.innerText = e.dataTransfer.getData('text/html');

        }
        if (checkOrder()) {
            endTime = new Date();
            let diff = endTime.getTime() - timeStarted.getTime();
            diff = diff / 1000;
            if (JSON.parse(localStorage.getItem("TopScorers")) === null) {
                highScorers = [];
                highScorers.push({ "name": playerName, "score": diff });
                // console.log(highScorers);
                localStorage.setItem("TopScorers", JSON.stringify(highScorers));
                
            }
            else {
                highScorers = [];
                let prevObject = JSON.parse(localStorage.getItem("TopScorers"));
                // console.log(prevObject);
                for (let i = 0; i < prevObject.length; i++) {
                    highScorers.push(prevObject[i]);
                }
                highScorers.push({ "name": playerName, "score": diff });
                highScorers.sort((a, b) => (a.score < b.score) ? -1 : 1)
                updateTable(highScorers);
                localStorage.setItem("TopScorers", JSON.stringify(highScorers));
                

            }


            setTimeout(() => alert("Welcome to the Team"), 500);
            return;
        }
        return false;
    }
    //the event occurred
    function generateGrid() {

        timeStarted = new Date();
        let number = document.getElementById("puzzleNumber").value;
        playerName = document.getElementById("playerName").value;
        const grid = document.getElementById("grid");
        for (let i = 0; i < number; i++) {

            for (let j = 0; j < number; j++) {
                let gridCell = document.createElement("div");
                gridCell.setAttribute("class", "gridCell");
                gridCell.setAttribute("id", "gridCell" + i + "-" + j);
                gridCell.setAttribute("draggable", true);
                gridCell.addEventListener('dragstart', onDragStart, false);
                gridCell.addEventListener('dragover', onDragOver, false);
                gridCell.addEventListener('drop', onDrop, false);
                gridCell.addEventListener('dragend', onDragEnd, false);
                grid.appendChild(gridCell);

            }

        }
        const gridCell = document.getElementsByClassName("gridCell");
        for (el of gridCell) {
            el.style.height = 600 / number;
            el.style.width = 600 / number;
        }
        assignNumber(number);

    }
    
    
    
    function checkOrder() {
        let gridCells = document.getElementsByClassName("gridCell");
        let sorted = true;
        console.log("inside order");
        console.log(gridCells[1].innerText);
        for (let i = 0; i < gridCells.length - 1; i++) {
            if (parseInt(gridCells[i].innerText) > parseInt(gridCells[i + 1].innerText)) {
                sorted = false;
                break;
            }

        }
        return sorted;
    }

    function updateTable(objArr) {
        highScoreTable.innerHTML = "";
        //Adding row at the last position
        let header = highScoreTable.createTHead();
        let row = header.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = "Name";
        cell2.innerHTML = "Score";
        console.log(objArr);
        for (let i = 0; i < objArr.length; i++) {
            //adding two cells 
            let row = highScoreTable.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = objArr[i].name;
            cell2.innerHTML = objArr[i].score;
        }

    }


});




