import { db } from "../config/db.js"

export async function getCards() {
    try{
        const [result] = await db.query('SELECT * FROM cards')
        if(result.length == 0){
            return null
        }
        else{
            return result
        } 
    }catch(err){
        console.log(err)
    }
}