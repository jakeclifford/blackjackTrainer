const getCardIndex = (deck) => Math.floor(Math.random() * deck.length) - 1

const getCard = (deck) => {
    return deck.splice(getCardIndex(deck), 1)[0]
}

const getDeck = () => {
    const suits = ["Diamonds", "Spades", "Clubs", "Hearts"]
    const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    let cards = []
 
    for (const suit of suits){
        for (const number of numbers){
            const test = /^[a-zA-Z\u00C0-\u00ff]+$/.test(number)
            const value = 
                number == "A" ? 11 
                : test ? 10 
                : parseInt(number)
            cards.push({suit: suit, number: number, value: value})
        }
    }

    return cards
}

export {getCard, getDeck}