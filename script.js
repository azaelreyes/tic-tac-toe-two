
//module for gameBoard
const gameBoard = (() => {
    let board =  ['', '', '',   // 0  1  2
                  '', '', '',   // 3  4  5
                  '', '', ''];  // 6  7  8
    let winningCombos= [
            [0, 1, 2],[3, 4, 5], [6, 7, 8],  //horizontal
            [0, 3, 6],[1, 4, 7], [2, 5, 8],  //vertical
            [0, 4, 8] ,[2, 4, 6]];            //diagonal

    const containerDiv = document.getElementById("container");

    return {
        board, 
        winningCombos,
        containerDiv
    };
  })();


//module for displayController
const displayController = (() => {
    const newGameMenuDiv = document.getElementById("newGameMenu");
    const renderNewGameMenu = () => {
        newGameMenuDiv.classList.add("visible");
        newGameMenuDiv.classList.remove("hidden");
        playerNamesFormMenu.classList.add("hidden");
        gameBoard.containerDiv.classList.add("hidden");
        pvpGameButtonPressed();
    };
    const hideNewGameMenu = () => {
        newGameMenuDiv.classList.add("hidden");        
    };
    const pvpGameButtonPressed = () => {
        const newGamePvpButton = document.getElementById("newGamePvpButton");
        newGamePvpButton.addEventListener('click', ()=>{
            console.log("Clicked");
            hideNewGameMenu();
            renderPlayerNamesForm();
        });
    };
    const playerNamesFormMenu = document.getElementById("playerNamesFormMenu");
    
    const renderPlayerNamesForm = ()=>{
        playerNamesFormMenu.classList.add("visible");
        playerNamesFormMenu.classList.remove("hidden");
    };

    const hidePlayerNamesForm = ()=>{
        playerNamesFormMenu.classList.add("hidden");
        player1Name.value="";
        player2Name.value="";
    };

    let playerOneTurn= true;
    const oMakerPlayerOneTurn = () => {
        playerOneTurn = false;
    };

    let xMarkersArr = [];
    let oMarkersArr = [];
    const boardDivArr = document.querySelectorAll(".boardDiv");
    
    const markerHoverBoard = ()=>{

        boardDivArr.forEach((element)=>{
            element.addEventListener("mouseover",()=>{
                if(!element.classList.contains("xMarkerOnBoard") && !element.classList.contains("oMarkerOnBoard")){
                    if(playerOneTurn){
                        element.classList.add("xMarkerEmptyOnBoard")
                    } else{
                        element.classList.add("oMarkerEmptyOnBoard")
                    };
                }       
            });
            element.addEventListener("mouseout",()=>{
                element.classList.remove("xMarkerEmptyOnBoard","oMarkerEmptyOnBoard");
            } )
            element.addEventListener("click",()=>{
                element.classList.remove("xMarkerEmptyOnBoard","oMarkerEmptyOnBoard");
            })

        });
    }
    const toggleMarkerTurnSign = document.getElementById("toggleMarkerTurnSign");


    const renderBoard = () =>{
        gameBoard.containerDiv.classList.add("visible");
        gameBoard.containerDiv.classList.remove('hidden');
        newGameMenuDiv.classList.add("hidden");
        playerNamesFormMenu.classList.add("hidden");
        boardDivArr.forEach((element,index) => {
            markerHoverBoard();

            element.addEventListener("click",() => {
                if(playerOneTurn){
                    element.classList.add("xMarkerOnBoard");
                    xMarkersArr.push(index);
                    playerOneTurn = false;
                    toggleMarkerTurnSign.classList.add("oTurn")
                    toggleMarkerTurnSign.classList.remove("xTurn")

                } else if(!playerOneTurn){
                    element.classList.add("oMarkerOnBoard");
                    oMarkersArr.push(index);
                    playerOneTurn = true;
                    toggleMarkerTurnSign.classList.add("xTurn")
                    toggleMarkerTurnSign.classList.remove("oTurn")
                }


                checkForWinningCombos();
            }, {once : true});

        });
    };


    

    const checkForWinningCombos = ()=>{
        let combo = [];
        let markers =0;
        let xMarkersWinCombosCheck = false;
        let oMarkersWinCombosCheck = false;
        let tieCheck = false;
        for (let i = 0; i < gameBoard.winningCombos.length; i++) {
            combo = gameBoard.winningCombos[i];
            markers = oMarkersArr.length+xMarkersArr.length;
            xMarkersWinCombosCheck = (xMarkersArr.includes(combo[0]) && xMarkersArr.includes(combo[1]) 
                                        && xMarkersArr.includes(combo[2]));
            oMarkersWinCombosCheck = (oMarkersArr.includes(combo[0]) && oMarkersArr.includes(combo[1]) 
                                        && oMarkersArr.includes(combo[2]))
            tieCheck = (markers>=9 && !xMarkersWinCombosCheck && !oMarkersWinCombosCheck)

            
            if (!playerOneTurn && xMarkersWinCombosCheck) {
                console.log("x wins");
                for (let index = 0; index < combo.length; index++) {
                    boardDivArr[combo[index]].classList.remove("xMarkerOnBoard");
                    boardDivArr[combo[index]].classList.add("xWinnerMarkerOnBoard");
                }
                break;
            } else if(playerOneTurn && oMarkersWinCombosCheck) {
                console.log("o wins");
                for (let index = 0; index < combo.length; index++) {
                    boardDivArr[combo[index]].classList.remove("oMarkerOnBoard");
                    boardDivArr[combo[index]].classList.add("oWinnerMarkerOnBoard");
                }
                break;
            } 
    }
    if(tieCheck){
        console.log("tie");
    };

}

const hideBoard = ()=>{
    gameBoard.containerDiv.classList.add("hidden");
    gameBoard.containerDiv.classList.remove("visible");

    boardDivArr.forEach((element,index) => {
        element.classList.remove("xMarkerOnBoard", "oMarkerOnBoard");
    });
}

    // const winnerFound = (marker)=> {
    //     if(marker == "x"){

    //     } else if(marker == "o"){

    //     } else if(marker == "tie"){

    //     }
    // }



    return {
        hideBoard,
        renderBoard,
        renderNewGameMenu,
        newGameMenuDiv,
        hideNewGameMenu,
        hidePlayerNamesForm,
        oMakerPlayerOneTurn,
        toggleMarkerTurnSign
        };
  })();

  displayController.renderNewGameMenu();


