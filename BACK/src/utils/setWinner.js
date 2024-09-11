export function setWinner(cards, category) {
    try{
        let max = {cilindraje: 0 , potencia: 0, topSpeed: 0 }
        let winner = [max.id]
        cards.forEach( cardObj => {
            
            let card = cardObj.card
            if(max[category] < card[category]){
                max = card
                winner = [cardObj.id]
            } else if (card[category] === max[category]) {
                // Si encontramos un valor igual al máximo, añadimos la carta a los ganadores
                winner.push(cardObj.id)
            }
        })
        if(winner.length > 1){
            return "draw"
        }else{
            return winner[0]
        }
        
    }catch(err){
        console.log(err)
    }
}

let a = [
    'hola',
    'cilindraje',
    [
        {id: "A1", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1725990019394_toyota_corolla.png",modelo: "Corolla", cilindraje: 1800, potencia: 139, topSpeed: 180 },
        { id: "A2", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1725990189538_Honda _Civic.png" ,modelo: "Civic", cilindraje: 2000, potencia: 158, topSpeed: 200 },
        { id: "A3", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1725990335053_Ford_Mustang.png" ,modelo: "Mustang", cilindraje: 5000, potencia: 450, topSpeed: 250 },
        { id: "A4", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1725990471098_Chevrolet_Camaro.png",modelo: "Camaro", cilindraje: 6200, potencia: 455, topSpeed: 290 },
        { id: "B1", photo: "",modelo: "M3", cilindraje: 3000 , potencia: 473, topSpeed: 250 },
        { id: "B2", photo: "",modelo: "A4", cilindraje: 2000, potencia: 201, topSpeed: 240 },
        { id: "B3", photo: "",modelo: "C-Class", cilindraje: 2000, potencia: 255, topSpeed: 250 },
        { id: "B4", photo: "",modelo: "Model S", cilindraje: "Eléctrico", potencia: 670, topSpeed: 322 },
        { id: "C1", photo: "",modelo: "GT-R", cilindraje: 3800, potencia: 565, topSpeed: 315 },
        { id: "C2", photo: "",modelo: "911", cilindraje: 3000, potencia: 443, topSpeed: 310 },
        { id: "C3", photo: "",modelo: "Huracan", cilindraje: 5200, potencia: 631, topSpeed: 325 },
        { id: "C4", photo: "",modelo: "488", cilindraje: 3902, potencia: 661, topSpeed: 330 },
        { id: "D1", photo: "",modelo: "720S", cilindraje: 3994, potencia: 710, topSpeed: 341 },
        { id: "D2", photo: "",modelo: "Vantage", cilindraje: 4000 , potencia: 503, topSpeed: 314 },
        { id: "D3", photo: "",modelo: "Chiron", cilindraje: 8000, potencia: 1500, topSpeed: 420 },
        { id: "D4", photo: "",modelo: "MX-5 Miata", cilindraje: 2000, potencia: 181, topSpeed: 220 },
        { id: "E1", photo: "",modelo: "Golf GTI", cilindraje: 2000, potencia: 241, topSpeed: 250 },
        { id: "E2", photo: "",modelo: "WRX", cilindraje: 2500, potencia: 271, topSpeed: 240 },
        { id: "E3", photo: "",modelo: "Stinger", cilindraje: 3300, potencia: 368, topSpeed: 270 },
        { id: "E4", photo: "",modelo: "Elantra N", cilindraje: 2000, potencia: 276, topSpeed: 250 },
        { id: "F1", photo: "",modelo: "S60", cilindraje: 2000, potencia: 250, topSpeed: 230 },
        { id: "F2", photo: "",modelo: "F-Type", cilindraje: 5000, potencia: 575, topSpeed: 300 },
        { id: "F3", photo: "",modelo: "Giulia", cilindraje: 2900, potencia: 505, topSpeed: 307 },
        { id: "F4", photo: "",modelo: "Charger", cilindraje: 6200, potencia: 797, topSpeed: 327 },
        { id: "G1", photo: "",modelo: "Continental GT", cilindraje: 6000, potencia: 626, topSpeed: 333 },
        { id: "G2", photo: "",modelo: "Phantom", cilindraje: 6750, potencia: 563, topSpeed: 250 },
        { id: "G3", photo: "",modelo: "308 GTi", cilindraje: 1600, potencia: 263, topSpeed: 250 },
        { id: "G4", photo: "",modelo: "Megane RS", cilindraje: 1800, potencia: 296, topSpeed: 250 },
        { id: "H1", photo: "",modelo: "Lancer Evo X", cilindraje: 2000, potencia: 291, topSpeed: 240 },
        { id: "H2", photo: "",modelo: "500 Abarth", cilindraje: 1400, potencia: 160, topSpeed: 210 },
        { id: "H3", photo: "",modelo: "Grand Cherokee", cilindraje: 3600, potencia: 293, topSpeed: 210 },
        { id: "H4", photo: "",modelo: "Range Rover", cilindraje: 5000, potencia: 518, topSpeed: 225 }
    ]
]
let b = [{id:1, card: { id: "B1", photo: "",modelo: "M3", cilindraje: 3000 , potencia: 473, topSpeed: 250 }}, {id:2, card: { id: "B1", photo: "",modelo: "M3", cilindraje: 3000 , potencia: 479, topSpeed: 250 }}]
let as = setWinner(b, "potencia")
console.log(as);
