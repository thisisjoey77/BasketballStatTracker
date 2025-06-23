let xStat = [];
let playerIdx = [];
let playerTime = [];
let playerNum = -1;

function validInput(name, num, pos) {
    if(parseInt(num).toString()!==num) return 0;
    for(let i=0;i<xStat.length;i++) {
        if(xStat[i].num===parseInt(num))
            return 0;
        if(xStat[i].name===name)
            return 0;
    }
    return 1;
}

function saveVars() {
    localStorage.setItem('xStat',JSON.stringify(xStat));
    localStorage.setItem('playerIdx',JSON.stringify(playerIdx));
    localStorage.setItem('playerNum',playerNum);
    localStorage.setItem('playerTime',JSON.stringify(playerTime));
    return;
}

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    const playerNumber = document.getElementById('playerNumber').value;
    const playerPosition = document.getElementById('playerPosition').value;

    if (validInput(playerName, playerNumber, playerPosition)) {
        const opBox = document.getElementById("setEnemy");
        let state = 0;
        if(opBox.checked) state ++;
        xStat.push({
            name: playerName,
            num: playerNumber,
            pos: playerPosition,
            pts: 0,
            ast: 0,
            reb: 0,
            stl: 0,
            blk: 0,
            foul: 0,
            team: state,
        });
        playerTime.push({
            timing: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        playerIdx.push(-1);
        
        playerNum ++;
        updatePlayerList();
        saveVars();
        document.getElementById('playerName').value = '';
        document.getElementById('playerNumber').value = '';
        document.getElementById('playerPosition').value = '';
        opBox.checked = false;
    }
    else
        alert('Please enter a valid name, number, and position for the player.');
    return;
}

function updatePlayerList() {
    const tableBody = document.getElementById('playersTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    xStat.forEach(player => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const numberCell = row.insertCell(1);
        const positionCell = row.insertCell(2);
        const stateCell = row.insertCell(3);

        nameCell.textContent = player.name;
        numberCell.textContent = player.num;
        positionCell.textContent = player.pos;
        if(player.team)
            stateCell.textContent = "away";
        else
            stateCell.textContent = "home";
    });
    return;
}

function remove() {
    if (xStat.length){
        xStat.pop();
        playerIdx.pop();
        playerNum --;
        playerTime.pop();
        saveVars();
    }
    else{
        alert("There are no players to remove.");
    }
    updatePlayerList(); // update the table to show the reset version 
    return;
    
}

function startGame() {
    if(playerIdx.length<5) {
        alert("WARNING: Less than 5 players. The program may not work as intended.");
    }
    return;
}

function resetStats() {
    // Implement your reset logic here
    players = []; // This will reset the player list
    updatePlayerList(); // Update the table to reflect the reset
    return;
}

localStorage.setItem('xStat',JSON.stringify(xStat));
localStorage.setItem('playerIdx',JSON.stringify(playerIdx));
localStorage.setItem('playerTime',JSON.stringify(playerTime));
localStorage.setItem('playerNum',playerNum);
