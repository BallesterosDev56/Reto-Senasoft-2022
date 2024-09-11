export function getRoomSize(io, roomName) {
    const room = io.sockets.adapter.rooms.get(roomName)
    if (room) {
        console.log("oli");
        
        return room.size;  // El número de sockets en la room
    } else {
        return 0;  // La room no existe o está vacía
    }
}
