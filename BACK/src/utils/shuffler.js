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

export function shuffler(cards, players) {
    try{
        let j = 0;
        for(let i = 0; i < cards.length; i++){
            j = Math.floor(Math.random() * cards.length);
            [cards[i], cards[j]] = [cards[j], cards[i]]
        } 
        const baraja = divisor(cards, players)        
        return baraja
    }catch(err){
        console.log(err)
    }
}


let b = { antonio: {nombre : "jose", edad: 23, a: { b: "hola"} }}
b["as"] = "holi"