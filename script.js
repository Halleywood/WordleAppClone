//---------------------------------------------------------------------------------  CONSTANTS  -------------------------------------------
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')
const messageDisplay = document.querySelector('.message-container')
const refreshPageButton =document.querySelector('.refresh')


//declare the global variable but dont assign it to anything yet, will be assigned a random word in the getWordle()
let wordle

const getWord = () => {
    fetch('/word')
        .then(response => response.json())
        .then(json => {
            wordle = json.toUpperCase()
            console.log("WORDLE=", wordle)
        })
        .catch(err => console.log("YOU HAVE AN ERROR:", err))
}

getWord()
//using let because these will change with the clicked keys! But we want to start at 0 Row 0 tile. 
//when we enter a letter from the handleClick->addLetter function it will increment the currentTile
//when we hit enter to check our guess, handleClick *if key=enter* ->checkGuess function will increment row! 
let currentRow = 0
let currentTile = 0
let isGameOver = false

//we create an array with all possible keys 
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<'
]
//create our guess rows as an array matrix, in the elements section as we add the rows to our tile div we will assign each row and space an id via the array indices. 
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
//this handles or redirects based on what key was pressed. As long as we are not at the last row or the last tile 
//if the key is delete --> deleteLetter function
//if the key is enter --> checkRow function
//anything else will trigger addLetter function 
const handleClick = (key) => {
    if( !isGameOver){
        if (currentRow < 6 && currentTile <= 5) {
            // console.log("you clicked " + key + "!")
            if (key === '<<') {
                deleteLetter()
                console.log(guessRows)
                return
            }
            if (key === 'ENTER') {
                checkRow()
                return
            }
            addLetter(key)
        }
    }
    // console.log("you clicked " + key + "!")
    // console.log("currentTile=", currentTile)
}
//first checks that we are greater than 0 otherwise you cannot delete anymore 
//sets currentTile-- 
//we then get that specific tile by finding it's ID via current row and tile index 
//set the text content of that tile to ''
//set the value in to array matrix back to ''
//remove the data assigned to it. 
const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}
//we find the exact tile by plugging in the currentRow and currentTile. We start at 0-0 but as we trigger this addLetter function
//we increment the currentTile 
//we find the tile via getElementById with the currentRow and currentTile making the ID unique to that tile 
//we pull the letter assigned to it when we loop through the keys array known there as "key" and assign it to its textContent for the tileDisplay div 
//we also set the data attribute as that letter/key and increment currentTile. 
const addLetter = (letter) => {
    if (currentTile < 5) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log("guessRows is:", guessRows)
    }

}
const refreshPage =()=>{
    console.log("refreshing page")
    window.location.reload()
}
const playAgain =()=>{
    const playAgainButton = document.createElement('button')
    playAgainButton.innerHTML='<p>Tap here to play again</p>';
    playAgainButton.addEventListener('click', () => refreshPage())
    refreshPageButton.append(playAgainButton)
   
}


const checkRow = () => {

    //takes the five strings and joins them into one 
    const guess = guessRows[currentRow].join('')
    //last tile is index of 4 but at the end of the function currentTile is incremented to 5**
    if (currentTile > 4) {
        fetch(`/check/?word=${guess}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json === 'Entry word not found') {
                    showMessage("not a word")
                    return
                }

                else {
                    flipTile()
                    if (guess == wordle) {
                        isGameOver = true
                        if( currentRow ===0 ){
                            showMessage("WOWZA!")
                            playAgain()
                        }
                        else if(currentRow === 1){
                            showMessage("You're sharp today!")
                            playAgain()
                        }
                        else if(currentRow === 2){
                            showMessage("EXCELLENT")
                            playAgain()
                        }
                        else if(currentRow ===3 ){
                            showMessage("You did it!")
                            playAgain()
                        }
                        else if(currentRow ===4){
                            showMessage("Way to go!")
                            playAgain()
                        }
                        else{
                            showMessage("Phew!")
                         
                        }
                        return
                    }
                    else {
                        if (currentRow >= 5) {
                            showMessage("oophh. better luck next time, pal")
                            isGameOver = true
                            playAgain()
                            return
                        }
                        if (currentRow < 5) {
                            currentRow++
                            currentTile = 0
                            return
                        }
                    }
                }
            })
            .catch(err => console.log(err))

    }
}



const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 1500)
}

//colors the keyboard keys so you know what you have guessed! 
const addColorToKeyboard = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

//colors the tiles of the guess and then calls the colorKeyboard function above. 
const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    //guess array of objects, each with a letter and color. 
    const guess = []
    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
    })
    guess.forEach((guess) => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })
    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    // rowTiles.forEach((tile, index )=> {
    //     const dataLetter = tile.getAttribute('data')
    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flipColor')
            tile.classList.add(guess[index].color)
            addColorToKeyboard(guess[index].letter, guess[index].color)
        }, 750 * index)


        //     setTimeout(() => {
        //         tile.classList.add('flipColor')
        //         if (dataLetter == wordle[index]) {
        //             tile.classList.add('green-overlay')
        //             addColorToKeyboard(dataLetter, 'green-overlay')
        //         }
        //         else if (wordle.includes(dataLetter)) {
        //             tile.classList.add('yellow-overlay')
        //             addColorToKeyboard(dataLetter, 'yellow-overlay')
        //         }
        //         else {
        //             tile.classList.add('grey-overlay')
        //             addColorToKeyboard(dataLetter, 'grey-overlay')
        //         }
        //     }, 
        // })

    })
}
//---------------------------------------------------------------------------------   ELEMENTS   -------------------------------------------
//then create an array of letters, we then loop through that array and create a button for each letter, 
//then we apply a text attribute to each button which is the letter we assign each button a unique ID to keep track of them later on 
//we add an event listener to each one
//we then add all of these button keys to our keyboard div via the constant we created at top called KEYBOARD. Whenever you 
//create an element have to put it somewhere** 
keys.forEach(key => {
    const buttonElement = document.createElement('button')

    buttonElement.textContent = key

    buttonElement.setAttribute('id', key)

    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)

})

//we created our matrix above, here we are appending each ROW to the tile-container div and assigning it an id. 
//We then have a forLoop inside of a forLoop as we take each row and create div elements for each of the five spaces and append them 
//into each row. 
// *append the 6 rows, append the 5 tiles into each row. 
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')

    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)

    guessRow.forEach((tile, tileIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + tileIndex)
        tileElement.setAttribute('class', 'tile')
        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})



//---------------------------------------------------------------------------------  LOGIC  -------------------------------------------