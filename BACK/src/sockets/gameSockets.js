import { hexGenerator } from "../utils/hexGenerator.js"
import { newRoom, getRoomByHex } from "../repositories/roomsRepo.js"
import { cards } from "../cards/cards.js"
import { shuffler } from "../utils/shuffler.js"
import { setWinner } from "../utils/setWinner.js"
import { getRoomSize } from "../utils/getRoomSize.js"

export function newGame(io, socket) {
    socket.on('game:newGame', async (data)=> {
        try{
            
            const code = hexGenerator()
            console.log(code);
            
            if(!code){
                return socket.emit('game:error', {message: 'Error in the hexGenerator'})
            }
            socket.join(code)
            await newRoom(code)
            socket.emit('game:code', code) // envio codigo hex y creo la sala
        }catch(err){
            socket.emit('game:error', {message: 'Error creating the game', error: err.message})
        }
    })
}

export function joinRoom(io, socket){
    socket.on('game:joinRoom', async (data) =>{ // data = "codigo hex de la sala"
        try{
            const result = await getRoomByHex(data)
            if(!result){
                return socket.emit('game:joinRoom', "The room doesn't exist")
            }
            await socket.join(data)
            const playersN = getRoomSize(io,data)
            console.log(playersN);
            socket.emit('game:joinRoom', data)
            io.to(data).emit("game:newPlayer", "antonio") // numero de jugadores
        } catch(err){
            socket.emit('game:error', {message: 'Error joining the game', error: err.message})
        }
    })
}

export function startGame(io, socket){
    socket.on('game:startGame', async (data) =>{ // data = "codigo hex de la sala"
        try{
            const socketsInRoom = io.sockets.adapter.rooms.get(data)
            const playersN = getRoomSize(data)
            const shuffledCards = shuffler(cards, playersN)
            let i = 0
            socketsInRoom.forEach(socketId => {
                io.to(socketId).emit('game:cards', {cards: shuffledCards[i], size: playersN})// cards: un array de arrays, cada uno con 4 cartas aleatorias, size: numero de jugadores en la room
                i++
            })
            i = 0
        } catch(err){
            socket.emit('game:error', {message: 'Error starting the game', error: err.message})
        }
    })
}


let roomsData = {}
export function choosedPerk(io, socket){
    socket.on('game:perk', async (data) =>{ // data = {code:"codigo hex de la sala", perk: "perk elegido por el jugador"}
        try{
            roomsData[data.code] = {
                cards: [],
                totalPlayers: getRoomSize(data),
                perk: data.perk
            }
            socket.emit('game:play', 'Play your card') // le devuelvo un array de arrays, cada uno con 4 cartas aleatorias
        } catch(err){
            socket.emit('game:error', {message: 'Error choosen the perk the game', error: err.message})
        }
    })
}


export function playCard(io, socket){
    socket.on('game:cardPlayed', async (data) =>{ // data = {code: "codigo hex de la sala", card: { carta }}
        try{
            let code = data.code
            let card = data.card

            if (!roomsData[code]) {
                return socket.emit('game:error', { message: 'Room not found' });
            }

            roomsData[code].cards.push({id:socket.id, card: card}) 
            
            let cardsPlayed = roomsData[code].cards.length // numero de jugadores que tiraron cartas
            let totalPlayers = roomsData[code].totalPlayers
            
            if(cardsPlayed == totalPlayers){
                const winnerId = setWinner(roomsData[code].cards, roomsData[code].perk)
            }
            socket.emit('game:cards', shuffledCards) // le devuelvo un array de arrays, cada uno con 4 cartas aleatorias
        } catch(err){
            socket.emit('game:error', {message: 'Error starting the round', error: err.message})
        }
    })
}





export function roundWinner(io, socket){
    socket.on('game:winner', (data)=> { //data = ['hex de la room', 'categoria seleccionada', [ {card}, {card} ]]  card = {socketID: ... , velocidad: ..., peso: ...}
        try{
            const winner = setWinner(data)
            io.to(data[0]).emit('game:winner', winner) // winner = {carta ganadora} || "draw"
        }catch(err){
            socket.emit('game:error', {message: 'Error in the game logic', error: err.message})
        }
    })
}
