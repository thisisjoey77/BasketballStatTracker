let xStat = JSON.parse(localStorage.getItem('xStat'));
const playerNum = localStorage.getItem('playerNum');
let playerIdx = JSON.parse(localStorage.getItem('playerIdx'));
let playerTime = JSON.parse(localStorage.getItem('playerTime'));

let fitCircPos = [
    {
        x: '44%',
        y: '28%',
    },
    {
        x: '15%',
        y: '25%',
    },
    {
        x: '70%',
        y: '3%',
    },
    {
        x: '20%',
        y: '5%',
    },
    {
        x: '65%',
        y: '15%',
    },
    {
        x: '44%',
        y: '65%',
    },
    {
        x: '15%',
        y: '68%',
    },
    
    {
        x: '70%',
        y: '90%',
    },
    {
        x: '20%',
        y: '88%',
    },
    {
        x: '65%',
        y: '78%',
    },
    
];
let vacFitCirc = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
let subSelect = -1;
let addFoul = -1;
let timing = 0;
let onSelect = -1;
let quarter = 1;
let timer = 5;
let totMin = 0, totSec = 5;
let home = 0, away = 0;
let scores = [{home:0,away:0},{home:0,away:0},{home:0,away:0},{home:0,away:0}];
let timerInterval; // declare a variable to hold the interval
let overtime = 0;
let homeName = '', awayName = '';
const gameTime = 32*60;
let disdesp = 0;


function stopTime() {if(!timing) return; timing --;}
function startTime() {if(timing) return; timing ++;}

function makeEndButton() {
    let ender = document.createElement("a");
    ender.href = "record.html";
    let button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("page-change");
    button.innerText = "RESULT SHEET";
    button.setAttribute('onclick','finalSave()');
    ender.appendChild(button);
    const place = document.getElementById("page-change");
    place.appendChild(ender);
    return;
}

function saveVars() {
    localStorage.setItem('homeName',homeName);
    localStorage.setItem('awayName',awayName);
    return;
}

function changeParty(type) {
    if(!type) {
        homeName = document.getElementById("homeName").innerText;
    }
    else {
        awayName = document.getElementbyId("awayName").innerText;
    }
    saveVars();
    return;
}

function finishGame() {
    if(quarter===4) {
        alert("Game finished. Move to the sheet page to access data.");
        makeEndButton();
        return;
    }
    scores[quarter-1].home = home;
    scores[quarter-1].away = away;
    document.getElementById("overspace").innerHTML = '';
    overtime =0;
    totMin = 8; 
    totSec = 0; 
    quarter++;
    document.getElementById('quarterNum').innerHTML = "Q" + quarter;
    timing = 0;
    clearInterval(timerInterval); 
    let displayMin = totMin < 10 ? "0" + totMin : totMin;
    let displaySec = totSec < 10 ? "0" + totSec : totSec;
    display.textContent = displayMin + ":" + displaySec;
}

function selPlayer(num) {
    //if substitute is selected
    desDisp(0);
    if(playerIdx[num]!==(-1) || playerNum<num) return;
    if(num===subSelect) {
        subSelect = -1;
        const player = document.getElementById(`s${num}`);
        player.classList.remove("selected");
        player.classList.add("out");
        revGlowVac();
        return;
    }
    for(let i=0;i<=playerNum;i++) {
        const player = document.getElementById("s" + i.toString());
        if(i===num) {
            player.classList.add("selected");
            if(player.classList.contains("out")) {
                player.classList.remove("out");
            }
        }
        else {
            player.classList.add("out");
            if(player.classList.contains("selected")) {
                player.classList.remove("selected");
            }
        }
    }
    subSelect = num;
    glowVac();
    onSelect = -1;
    return;
}

function revGlowVac() {
    for(let i=0;i<10;i++) {
        let circ = document.getElementById("f"+i.toString());
        if(circ.classList.contains("fit-circle")) {
            circ.classList.remove("glow");
            circ.classList.add("non-selected");
        }
        else {
            circ.classList.add("non-selected");
            circ.classList.remove("glow");
        }
    }
    return;
}

function glowVac() {
    //glows up vacant circles on court
    for(let i=0;i<10;i++) {
        let circ = document.getElementById(`f${i}`);
        if(circ.classList.contains("fit-circle")) {
            circ.classList.add("glow");
            circ.classList.remove("non-selected");
        }
        else {
            circ.classList.add("non-selected");
            circ.classList.remove("glow");
        }
    }
    return;
}

function add(type) {
    if(onSelect===(-1)) return;
    if(type===2) {
        xStat[onSelect].pts += 2;
        if(xStat[onSelect].team)
            away += 2;
        else
            home += 2;
        updateScores();
    }
    else if(type===3) {
        xStat[onSelect].pts += 3;
        if(xStat[onSelect].team)
            away += 3;
        else
            home += 3;
        updateScores();
    }
    else if(type===4) {
        xStat[onSelect].pts ++;
        if(xStat[onSelect].team)
            away ++;
        else
            home ++;
        updateScores();
    }
    else if(type===5)
        xStat[onSelect].ast ++;
    else if(type===6)
        xStat[onSelect].reb ++;
    else if(type===7)
        xStat[onSelect].stl ++;
    else if(type===8)
        xStat[onSelect].blk ++;
    else
        xStat[onSelect].foul ++;
    settingPlayer();
    return;
}

