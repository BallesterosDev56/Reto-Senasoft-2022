import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedPlayer } from './logic/ProtectedPlayer';
import { PlayerProvider } from './logic/authPlayer';

//pages:
import { Redirect } from './pages/redirect/Redirect';
import { Login } from './pages/login/Login';
import { AdminWaiting } from './pages/adminWaiting/AdminWaiting';
import { GuestWaiting } from './pages/guestWaiting/GuestWaiting';
import { Game } from './pages/game/Game';

let routes = createBrowserRouter([
  {
    path: '/',
    element: <Redirect></Redirect>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/admin-waiting',
    element:
    <ProtectedPlayer>
      <AdminWaiting/>
    </ProtectedPlayer>
  },
  {
    path: '/guest-waiting',
    element:
    <ProtectedPlayer>
      <GuestWaiting/>
    </ProtectedPlayer>
  },
  {
    path: '/game',
    element: 
    <ProtectedPlayer>
      <Game/>
    </ProtectedPlayer>
  }
]);

function App() {
 

  return (
    <PlayerProvider>
      <RouterProvider router={routes}></RouterProvider>
    </PlayerProvider>
)
}

export default App
