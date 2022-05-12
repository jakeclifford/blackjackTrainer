import { dealerHand } from "./app.js"

let scoreHtml = document.getElementById('iscorrect')

const hardOptimal = [null, null, 
    ['H', 'D', 'D', 'H', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'H', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'H', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'H', 'D', 'H', 'H', 'H', 'H', 'H'], 
]

const softOptimal = [null, null, 
    ['H', 'D', 'D', 'H', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'H', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['D', 'D', 'D', 'S', 'S', 'S', 'S', 'S'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'H', 'D', 'H', 'H', 'H', 'H', 'H'],
    ['H', 'H', 'D', 'H', 'H', 'H', 'H', 'H'], 
]

const splitOptimal = [null, null,
    ['N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'Y', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y'],
    ['Y', 'Y', 'N', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y'],
    ['Y', 'Y', 'N', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y'],
    ['Y', 'Y', 'N', 'N', 'Y', 'Y', 'Y', 'Y', 'N', 'Y'],
    ['Y', 'Y', 'N', 'N', 'N', 'Y', 'Y', 'N', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'Y'],
    ['N', 'N', 'N', 'N', 'N', 'N', 'Y', 'N', 'N', 'Y'],
]

const checkOptimal = (dealerHand, playerHand, button) => {
    console.log(playerHand)
    if (playerHand.heldCards.length > 1 
        && playerHand.heldCards[0].number 
        == playerHand.heldCards[1].number){
        const shouldSplit = splitCheck(dealerHand, playerHand)
        if (button == 'S'){
            if (shouldSplit == 'N') return scoreHtml.innerHTML = 'Incorrect'
            scoreHtml.innerHTML = 'Correct'
        } else {
            if (shouldSplit == 'Y') return scoreHtml.innerHTML = 'Incorrect'
        }
    }

    if (playerHand.soft){
        console.log('soft')
    }

    let whichMove = hardTotal(dealerHand.total, playerHand.total) 
    
    if (whichMove == 'D' && playerHand.split){
        whichMove = 'H'
    }
    
    if (whichMove == button){
        scoreHtml.innerHTML = 'Correct'
    } else {
        scoreHtml.innerHTML = 'Incorrect'
    }
}

const splitCheck = (dealerHand, playerHand) => {
    return splitOptimal[dealerHand.total][playerHand.total / 2 - 2]
}

const hardTotal = (dealerScore, playerScore) => {
	if (playerScore >= 17) return "S"
	if (playerScore <= 8) return "H"
  return hardOptimal[dealerScore][playerScore - 9]
}

console.log(hardTotal(2, 12))

export {checkOptimal}
