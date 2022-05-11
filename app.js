import {getDeck} from "./utils.js"
import Hand from "./Hand.js"

const hitButton = document.getElementById("hit")
const standButton = document.getElementById("stand")
const restartButton = document.getElementById("restart")
const startGame = document.getElementById("deal-cards")
const splitButton = document.getElementById("split")
const testButton = document.getElementById("test")
const splitHitButton = document.getElementById("split-hit")
const splitStandButton = document.getElementById("split-stand")

let balance = 1000
let bet = 0
let isSplit = false 

let deck = getDeck()
let dealerHand = new Hand()
let playerHand = new Hand()
let splitHand = new Hand()

const test = () => {
    startGame.style.display = 'none'
    document.getElementById("board").style.display =  'flex'
    bet = 10
    balance -= bet
    const first = {suit: 'Spades', number: 'A', value: 11}
    const second = {suit: 'Spades', number: 'J', value: 10}

    playerHand.heldCards = [first, second]
    dealerHand.getExtraCard(deck)
    playerHand.calculateTotal()

    if (playerHand.heldCards[0].number == playerHand.heldCards[1].number){
        splitButton.style.display = 'block'
    }

    if (playerHand.blackjack()){
        standButton.style.display = 'none'
        hitButton.style.display = 'none'
        restartButton.style.display = 'block'
        render()
        return
    } 

    standButton.style.display = 'block'
    hitButton.style.display = 'block'
    restartButton.style.display = "none"
    isSplit = false

    console.log(playerHand)
    render()
}

const dealCards = () => {
    startGame.style.display = 'none'
    document.getElementById("board").style.display =  'flex'
    bet = 10
    balance -= bet
    playerHand.getExtraCard(deck)
    playerHand.getExtraCard(deck)

    dealerHand.getExtraCard(deck)

    if (playerHand.blackjack()) return

    if (playerHand.heldCards[0].number == playerHand.heldCards[1].number){
        splitButton.style.display = 'block'
    }

    standButton.style.display = 'block'
    hitButton.style.display = 'block'
    restartButton.style.display = "none"
    isSplit = false 

    console.log(playerHand)
    render()
}

const split = () => {
    document.getElementById("split").style.display = 'block'
    splitHitButton.style.display = 'block'
    splitStandButton.style.display = 'block'

    splitHand.heldCards[0] = playerHand.heldCards.pop()
    playerHand.calculateTotal()
    splitHand.calculateTotal()
    splitHitButton.addEventListener("click", () => addCard(splitHand, "split-total"))

    document.getElementById("split-hand").innerHTML = splitHand.cardHtml()
    document.getElementById("split-total").innerHTML = splitHand.total
    splitButton.style.display ='block'
    isSplit = true
    render()
}

const addCard = (hand, display) => {
    hand.getExtraCard(deck) 
    if (hand.total > 21){
        document.getElementById(display)
            .innerHTML = `${display.total} BUST`
        winner = "YOU LOOSE"
        hitButton.style.display = 'none'
        standButton.style.display = 'none'
        restartButton.style.display = 'block'
    }
   render()
}

const dealerPlay = () => {
    hitButton.style.display = 'none'
    standButton.style.display = 'none'
    splitHitButton.style.display = 'none'
    splitStandButton.style.display = 'none'
    render()
    if (dealerHand.total <= 17){
        if (dealerHand.total == 17 && dealerHand.soft == false) {
            return
        }
        dealerHand.getExtraCard(deck)
        if (dealerHand.total > 17) {
           
        }
        setTimeout(() => {
            dealerPlay() 
        }, 1000)
    } else {
        
    } 
}

const announceWinner = () => {
    playerHand.isWinner(dealerHand)
    standButton.style.display = 'none'
    restartButton.style.display = 'block'
    render()
}

const restart = () => {
    hitButton.style.display = 'block'
    standButton.style.display = 'block'
    splitHitButton.style.display = 'none'
    splitStandButton.style.display = 'none'
    document.getElementById("split").style.display = 'none'
    winner = ""

    deck = getDeck()
    dealerHand.clearDeck()
    playerHand.clearDeck()
    console.log(isSplit)
    if (isSplit) {
        splitHand.clearDeck()
        isSplit = false 
    } 

    document.getElementById("split-hand").innerHTML = ''
    document.getElementById("split-total").innerHTML = ''

    dealCards()
}

hitButton.addEventListener("click", () => addCard(playerHand, "player-total"))
standButton.addEventListener("click", dealerPlay)
restartButton.addEventListener("click", restart)
startGame.addEventListener("click", dealCards)
splitButton.addEventListener("click", split)
testButton.addEventListener("click", test)



const render = () => {
    playerHand.handHTML()

    document.getElementById("dealer-hand").innerHTML = dealerHand.cardHtml()
    document.getElementById("dealer-total").innerHTML = dealerHand.total

    if (isSplit) {
        document.getElementById("split-hand").innerHTML = splitHand.cardHtml()
        document.getElementById("split-total").innerHTML = splitHand.total
    }
    
    document.getElementById("balance").innerHTML =  `$${balance}`
}

document.getElementById("board").style.display =  'none'
standButton.style.display = 'none'
hitButton.style.display = 'none'
restartButton.style.display = 'none'
splitButton.style.display = 'none'
splitHitButton.style.display = 'none'
splitStandButton.style.display = 'none'


