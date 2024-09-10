import { db } from "../config/db.js"

export async function createRoom(hex) {
    try{
        const [result] = await db.query('INSERT INTO rooms (hex,players_number) VALUES (?,?)', [hex, 1])
        if(result.affectedRows == 0){
            return null
        }
        else{
            return true
        } 
    }catch(err){
        console.log(err)
    }
}

export async function getRoomByHex(hex) {
    try{
        const [result] = await db.query('SELECT * FROM rooms WHERE hex = ?',[hex])
        if(result.length == 0){
            return null
        }
        else{
            return result[0]
        } 
    }catch(err){
        console.log(err)
    }
}

export async function newRoom(hex) {
    try{
        const [result] = await db.query('INSERT INTO rooms (hex,players_number) VALUES (?,?)', [hex, 1])
        if(result.affectedRows == 0){
            return null
        }
        else{
            return true
        } 
    }catch(err){
        console.log(err)
    }
}

