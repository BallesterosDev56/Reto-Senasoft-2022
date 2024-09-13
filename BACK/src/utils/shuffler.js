function divisor(cards, numero){
    try{
        let baraja = []
        for(let i = 0; i < numero; i++){
            baraja.push([...cards.splice(0,4)])
        }
        return baraja
    }catch(err){
        console.log(err)
    }
}

export function shuffler(cards, players = 0, di = false) {
    try{
        let j = 0;
        for(let i = 0; i < cards.length; i++){
            j = Math.floor(Math.random() * cards.length);
            [cards[i], cards[j]] = [cards[j], cards[i]]
        } 
        if(di){
            return cards
        }
        const baraja = divisor(cards, players)
        return baraja
    }catch(err){
        console.log(err)
    }
}