//factory for players
const playerFactory = (name, marker) => {

    return {
        
    };
  };

// Code For Main Menu
const xMarkerToggleDiv = document.getElementById("xMarkerToggleDiv");
    const oMarkerToggleDiv = document.getElementById("oMarkerToggleDiv");
    
    
    // Code for selecting Player 1 marker

    xMarkerToggleDiv.addEventListener("click", ()=> {
        if(oMarkerToggleDiv.classList.contains("oMarkerToggleClicked")){
            oMarkerToggleDiv.classList.remove("oMarkerToggleClicked");
        }
        xMarkerToggleDiv.classList.add("xMarkerToggleClicked");
    });
    
    oMarkerToggleDiv.addEventListener("click", ()=> {
        if(xMarkerToggleDiv.classList.contains("xMarkerToggleClicked")){
            xMarkerToggleDiv.classList.remove("xMarkerToggleClicked");
            toggleMarkerTurnSign.classList.add("xTurn")
            toggleMarkerTurnSign.classList.remove("oTurn")
    
        }
        oMarkerToggleDiv.classList.add("oMarkerToggleClicked")
        displayController.oMakerPlayerOneTurn(); //makes o be first marker 
        displayController.toggleMarkerTurnSign.classList.add("oTurn")
        displayController.toggleMarkerTurnSign.classList.remove("xTurn")
    });
const submitPlayerNames = document.getElementById("submitPlayerNames");
const returnFromPlayerNames = document.getElementById("returnFromPlayerNames");

const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

submitPlayerNames.addEventListener("click", ()=>{
    event.preventDefault();
    if(player1Name.value !== "" && player2Name.value !== ""){
        console.log("Submit Pressed with names filled in..");
        displayController.hidePlayerNamesForm();
        displayController.renderBoard();
    }
});

returnFromPlayerNames.addEventListener("click", ()=>{
    event.preventDefault();
    displayController.hidePlayerNamesForm();
    displayController.renderNewGameMenu();
});



// const playerOneMarker = (() => {
    
    
//     return {
        
//     };
//   })();