export async function hexGenerator() {
    const chars = '1234567890ABCDEF'
    let code = '#'
    for(let i = 0 ; i< 6 ; i++){
        let randomIndex = Math.floor(Math.random() * 16)
        code += chars[randomIndex]
    }
    return code
}


