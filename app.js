import {getDeck} from "./utils.js"
import Hand from "./Hand.js"
import {checkOptimal} from "./optimal.js"

let balance = 1000
let double = false
let bet = 10

balance -= 10
let deck = getDeck()
let dealerHand = new Hand('dealer')
let playerHand = new Hand('main')
let splitHand = new Hand('split')

document.getElementById('hideOverlay').addEventListener("click", () => {
    document.getElementById('overlay').style.display = "none"
    document.getElementById('score').style.display = "block"
    document.getElementById('game').style.display = "flex"
})

const renderBalance = () => {
    document.getElementById('balance').innerHTML = `$${balance}`
}
renderBalance()

const newHand = () => {
    balance -= bet
    renderBalance()
    deck = getDeck()
    double = false

    dealerHand = new Hand('dealer')
    playerHand = new Hand('main')
    splitHand = new Hand('split')

    document.getElementById("split").style.display = 'none'

    playerHand.getExtraCard(deck)
    playerHand.getExtraCard(deck)
    dealerHand.getExtraCard(deck)
    dealerHand.dealer = true
    playerHand.finished = false

    dealerHand.render(deck)
    playerHand.render(deck)
}

const split = () => {
    balance -= bet
    renderBalance()
    document.getElementById("split").style.display = 'block'
    splitHand.heldCards[0] = playerHand.heldCards.pop()
    console.log(splitHand)
    splitHand.calculateTotal(deck)
    splitHand.render(deck)
    splitHand.finished = false
    playerHand.split = true
    dealerHand.splitReady = false
    playerHand.calculateTotal(deck)
    playerHand.render(deck)
}

const dealerPlay = (hand) => {
    if (dealerHand.total < 17){
        dealerHand.getExtraCard(deck)
        if (dealerHand.total >= 17) {
            isWinner(hand, dealerHand, deck)
            dealerHand.render(deck)
            return
        }
        setTimeout(() => {
            dealerPlay(hand) 
        }, 700)
    } else {
        isWinner(hand, dealerHand, deck)
    } 
}

const isWinner = (hand, dealer, deck) => {
    if (hand.total > 21){
        hand.total = `${dealer.total} BUST`
        hand.result = "YOU WIN"
        double ? balance += bet * 4 : balance += bet * 2

    }
    else if (dealer.total == hand.total){
        hand.result = "DRAW"
        balance += bet
    }
    else if (dealer.total > hand.total && dealer.total <= 22){
        hand.result = "DEALER WINS"
    }
    else {
        hand.result = "YOU WIN"
        double ? balance += bet * 4 : balance += bet * 2
    }
    hand.render(deck)
    renderBalance()
}

const dealer = () => {
    if (splitHand.finished == false || playerHand.finished == false) return
    dealerPlay(playerHand)
    if (splitHand.finished) {
        dealerPlay(splitHand)
    }
}

const eventSplit = () => {
    document.getElementById(`split-button`)
    .addEventListener("click", () => {
        checkOptimal(dealerHand, playerHand, 'S')
        split()
    })
}

const blackjackBalance = () => balance += bet * 2

const doubleBalance = () => {
    balance -= bet
    double = true 
}


playerHand.getExtraCard(deck)
playerHand.getExtraCard(deck)
dealerHand.getExtraCard(deck)

document.getElementById('restart').addEventListener("click", newHand)


export {dealer, eventSplit, blackjackBalance, 
    doubleBalance, renderBalance, dealerHand}
