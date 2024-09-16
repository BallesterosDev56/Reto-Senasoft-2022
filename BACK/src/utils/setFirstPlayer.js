export function setFirstPlayer (array){
    try{
        let letras = []
        array.forEach(card => {
            letras.push(card.id)
        })
        let max = []
        let ordenadas = letras.sort()
        console.log(ordenadas);
        
        ordenadas.forEach(letra => {
            if(letra[1] == "1"){
                max.push(letra)
                return
            }
        })
        ordenadas.forEach(letra => {
            if(letra[1] == "2"){
                max.push(letra)
                return
            }
        })
        ordenadas.forEach(letra => {
            if(letra[1] == "3"){
                max.push(letra)
                return
            }
        })
        ordenadas.forEach(letra => {
            if(letra[1] == "4"){
                max.push(letra)
                return
            }
        })
        return max[0]
    }catch (err){
        console.log(err)
    }
}

export const cards = [
    { id: "F3", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1726157076239_Giulia.png", modelo: "Giulia", cilindraje: 2900, potencia: 505, topSpeed: 307, peso: 1500 },
    { id: "H3", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1726158376874_Grand Cherokee.png", modelo: "Grand Cherokee", cilindraje: 3600, potencia: 293, topSpeed: 210, peso: 2000 },
    { id: "I3", photo: "https://storage.googleapis.com/url-images-generator.appspot.com/1726158376874_Grand Cherokee.png", modelo: "Grand Cherokee", cilindraje: 3600, potencia: 293, topSpeed: 210, peso: 2000 },

]

let a = setFirstPlayer(cards)
console.log(a);
