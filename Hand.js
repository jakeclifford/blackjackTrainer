import {getCard} from "./utils.js"
import {dealer, eventSplit,renderBalance, 
    blackjackBalance, doubleBalance, dealerHand} from "./app.js"
import {checkOptimal} from "./optimal.js"


class Hand {
    constructor(name){
        this.name = name
        this.heldCards = []
        this.soft = false
        this.winner = ""
        this.score = 0
        this.result = ""
        this.isButtons = false
        this.split = false
        this.dealer = false
    }

    /* 
    Potentially do all scoring within the hand
    Buttons for each hand call this....
    */
    
    getExtraCard(deck){
        this.heldCards.push(getCard(deck))
        this.calculateTotal(deck)
        this.finished = false
        if (this.total > 21){
            this.total = `${this.total} BUST`
            if (this.isButtons == true){
                document.getElementById(`${this.name}-buttons`).style.display = 'none'
            } 
            if (this.dealer == false){this.result = "Dealer Wins"}
            this.finished = true
            this.isButtons = false
        }
        this.render(deck)
    }

    buttons(deck){
        if (this.blackjack == true) return ""
        if (this.name != "dealer" && this.finished != true){
            this.isButtons = true
            let buttons = `<div class="buttons" id="${this.name}-buttons">
                        <button id="${this.name}-hit">Hit</button> 
                        <button id="${this.name}-stand">Stand</button>`
            if (this.name == 'main' && this.heldCards.length > 1){
                if (this.heldCards[0].number == this.heldCards[1].number){
                    buttons += `<button id="split-button">Split</button>`
                    this.splitReady = true
                }
                if (this.heldCards.length == 2 && this.split == false){
                    buttons += `<button id="double-button">Double</button>` 
                }
            }
            buttons += `</div>`
            return buttons
        } else {
            return ""
        }
        
    }

    handHTML(deck){
        let buttons = ""
        buttons = this.buttons(deck)
        return `
                <div class="hand" id="${this.name}-hand">
                    <h3 class="total" id="${this.name}-total">${this.total}</h3>
                    ${this.cardHtml()}
                    ${buttons}
                </div>
                <div>
                <h3 class="result" id="${this.name}-result">${this.result}</h3>
                `
    }
 
    countAces(){
        let aces = 0
        for (let card of this.heldCards){
            if (card.value == 11){
                this.soft = true
                aces += 1
            }
        }
        return aces
    }

    calculateTotal(deck){
        let total = this.heldCards.map(card => card.value)
        .reduce((total, current) => total + current)

        let aces = this.countAces()

        while (aces > 0){
            if (total <= 21) break 
            total -= 10 
            aces -= 1
            this.soft = false
        }

        this.total = total

        if (this.heldCards.length == 2 && total == 21){
            this.blackjackWin(deck)
            blackjackBalance()
        }
    }

    cardHtml(){
        return this.heldCards.map((card) => {
                return `<div class="card">
                            <p class="card-value">${card.number}</p>
                            <img class="suit" src="images/${card.suit}.png">
                        </div>`
        }).join('')

    }


    blackjackWin(deck){
        this.result = "BLACK JACK"
        this.blackjack = true
        this.isButtons = false 
        this.render(deck)
    }

    finishDeck(deck){
        console.log(this)
        this.finished = true
        this.isButtons  = false
        this.render(deck)
        console.log(this)
        dealer()
    }

    clearDeck(){
        this.heldCards = []
    }

    render(deck){
        document.getElementById(this.name).innerHTML = this.handHTML(deck)
        if (this.isButtons){
            document.getElementById(`${this.name}-hit`)
            .addEventListener("click", () => {
                checkOptimal(dealerHand, this, 'H')
                this.getExtraCard(deck)
            })
            document.getElementById(`${this.name}-stand`)
            .addEventListener("click", () => {
                checkOptimal(dealerHand, this, 'S')
                this.finishDeck(deck)
            })
            if (this.heldCards.length == 2){
                document.getElementById(`double-button`)
                .addEventListener("click", () => {
                    checkOptimal(dealerHand, this, 'D')
                    doubleBalance()
                    this.getExtraCard(deck)
                })
            }
        }

        if (this.splitReady) {
            eventSplit()
        }

        renderBalance()
    }

}

export default Hand