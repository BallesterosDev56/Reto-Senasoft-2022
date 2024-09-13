import { useEffect, useState } from 'react';
import './adminWaiting.css'
import { Game } from '../game/Game';


export const AdminWaiting = ({socket, nPlayers})=> {
    const [code, setCode] = useState(null);
    const [buttonState, setButtonState] = useState(true);
    const [cardsPlayer, setCardsPlayer] = useState([]);
    const [renderGame, setRenderGame] = useState(false);

    useEffect(()=> {
        if (nPlayers >= 2) {
            setButtonState(false)
        }
    }), [nPlayers];

    useEffect(()=>{

        //emitimos el generador del codigo
        socket.emit('room:newGame', 'testing');

    }, [])

    //escuchando el cambio del socket
    useEffect(()=> {
        if (socket) {
            //recibimos el codigo
            socket.on('room:code', (code)=>{                
                setCode(code);

            });

            //recibiendo las cartas:
            socket.on('game:cards', (response)=> {
                let {cards} = response;   
                console.log(cards);
                 
                setCardsPlayer((prev)=> [...prev, ...cards]);                
                
            });

            //recibiendo los errores
            socket.on('game:error', (error)=> {
                console.log(error);
                
            });

            socket.on('room:error', (error)=>{
                console.log(error);

            });
        }
    }, [socket]);

    //escuchando el cambio de las cartas:
    useEffect(()=> {
        if (cardsPlayer.length > 0) {
            setTimeout(() => {
                setRenderGame(true);

            }, 500);

        }

    }, [cardsPlayer])


    //emitir boton play
    const handlePlayClick = ()=> {
        
        socket.emit('game:startGame', code);
    }
    

    return(
        <>
            {!renderGame ?
                (
                    <div className="waiting--container min-vh-100 container">
                        <div className="card rounded-5 p-5">
                            <div className="row mt-5">
                                <div className="card-body rounded bg-secondary text-white p-2">
                                <h2 className="fs-1">CODE: {code}</h2>
                                </div>
                            </div>

                            <div className="row mt-5">
                                    <h2 className="fs-1 text-center">{nPlayers? nPlayers : 1}/7 Players</h2>
                            </div>
                            
                            <div className="row m-5 mb-0">
                                <button onClick={handlePlayClick} className="btn btn-primary fs-3" type="button" disabled={buttonState}>Play</button>
                            </div>  
                        </div>
                    </div>
                ) : 
                (
                    <Game
                    cardsPlayer={cardsPlayer}
                    nPlayers={nPlayers}
                    code={code}
                    ></Game>
                )
            }        
        </>
    )
}