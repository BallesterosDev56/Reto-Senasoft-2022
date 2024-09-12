import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import {newGame, joinRoom, startGame} from './src/sockets/gameSockets.js'
import { choosedPerk, firstCard, playCard, roundWinner} from './src/sockets/cardSockets.js'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
}) 

app.use(express.json())
app.use(cors())

io.on('connect', (socket) => {
    console.log('A user has log')
    
    newGame(io, socket)
    joinRoom(io, socket)
    startGame(io, socket)
    
    choosedPerk(io, socket)
    firstCard(io, socket)
    playCard(io, socket)
    roundWinner(io, socket)


})



server.listen(process.env.PORT, () => { console.log(`Server running on port ${process.env.PORT}`)})