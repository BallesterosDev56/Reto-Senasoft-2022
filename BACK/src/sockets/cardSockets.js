import { setWinner } from "../utils/setWinner.js"
import { getRoomSize } from "../utils/getRoomSize.js"

let roomsData = {}
export function choosedPerk(io, socket){
    socket.on('card:perk', async (data) =>{ // data = {code:"codigo hex de la sala", perk: "perk elegido por el jugador"}
        try{
            roomsData[data.code] = {
                cards: [],
                totalPlayers: getRoomSize(data),
                perk: data.perk
            }
        } catch(err){
            socket.emit('card:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}

export function firstCard(io, socket){
    socket.on('card:firstCard', async (data) =>{ // data = {code: "codigo hex de la sala", card: { carta }}
        try{
            let code = data.code
            let card = data.card
            if (!roomsData[code]) {
                return socket.emit('card:error', { message: 'Room not found' });
            }
            roomsData[code].cards.push({id:socket.id, card: card})
            socket.broadcast.to(data.code).emit('card:yourTurn', 'Habilitado')
        } catch(err){
            socket.emit('card:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}



export function playCard(io, socket){
    socket.on('card:cardPlayed', async (data) =>{ // data = {code: "codigo hex de la sala", card: { carta }}
        try{
            let code = data.code
            let card = data.card

            if (!roomsData[code]) {
                return socket.emit('card:error', { message: 'Room not found' });
            }

            roomsData[code].cards.push({id:socket.id, card: card}) 
            
            let cardsPlayed = roomsData[code].cards.length // numero de jugadores que tiraron cartas
            let totalPlayers = roomsData[code].totalPlayers
            
            if(cardsPlayed == totalPlayers){
                const winnerId = setWinner(roomsData[code].cards, roomsData[code].perk)
                socket.emit('card:roundWinner', winnerId) // id ganador o draw
            }
            roomsData[code].cards = []
            roomsData[code].perk = ""
        } catch(err){
            socket.emit('card:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}





export function roundWinner(io, socket){
    socket.on('card:winner', (data)=> { //data = ['hex de la room', 'categoria seleccionada', [ {card}, {card} ]]  card = {socketID: ... , velocidad: ..., peso: ...}
        try{
            const winner = setWinner(data)
            io.to(data[0]).emit('card:winner', winner) // winner = {carta ganadora} || "draw"
        }catch(err){
            socket.emit('card:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}