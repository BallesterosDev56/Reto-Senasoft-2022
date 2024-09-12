import { hexGenerator } from "../utils/hexGenerator.js"
import { newRoom, getRoomByHex } from "../repositories/roomsRepo.js"
import { cards } from "../cards/cards.js"
import { shuffler } from "../utils/shuffler.js"
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
            io.to(data).emit("game:newPlayer", playersN) // numero de jugadores
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
