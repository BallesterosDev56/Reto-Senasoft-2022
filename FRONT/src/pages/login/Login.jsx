import './login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../logic/authGuest/AuthPlayer';
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useAdmin } from '../../logic/authAdmin/AuthAdmin';

export const Login = ()=> {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const {playerState, play} = useAuth();
    const {adminState, playAdmin} = useAdmin();
    const [socket, setSocket] = useState(null);
    const [codeAdmin, setCodeAdmin] = useState(null);
    const [codeGuest, setCodeGuest] = useState(null);



    //creando la conexión del socket
    useEffect(()=> {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return ()=>newSocket.close();
    }, []);

    
        //escuchando los eventos:

    useEffect(()=>{
        if (socket) {

                //CREATE ROOM

            //receiving the code: 
            socket.on('game:code', (codigo)=>{
                let cleanCode = codigo.replace('#', '');
                setCodeAdmin(cleanCode);
            });

            //receiving the error:
            socket.on('game:error', (err)=>{
                console.log(err);
            });
                //JOIN ROOOM
            
            //receiving the joining response:
            socket.on('game:joinRoom', (response)=>{
                console.log(response);
                //if response es correcta:
                play();
                //seteamos el estado del codigo del guest player

                
            });

            //receiving the numbers of players:
            socket.on('game:newPlayer', (nPlayers)=>{
                console.log(nPlayers);
                
            });

        }

    }, [socket])

    //accediendo a los cambios de los estados:

    //code y adminState
    useEffect(()=>{
        if (codeAdmin && adminState) {
            navigate(`/admin-waiting/${codeAdmin}`);
            
        }
    }, [codeAdmin, adminState]);

    //guestCode y playerState
    useEffect(()=> {
        if (playerState && codeGuest) {
            console.log(codeGuest, adminState);
            navigate(`/guest-waiting/${codeAdmin}`);
            
        }
    }), [codeGuest, playerState]


    //funcion para manejar el click del botón CREATE GAME
    const handleOnClick = ()=> {
        playAdmin();

        //emiting the new game:
        socket.emit('game:newGame', 'testing');
    }

//JOIN A GAME

    const onSubmit = (data)=> {

        //emiting the code to join:
        socket.emit('game:joinRoom', data.match);
       
        reset();
    }


    return(
        <div className='form--container container min-vh-100'>
            <div id='card--login' className="card shadow-lg p-4">
                <div id='card--body--login' className="card--body--login card-body display-flex justify-content-center">
                        <h1 id='title--login' className='form-title'>Siigo Match Battle <br />⚔️</h1>
                        <div className="mb-5 mt-5">
                            <p className='fs-3 mt-3 mb-3'>Create a game:</p>
                            <button onClick={handleOnClick} className='btn btn-primary'>Create</button>
                        </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='form display-flex justify-content-center'>
                        <div className="mt-5">
                            <label htmlFor="match" className="form-label fs-3">Join a game:</label><br />
                            <input {...register('match', {
                                required: 'Field required!',
                                pattern: {
                                    value: /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
                                    message: 'The code does not match the pattern ❌'
                                }
                            })} id='match' type="text" className="form-control" required/>
                            {errors.match && <p className='text-danger fs-5 m-1'>{errors.match.message}</p>}
                            <button type='submit' className="btn btn-primary mt-3">Join</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}