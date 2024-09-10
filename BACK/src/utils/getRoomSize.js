export function getRoomSize(io, roomName) {
    const room = io.sockets.adapter.rooms.get(roomName)
    if (room) {
        return room.size;  // El número de sockets en la room
    } else {
        return 0;  // La room no existe o está vacía
    }
}
