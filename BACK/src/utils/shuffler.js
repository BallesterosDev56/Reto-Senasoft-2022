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

export async function shuffler(cards, players) {
    try{
        let j = 0;
        for(let i = 0; i < cards.length; i++){
            j = Math.floor(Math.random() * cards.length);
            [cards[i], cards[j]] = [cards[j], cards[i]]
        } 
        const baraja = divisor(cards, players)
        console.log(baraja);
        
        return baraja
    }catch(err){
        console.log(err)
    }
}

let a = [
    {id:'A1', velocidad:1  ,nombre: 'juan2'},
    {id:'A2', velocidad:2  ,nombre: 'juan'},
    {id:'A3', velocidad:3  ,nombre: 'juan3'},
    {id:'A4', velocidad:4  ,nombre: 'juan4'},
    {id:'B1', velocidad:5  ,nombre: 'juan'},
    {id:'B2', velocidad:6  ,nombre: 'juan2'},
    {id:'B3', velocidad:7  ,nombre: 'juan3'},
    {id:'B4', velocidad:8  ,nombre: 'juan4'},
    {id:'C1', velocidad:9  ,nombre: 'juan'},
    {id:'C2', velocidad:10  ,nombre: 'juan2'},
    {id:'C3', velocidad:11  ,nombre: 'juan3'},
    {id:'C4', velocidad:12  ,nombre: 'juan4'},
    {id:'D1', velocidad:13  ,nombre: 'juan'},
    {id:'D2', velocidad:14  ,nombre: 'juan2'},
    {id:'D3', velocidad:15  ,nombre: 'juan3'},
    {id:'D4', velocidad:16  ,nombre: 'juan4'},
    {id:'E1', velocidad:21  ,nombre: 'juan'},
    {id:'E2', velocidad:22  ,nombre: 'juan2'},
    {id:'E3', velocidad:3  ,nombre: 'juan3'},
    {id:'E4', velocidad:4  ,nombre: 'juan4'},
    {id:'F1', velocidad:5  ,nombre: 'juan'},
    {id:'F2', velocidad:6  ,nombre: 'juan2'},
    {id:'F3', velocidad:23  ,nombre: 'juan3'},
    {id:'F4', velocidad:66  ,nombre: 'juan4'},
    {id:'G1', velocidad:2  ,nombre: 'juan'},
    {id:'G2', velocidad:3  ,nombre: 'juan2'},
    {id:'G3', velocidad:35  ,nombre: 'juan3'},
    {id:'G4', velocidad:22  ,nombre: 'juan4'},
    {id:'H1', velocidad:3  ,nombre: 'juan'},
    {id:'H2', velocidad:83  ,nombre: 'juan2'},
    {id:'H3', velocidad:82  ,nombre: 'juan3'},
    {id:'H4', velocidad:38  ,nombre: 'juan4'}
]

let b = { antonio: {nombre : "jose", edad: 23, a: { b: "hola"} }}
b["as"] = "holi"
console.log(b["antonio"].a["b"])
