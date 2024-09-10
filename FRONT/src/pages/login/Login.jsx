import './login.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../logic/authPlayer';
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const Login = ()=> {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [code, setCode] = useState(null);
    const {playerState, play} = useAuth();
    const [socket, setSocket] = useState(null);

    //creando la conexión del socket
    useEffect(()=> {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return ()=>newSocket.close();
    }, []);
    
    //escuchando los eventos:
    useEffect(()=>{
        if (socket) {
            socket.on('game:code', ((codigo)=>{
                console.log(codigo);
                console.log('ola');
                
            }));

        }

    }, [socket])

    const handleOnClick = ()=> {
        
        play();
        play();
        setCode(code);
        socket.emit('game:newGame', 'testing');

    }


    const onSubmit = (data)=> {
        console.log(data.match);
        
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
                                required: 'Field required!'
                            })} id='match' type="text" className="form-control" required/>
                            <button type='submit' className="btn btn-primary mt-2">Join</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}