export function setFirstPlayer (array){
    try{
        let letras = []
        array.forEach(card => {
            letras.push(card.id)
        })
        let max = []
        let ordenadas = letras.sort()
        
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