function updateScores() {
    let h = document.getElementById("homeScore");
    let a = document.getElementById("awayScore");
    h.innerHTML = home;
    a.innerHTML = away;
}

function subtract(type) {
    if(onSelect===(-1)) return;
    if(type===2) {
        xStat[onSelect].tpts -= 2;
        if(xStat[onSelect].team)
            away -= 2;
        else
            home -= 2;
        updateScores();
    }
    else if(type===3) {
        xStat[onSelect].thpts -= 3;
        if(xStat[onSelect].team)
            away -= 3;
        else
            home -= 3;
        updateScores();
    }
    else if(type===4) {
        xStat[onSelect].ft --;
        if(xStat[onSelect].team)
            away --;
        else
            home --;
        updateScores();
    }
    else if(type===5)
        xStat[onSelect].ast --;
    else if(type===6)
        xStat[onSelect].reb --;
    else if(type===7)
        xStat[onSelect].stl --;
    else if(type===8)
        xStat[onSelect].blk --;
    else
        xStat[onSelect].foul --;
    settingPlayer();
    return;
}

function updatePie(num) {
    const n = vacFitCirc[num];
    const target = document.getElementById(`f${num}`);
    const pTime = playerTime[n].hours*(60*60)+playerTime[n].minutes*60 + playerTime[n].seconds;
    const f = Math.round((pTime/gameTime)*360);
    const col = xStat[n].team ? 'red' : 'blue';
    target.style.backgroundImage = `conic-gradient(${col} ${f}deg, gray 0)`;
    return;
}

function replacePlayers(num) {
    let aPlayer=num, bPlayer=subSelect;
    
    let fit = document.getElementById(`f${playerIdx[aPlayer]}`);
    if(xStat[bPlayer].team) {
        fit.classList.remove("active-circle");
        fit.classList.add("active-circle-e");
    }
    else {
        fit.classList.remove("active-circle-e");
        fit.classList.add("active-circle");
    }
    playerIdx[bPlayer] = playerIdx[aPlayer];
    playerIdx[aPlayer] = -1;
    
    playerTime[aPlayer].timing =0;
    playerTime[bPlayer].timing =1;

    let aItem = document.getElementById(`s${aPlayer}`);
    aItem.classList.remove("in"); aItem.classList.add("out");
    let bItem = document.getElementById(`s${bPlayer}`);
    bItem.classList.remove("out"); bItem.classList.add("in");
    vacFitCirc[playerIdx[bPlayer]] = bPlayer;
    
    let innerName = document.getElementById(`name${playerIdx[bPlayer]}`);
    innerName.innerHTML = xStat[bPlayer].name;
    
    for(let i=0;i<10;i++) {
        const fit = document.getElementById(`f${i}`);
        fit.classList.remove("glow");
        fit.classList.add("non-selected");
    }
    
    subSelect = -1;
    return;
}

function launchFunc() {
    //on launch, set positions for circles on court
   for(let i=0;i<=playerNum;i++) {
       let newSub = document.createElement("div");
       newSub.classList.add("player-circle");
       newSub.classList.add("out");
       newSub.id = "s" + i.toString();
       newSub.setAttribute('onclick', `selPlayer(${i})`);
       const subCollection = document.getElementById("sub-col");
       subCollection.appendChild(newSub);
   }
    for(let i=0;i<10;i++) {
        const fit = document.getElementById("f"+i.toString());
        fit.style.top = fitCircPos[i].x;
        fit.style.left = fitCircPos[i].y;
    }
    document.getElementById('time').innerHTML = "08:00";
    return;
}

function settingPlayer() {
    const foul = document.getElementById("foul"); foul.innerHTML = xStat[onSelect].foul;
    
    const subject = playerTime[onSelect];
    const displayHr = subject.hours<10 ? "0" + subject.hours : subject.hours;
    const displayMin = subject.minutes<10 ? "0" + subject.minutes : subject.minutes;
    const displaySec = subject.seconds<10 ? "0" + subject.seconds : subject.seconds;
    const min = document.getElementById("min"); min.innerHTML = `${displayHr}:${displayMin}:${displaySec}`;
    const name = document.getElementById("name"); name.innerHTML = xStat[onSelect].name;
    const pts = document.getElementById("pts"); pts.innerHTML = xStat[onSelect].pts;
    const ast = document.getElementById("ast"); ast.innerHTML = xStat[onSelect].ast;
    const reb = document.getElementById("reb"); reb.innerHTML = xStat[onSelect].reb;
    const stl = document.getElementById("stl"); stl.innerHTML = xStat[onSelect].stl;
    const blk = document.getElementById("blk"); blk.innerHTML = xStat[onSelect].blk;
    return;
}

