import './App.css'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

//pages:
import {Login} from './pages/login/Login'
import {AdminWaiting} from './pages/adminWaiting/AdminWaiting'
import {GuestWaiting} from './pages/guestWaiting/GuestWaiting'


function App() {
  const [socket, setSocket] = useState();
  const [renderLogin, setRenderLogin] = useState('');
  
  useEffect(()=> {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    
    return ()=> newSocket.close();

  }, [])


  return(
    <>
      {renderLogin =='' ? 
        (<Login 
          setRenderLogin={setRenderLogin}
          socket={socket}
        ></Login>)
        : renderLogin == 'Admin'? (<AdminWaiting 
                                    socket={socket}
                                    ></AdminWaiting>)
        : (<GuestWaiting 
          socket={socket}
          ></GuestWaiting>)
      }
    </>
  )  
}

export default App