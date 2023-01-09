//module for gameBoard
const gameBoard = (() => {
    let board =  ['', '', '',   // 0  1  2
                  '', '', '',   // 3  4  5
                  '', '', ''];  // 6  7  8
    let winningCombos= [
            [0, 1, 2],[3, 4, 5], [6, 7, 8],  //horizontal
            [0, 3, 6],[1, 4, 7], [2, 5, 8],  //vertical
            [0, 4, 8] ,[2, 4, 6]];            //diagonal

    const container = document.getElementById("container");

    let round = 1;
    let playerOneTurn = true;
    let draws = 0;

    return {
        board, winningCombos,container, round, playerOneTurn, draws
    };
  })();

//Player Factory
const playerFactory = (nameInput, markerInput) => {

    let marker = markerInput;
    let name = nameInput;
    let markersArr = [];
    let score = 0;

    return { 
        markersArr ,marker, name, score
    };
  };

//module for displayController
const displayController = (() => {
    const startPage = document.getElementById("startPage");
    const xToggleOption = document.getElementById("xToggleOption");
    const oToggleOption = document.getElementById("oToggleOption");

    const playerOne = playerFactory("", true);
    const playerTwo = playerFactory("", false); 


    const renderStartPage = () => {
        startPage.classList.replace("hidden","visible");

        xToggleOption.addEventListener("click", ()=> {
            if(oToggleOption.classList.contains("oSelected")){
                oToggleOption.classList.replace("oSelected","oUnselected");
            }
                xToggleOption.classList.replace("xUnselected", "xSelected");
                activatePvpGameBtn();
                // activateAiGameBtn(); 
                playerOne.marker = true;
                playerTwo.marker = false;
        });

        oToggleOption.addEventListener("click", ()=> {
            if(xToggleOption.classList.contains("xSelected")){
                xToggleOption.classList.replace("xSelected", "xUnselected");
            }
                oToggleOption.classList.replace("oUnselected","oSelected");
                activatePvpGameBtn();
                // activateAiGameBtn();
                playerOne.marker = false;
                playerTwo.marker = true;

              
        });
    };
    const hideStartPage = () => {
        startPage.classList.replace("visible","hidden");
        xToggleOption.classList.replace("xSelected","xUnselected");
        oToggleOption.classList.replace("oSelected", "oSelected");
    };

    const pvpGameBtn = document.getElementById("pvpGameBtn");
    
    const activatePvpGameBtn = () => {
        pvpGameBtn.addEventListener('click', ()=>{
            hideStartPage();
            renderPlayerNamesFormPage();
        });
    };
    // const activateAiGameBtn = ()=> {

    // };

    const playerNamesFormPage = document.getElementById("playerNamesFormPage");
    const submitPlayerNames = document.getElementById("submitPlayerNames");
    const returnFromPlayerNames = document.getElementById("returnFromPlayerNames");
    const player1FormInput = document.getElementById("player1FormInput");
    const player2FormInput = document.getElementById("player2FormInput");

    const renderPlayerNamesFormPage = ()=>{
        playerNamesFormPage.classList.replace("hidden", "visible")

        submitPlayerNames.addEventListener("click", ()=>{
            event.preventDefault();
            if(player1FormInput.value !== "" && player2FormInput.value !== ""){

                playerOne.name = (player1FormInput.value);
                playerTwo.name = (player2FormInput.value);

                hidePlayerNamesFormPage();
                renderBoard();

            } else {
                //code an alert to pop up and tell them to enter player names
            }
        });
        returnFromPlayerNames.addEventListener("click", ()=>{
            event.preventDefault();
            hidePlayerNamesFormPage();
            renderStartPage();
        }); 
    };

    const hidePlayerNamesFormPage = ()=>{
        playerNamesFormPage.classList.replace("visible", "hidden")
        player1FormInput.value="";
        player2FormInput.value="";
    };
    
    const turnSignMarker = document.getElementById("turnSignMarker");
    const turnSignText = document.getElementById("turnSignText");
    const playerOneWinsDiv = document.getElementById("playerOneWinsDiv");
    const playerTwoWinsDiv = document.getElementById("playerTwoWinsDiv")
    const p1ScoreName = document.getElementById("p1ScoreName");
    const p1ScoreNum = document.getElementById("p1ScoreNum");
    const scoreTiesNum = document.getElementById("scoreTiesNum");
    const p2ScoreName = document.getElementById("p2ScoreName");
    const p2ScoreNum = document.getElementById("p2ScoreNum");
    const topGameboardDiv = document.getElementById("topGameboardDiv");
    const winBannerQuitBtn = document.getElementById("winBannerQuitBtn");

    const renderBoard = () =>{
        gameBoard.container.classList.replace("hidden","visible"); 
        gameBoard.playerOneTurn= true;

        //creates boxes for game.
        for (let index = 0; index <= 8; index++) {
            const boardDiv = document.createElement("div");
            topGameboardDiv.after(boardDiv);
            boardDiv.classList.add("boardDiv");      
        }


        //Gets Correct InFo on screen.
        p1ScoreName.innerHTML = playerOne.name + " (P1)";
        p2ScoreName.innerHTML = playerTwo.name + " (P2)";
        scoreTiesNum.innerHTML = gameBoard.draws;
        p1ScoreNum.innerText = playerOne.score;
        p2ScoreNum.innerHTML = playerTwo.score;
        turnSignText.innerHTML = "TURN";

        //activates restart button
        restartBtn.addEventListener("click", restartRound ,{once: true});
        
        if(playerOne.marker){

            turnSignMarker.classList.add("xTurn");

        } else{
            turnSignMarker.classList.add("oTurn");

            playerOneWinsDiv.classList.replace("scorePlayerX", "scorePlayerO");
            playerTwoWinsDiv.classList.replace("scorePlayerO", "scorePlayerX");
        };

        markerHoverBoard();
        clickOnBoardDiv();
    };

    const quitBtnPressed = () =>{
        hideBoard();
        winBackground.classList.replace("visible", "hidden");
        winBanner.classList.replace("visible", "hidden");
        gameBoard.round = 0;

        playerOne.marker = true;
        playerOne.score = 0;
        playerOne.markersArr = [];
        playerOne.name="";
        
        playerTwo.marker = false;
        playerTwo.score = 0;
        playerTwo.markersArr = [];
        playerTwo.name="";

        gameBoard.round = 1;
        gameBoard.draws = 0;

        renderStartPage();
    };

    const clickOnBoardDiv = () =>{
        document.querySelectorAll(".boardDiv").forEach((element, index)=> {
            element.addEventListener("click", ()=>{

                if(gameBoard.playerOneTurn){

                    playerOne.markersArr.push(index);
                    gameBoard.playerOneTurn = false;

                    if(playerOne.marker){
                        element.classList.replace("xMarkerEmptyOnBoard","xMarkerOnBoard")
                        turnSignMarker.classList.replace("xTurn","oTurn");
                    } else{
                        element.classList.replace("oMarkerEmptyOnBoard","oMarkerOnBoard")
                        turnSignMarker.classList.replace("oTurn","xTurn");
                    };

                } else {

                    playerTwo.markersArr.push(index);
                    gameBoard.playerOneTurn = true;

                    if(playerTwo.marker){
                        element.classList.replace("xMarkerEmptyOnBoard","xMarkerOnBoard")
                        turnSignMarker.classList.replace("xTurn","oTurn");
                    } else {
                        element.classList.replace("oMarkerEmptyOnBoard","oMarkerOnBoard")
                        turnSignMarker.classList.replace("oTurn","xTurn");

                    };

            };

            checkForWinningCombos();


            }, {once:true});

    });
        
            
    }
    const markerHoverBoard = ()=>{
    document.querySelectorAll(".boardDiv").forEach((element)=>{
        element.addEventListener("mouseover",()=>{
            if(!element.classList.contains("xMarkerOnBoard") && !element.classList.contains("oMarkerOnBoard")){
                if(gameBoard.playerOneTurn){
                    if(playerOne.marker){
                        element.classList.add("xMarkerEmptyOnBoard")
                    } else{
                        element.classList.add("oMarkerEmptyOnBoard")
                    };
                } else{
                    if(playerTwo.marker){
                        element.classList.add("xMarkerEmptyOnBoard")
                    } else {
                        element.classList.add("oMarkerEmptyOnBoard")
                    };
                };
            }       
        });
        element.addEventListener("mouseout",()=>{
            element.classList.remove("xMarkerEmptyOnBoard","oMarkerEmptyOnBoard");
        });

    });
    }


    const winBackground = document.getElementById("winBackground");
    const winBanner = document.getElementById("winBanner");
    const winBannerFirstText = document.getElementById("winBannerFirstText");
    const winBannerMiddleDiv = document.getElementById("winBannerMiddleDiv");
    const winBannerBigMarker = document.getElementById("winBannerBigMarker");
    const winBannerBigMainText = document.getElementById("winBannerBigMainText");
    const winBannerNextRoundBtn = document.getElementById("winBannerNextRoundBtn");

    const checkForWinningCombos = ()=>{
        let combo = [];
        let markersCount =0;

        let playerOneWin = false;
        let playerTwoWin = false;
        
        for (let i = 0; i < gameBoard.winningCombos.length; i++) {

            combo = gameBoard.winningCombos[i];
            markersCount = playerOne.markersArr.length + playerTwo.markersArr.length;
            playerOneWin = (playerOne.markersArr.includes(combo[0]) && playerOne.markersArr.includes(combo[1]) && playerOne.markersArr.includes(combo[2]));
            playerTwoWin = (playerTwo.markersArr.includes(combo[0]) && playerTwo.markersArr.includes(combo[1]) && playerTwo.markersArr.includes(combo[2]));
            
            const boardDivArr = document.querySelectorAll(".boardDiv");
            if(playerOneWin){

                playerOne.score++;
                p1ScoreNum.innerHTML = playerOne.score;

                for (let index = 0; index < combo.length; index++) {
                    if(playerOne.marker){
                        boardDivArr[combo[index]].classList.replace("xMarkerOnBoard","xWinnerMarkerOnBoard")
                        turnSignMarker.classList.replace("oTurn","xTurn");
                    } else {
                        boardDivArr[combo[index]].classList.replace("oMarkerOnBoard","oWinnerMarkerOnBoard")  
                        turnSignMarker.classList.replace("xTurn","oTurn");    
                    };
                };
                renderWinResultsPage(playerOne);

                break;

            } else if (playerTwoWin){

                playerTwo.score++;
                p2ScoreNum.innerHTML = playerTwo.score;

                 for (let index = 0; index < combo.length; index++) {
                    if(playerTwo.marker){
                        boardDivArr[combo[index]].classList.replace("xMarkerOnBoard","xWinnerMarkerOnBoard")
                        turnSignMarker.classList.replace("oTurn","xTurn");
                    } else {
                        boardDivArr[combo[index]].classList.replace("oMarkerOnBoard","oWinnerMarkerOnBoard") 
                        turnSignMarker.classList.replace("xTurn","oTurn");                   
                    };
                };
                renderWinResultsPage(playerTwo);
                break;
            }
    }

    if( markersCount >= 9 && !playerOneWin && !playerTwoWin){
        renderTieResultsPage();
        gameBoard.draws++;
        scoreTiesNum.innerHTML = gameBoard.draws;
    };

    }
    const renderWinResultsPage= (player)=>{
        winBannerBigMarker.classList.remove("xWinBigMarker", "oWinBigMarker");
        winBannerFirstText.innerHTML =( player.name + " Won!");
        turnSignText.innerHTML = "WINS";
        winBannerBigMainText.innerHTML = "Takes The Round";
        winBannerNextRoundBtn.addEventListener("click", startNextRound,{once:true});
        winBannerQuitBtn.addEventListener("click", quitBtnPressed,{once: true});

        if( player.marker ){
            winBannerBigMarker.classList.add("xWinBigMarker");
            winBannerBigMainText.style.color = "cyan";
            winBannerNextRoundBtn.style.backgroundColor = "cyan";
        } else {
            winBannerBigMarker.classList.add("oWinBigMarker");
            winBannerBigMainText.style.color = "rgb(250, 191, 80)";
            winBannerNextRoundBtn.style.backgroundColor = "rgb(250, 191, 80)";
        };

        setTimeout(()=> {
            winBackground.classList.replace("hidden", "visible");
            winBanner.classList.replace("hidden", "visible");
         }, 500);
    };
    const renderTieResultsPage = ()=>{
        winBackground.classList.replace("hidden", "visible");
        winBanner.classList.replace("hidden", "visible");
        winBannerBigMarker.classList.remove("xWinBigMarker", "oWinBigMarker");

        winBannerFirstText.innerHTML ="";
        winBannerBigMainText.innerHTML = "Round Tied";
        winBannerBigMainText.style.color = "aliceblue";
        winBannerNextRoundBtn.style.backgroundColor = "aliceblue";
        winBannerBigMainText.style.marginLeft = "-100px"

        winBannerNextRoundBtn.addEventListener("click", ()=>{
            startNextRound();
            winBannerBigMainText.style.marginLeft = "0";
        },{once:true});
        winBannerQuitBtn.addEventListener("click", ()=>{
            quitBtnPressed();
            winBannerBigMainText.style.marginLeft = "0";
        },{once:true});

    };
    const restartBtn = document.getElementById("restartBtn");

    const restartRound = ()=> {
        turnSignMarker.classList.remove("oTurn", "xTurn");
        turnSignText.innerHTML = "Turn";
        playerOne.markersArr =[];
        playerTwo.markersArr = [];

        hideBoard();
        renderBoard();
    };

    const startNextRound =()=>{
        restartRound();
        winBackground.classList.replace("visible", "hidden");
        winBanner.classList.replace("visible", "hidden");
        gameBoard.round++        
    }

    const hideBoard = ()=>{
        gameBoard.container.classList.replace("visible", "hidden");

        document.querySelectorAll(".boardDiv").forEach((element) => {
            element.remove();
        });

    };

    return {
        renderBoard, hideBoard,
        renderStartPage, hideStartPage,
        };
  })();
  
displayController.renderStartPage();