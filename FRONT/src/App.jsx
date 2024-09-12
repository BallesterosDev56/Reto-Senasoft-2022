import './App.css'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

//pages:
import {Login} from './pages/login/Login'
import {AdminWaiting} from './pages/adminWaiting/AdminWaiting'
import {GuestWaiting} from './pages/guestWaiting/GuestWaiting'
import {Game} from './pages/game/Game'


function App() {
  const [socket, setSocket] = useState();
  const [numberPlayers, setNumberPlayers] = useState(null);
  const [renderLogin, setRenderLogin] = useState('');

  
  //creamos la conexión
  useEffect(()=> {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    
    return ()=> newSocket.close();

  }, []);

  //recibimos la cantidad de jugadores
  useEffect(()=>{
    if (socket) {
      socket.on('game:newPlayer', (nPlayers)=> {
        setNumberPlayers(nPlayers);
        
      });

    }

  }, [socket])

  //escuchando el cambio de numberPlayers
  useEffect(()=> {
    if (numberPlayers) {
      console.log(numberPlayers);
      

    }

  }, [numberPlayers])


  return(
    <>
      {renderLogin =='' ? 
        (<Login 
          setRenderLogin={setRenderLogin}
          socket={socket}
        ></Login>)

        : renderLogin == 'Admin'?
        // (<AdminWaiting 
        //   socket={socket}
        //   nPlayers={numberPlayers}
        // ></AdminWaiting>)
        (<Game></Game>)

          
        : 
        (<GuestWaiting 
          socket={socket}
          nPlayers={numberPlayers}
        ></GuestWaiting>)

      }
    </>
  )  
}

export default App