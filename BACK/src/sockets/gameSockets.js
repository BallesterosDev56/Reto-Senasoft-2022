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
            if(!code){
                return socket.emit('game:error', {message: 'Error in the hexGenerator'})
            }
            await createRoom(code)
            socket.join(code)
            socket.emit('game:code', code) // envio codigo hex y creo la sala
        }catch(err){
            
            
            socket.emit('game:error', {message: 'Error creating the game', error: err})
        }
    })
}

export function joinRoom(io, socket){
    socket.on('game:joinRoom', async (data) =>{ // data = "codigo hex de la sala"
        try{
            const result = await getRoomByHex(data)
            const playersN = getRoomSize(data)
            if(!result){
                return socket.emit('game:joinRoom', "The room doesn't exist")
            }
            socket.join(data)
            socket.emit('game:joinRoom', "Success")
            io.to(data).emit("game:newPlayer", playersN) // numero de jugadores
        } catch(err){
            socket.emit('game:error', {message: 'Error joining the game', error: err})
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
            socket.emit('game:error', {message: 'Error starting the game', error: err})
        }
    })
}


let roomsData = {}
export function choosedPerk(io, socket){
    socket.on('game:startRound', async (data) =>{ // data = {hex:"codigo hex de la sala", perk: "perk elegido por el jugador"}
        try{
            roomsData[data.hex] = {
                cards: {},
                totalPlayers: getRoomSize(data),
                perk: data.perk
            }
            socket.emit('game:play', 'Play your card') // le devuelvo un array de arrays, cada uno con 4 cartas aleatorias
        } catch(err){
            socket.emit('game:error', {message: 'Error choosen the perk the game', error: err})
        }
    })
}


export function startRound(io, socket){
    socket.on('game:startRound', async (data) =>{ // data = "codigo hex de la sala"
        try{
            const playersN = getRoomSize(data)
            
            socket.emit('game:cards', shuffledCards) // le devuelvo un array de arrays, cada uno con 4 cartas aleatorias
        } catch(err){
            socket.emit('game:error', {message: 'Error starting the round', error: err})
        }
    })
}





export function roundWinner(io, socket){
    socket.on('game:winner', (data)=> { //data = ['hex de la room', 'categoria seleccionada', [ {card}, {card} ]]  card = {socketID: ... , velocidad: ..., peso: ...}
        try{
            const winner = setWinner(data)
            io.to(data[0]).emit('game:winner', winner) // winner = {carta ganadora} || "draw"
        }catch(err){
            socket.emit('game:error', {message: 'Error in the game logic', error: err})
        }
    })
}