function desDisp(doing) {
    let displayer = document.getElementById("deselect");
    if(!disdesp){
        disdesp ++;
        let but = document.createElement("button");
        if(doing) {
            but.innerText = "DESELECT";
            but.id="deselector";
            but.classList.add("button");
            but.setAttribute('onclick',`deselectPlayer(${onSelect})`);
            displayer.appendChild(but);
        }
    }
    else if(doing) {
        let curBut = document.getElementById("deselector");
        curbut.setAttribute('onclick',`deselectPlayer(${onSelect})`);
    }
    else
        displayer.innerHTML = '';
    return;
}

function placeCheck(num) {
    //if circle on court is pressed
    if(vacFitCirc[num]!==(-1)) {
        if(subSelect!==(-1)) {
            replacePlayers(vacFitCirc[num]);
            return;
        }
        onSelect = vacFitCirc[num];
        settingPlayer();
        if(disdesp) desDisp(1); else desDisp(0);
        return;
    }
    if(subSelect===(-1)) return; 
    const oldSub = document.getElementById("s" + subSelect.toString());
    oldSub.classList.remove("out");
    oldSub.classList.add("in");
    
    let cDiv = document.getElementById(`f${num}`);
    cDiv.classList.remove("fit-circle");
    if(xStat[subSelect].team)
        cDiv.classList.add("active-circle-e");
    else
        cDiv.classList.add("active-circle");
    cDiv.classList.add("timePie");
    
    let innerName = document.getElementById(`name${num}`);
    innerName.innerHTML = xStat[subSelect].name;
    
    playerTime[subSelect].timing =1;
    
    for(let i=0;i<10;i++) {
        const fit = document.getElementById("f"+i.toString());
        fit.classList.remove("glow");
        fit.classList.add("non-selected");
    }
    
    playerIdx[subSelect] = num;
    vacFitCirc[num] = subSelect;
    updatePie(num);
    subSelect = -1;
    return;
}

function deselectPlayer(num) {
    //if player on court is clicked
    playerTime[num].timing = 0;
    let onCourt = document.getElementById(`f${playerIdx[num]}`);
    let onSide = document.getElementById(`s${num}`);
    vacFitCirc[playerIdx[num]] = -1;
    onCourt.classList = '';
    onCourt.classList.add('fit-circle');
    onCourt.classList.add('non-selected');
    onCourt.classList.add('court-circle');
    alert(onCourt.classList);
    //onCourt.style.background = 'lightblue';
    onSide.classList.remove('in'); onSide.classList.remove('selected'); onSide.classList.add('out');
    //timepie enable on sub player
    alert("!");
    playerIdx[num] = -1;
    onCourt.style.backgroundImage = ``;
    return;
}

function startTimer(display) {
    timerInterval = setInterval(function () {
        if(overtime) return;
        else totSec --;
        if(totMin===0 && totSec===0) {
            makeOvertime();
        }
        else if(totSec < 0) {
            totMin --;
            totSec = 59;
        }
        else if(totSec===60) {
            totSec = 0;
            totMin ++;
        }
        
        let displayMin = totMin < 10 ? "0" + totMin : totMin;
        let displaySec = totSec < 10 ? "0" + totSec : totSec;
    
        display.textContent = displayMin + ":" + displaySec;
        
        for(let i = 0; i <=playerNum; i++) {
            if(playerTime[i].timing) {
                playerTime[i].seconds ++;
                let min = playerTime[i].minutes;
                let hrs = playerTime[i].hours;
                if(playerTime[i].seconds === 60) {playerTime[i].minutes ++; playerTime[i].seconds = 0;}
                if(playerTime[i].minutes === 60) {playerTime[i].hours ++; playerTime[i].minutes = 0; playerTime[i].seconds = 0;}
                updatePie(playerIdx[i]);
            }
            
        }
        if(onSelect!==(-1))
            settingPlayer();
    }, 1000); 
}

function makeOvertime() {
    if(overtime) return;
    overtime = 1;
    let overText = document.createElement("h1");
    overText.classList.add("overtime");
    overText.textContent = "END OF QUARTER";
    const place = document.getElementById("overspace");
    place.appendChild(overText);
}

function startTime() {
    if(timing) return;
    display = document.querySelector('#time');
    timing ++;
    startTimer(display);
}

function stopTime(){
    if(!timing) return;
    timing --;
    clearInterval(timerInterval); 
}

function finalSave() {
    localStorage.setItem('xStat',JSON.stringify(xStat));
    localStorage.setItem('playerTime',JSON.stringify(playerTime));
    localStorage.setItem('scores',JSON.stringify(scores));
    localStorage.setItem('homeName',homeName);
    localStorage.setItem('awayName',awayName);
    
    return;
}