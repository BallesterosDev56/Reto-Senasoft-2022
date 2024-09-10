import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import {newGame, joinRoom, startGame, choosedPerk, startRound} from './src/sockets/gameSockets.js'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server) 

app.use(express.json())
app.use(cors())

io.on('connect', (socket) => {
    console.log('A user has log');
    newGameGame(io, socket)
    joinRoom(io, socket)
    startGame(io, socket)
    choosedPerk(io, socket)
    startRound(io, socket)
})



server.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`)})