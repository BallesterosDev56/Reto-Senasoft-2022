import { cards } from "../cards/cards.js"
import { shuffler } from "../utils/shuffler.js"
import { getRoomSize } from "../utils/getRoomSize.js"
import { setFirstPlayer } from "../utils/setFirstPlayer.js"




let firstCards = {}
export function startGame(io, socket){
    socket.on('game:startGame', (data) =>{ // data = "codigo hex de la sala"
        try{
            const socketsInRoom = io.sockets.adapter.rooms.get(data)
            console.log(socketsInRoom)
            const playersN = getRoomSize(io,data)
            const shuffledCards = shuffler(cards, playersN)
            let i = 0
            firstCards[data] = {
                cards: []
            }
            socketsInRoom.forEach(socketId => {
                io.to(socketId).emit('game:cards', {cards: shuffledCards[i], size: playersN})// cards: un array de arrays, cada uno con 4 cartas aleatorias, size: numero de jugadores en la room
                i++
            })
            i = 0
        } catch(err){
            socket.emit('game:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}

/* 
4  Start round
    => socket.emit(“game:startRound”, data )  data = { code: hex, card: primera carta de la baraja } 
    <= socket.on(“game:selectPlayer”, data ) data = “id carta inicial” 
*/

export function startRound(io, socket){
    socket.on('game:startRound', (data) => { // data = { code: hex, card: primera carta de la baraja } 
        try{
            let playersN = getRoomSize(io,data.code)
            if(!firstCards[data.code]){
                return socket.emit('game:error', { message: 'Room not found' })
            }
            if(playersN == firstCards[data.code].cards.length){
                let firstCardId = setFirstPlayer(firstCards[data.code].cards)
                socket.emit("game:selectPlayer", firstCardId )
            }else{
                firstCards[data.code].cards.push(data.card)
            }
        }catch(err){
            socket.emit('game:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}