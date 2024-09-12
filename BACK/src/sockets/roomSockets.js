import { hexGenerator } from "../utils/hexGenerator.js"
import { newRoom, getRoomByHex } from "../repositories/roomsRepo.js"
import { getRoomSize } from "../utils/getRoomSize.js"


export function newGame(io, socket) {
    socket.on('room:newGame', async (data)=> {
        try{
            const code = hexGenerator()
            if(!code){
                return socket.emit('room:error', {message: 'Error in the hexGenerator'})
            }
            await socket.join(code)
            await newRoom(code)
            socket.emit('room:code', code) // envio codigo hex y creo la sala
        }catch(err){
            socket.emit('room:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}

export function joinRoom(io, socket){
    socket.on('room:joinRoom', async (data) =>{ // data = "codigo hex de la sala"
        try{
            const result = await getRoomByHex(data)
            if(!result){
                return socket.emit('room:error', "The room doesn't exist")
            }
            await socket.join(data)
            const playersN = getRoomSize(io,data)
            console.log(playersN);
            socket.emit('room:joinRoom', data)
            io.to(data).emit("room:newPlayer", playersN) // numero de jugadores
        } catch(err){
            socket.emit('room:error', {message: 'INTERNAL SERVER ERROR', error: err.message})
        }
    })
}

export async function hola(params) {
    let a = "hola"
}