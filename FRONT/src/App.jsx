import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ProtectedPlayer} from './logic/authGuest/ProtectedPlayer'
import { PlayerProvider } from './logic/authGuest/AuthPlayer';
import {ProtectedAdmin} from './logic/authAdmin/ProtectedAdmin'
import { AdminProvider } from './logic/authAdmin/AuthAdmin';

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
    path: '/admin-waiting/:code',
    element:
    <ProtectedAdmin>
      <AdminWaiting/>
    </ProtectedAdmin>
  },
  {
    path: '/guest-waiting/:code',
    element:
    <ProtectedPlayer>
      <GuestWaiting/>
    </ProtectedPlayer>
  },
  {
    path: '/game',
    element: 
    <Game/>
  }
]);

function App() {
 

  return (
    <AdminProvider>
      <PlayerProvider>
        <RouterProvider router={routes}></RouterProvider>
      </PlayerProvider>
    </AdminProvider>
)
}

export default App
