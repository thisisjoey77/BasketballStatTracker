let xStat = JSON.parse(localStorage.getItem('xStat'));
let playerTime = JSON.parse(localStorage.getItem('playerTime'));


function displayTable() {
    for(let i=0;i<xStat.length;i++) {
        
        const tmp = xStat[i];
        const plat = playerTime[i];
        
        let playRec = document.getElementById("player-name");
        let newPlay = document.createElement("p1");
        newPlay.innerText = tmp.name;
        playRec.appendChild(newPlay);
        
        let minRec = document.getElementById("minutes");
        let newMin = document.createElement("p1");
        let timeHr = plat.hours < 10 ? "0" + plat.hours : plat.hours;
        let timeMin = plat.minutes < 10 ? "0" + plat.minutes : plat.minutes;
        let timeSec = plat.seconds < 10 ? "0" + plat.seconds : plat.seconds;
        let timeStr = `${timeHr}:${timeMin}:${timeSec}`;
        newMin.innerText = timeStr;
        playRec.appendChild(newMin);
        
        let ptsRec = document.getElementById("pts");
        let newPts = document.createElement("p1");
        newPts.innerText = tmp.pts;
        playRec.appendChild(newPlay);
        
        let astRec = document.getElementById("ast");
        let rebRec = document.getElementById("reb");
        let stlRec = document.getElementById("stl");
        let blkRec = document.getElementById("blk");
        let foulRec = document.getElementById("foul");
    }
    return;
}