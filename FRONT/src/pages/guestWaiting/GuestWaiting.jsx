import "./guestWaiting.css";
import { useEffect, useState } from "react";
import { Game } from "../game/Game";

export const GuestWaiting = ({socket, nPlayers, setRenderLogin}) => {
    const [code, setCode] = useState(null);
    const [buttonState, setButtonState] = useState(true);
    const [cardsPlayer, setCardsPlayer] = useState([]);
    const [renderGame, setRenderGame] = useState(false);
 
    useEffect(()=> {
        if (nPlayers >= 2) {
            setButtonState(false);            
            
        }

    }, [nPlayers])
    
    //escuchando el cambio del socket
    useEffect(()=> {
        
        //recibiendo las cartas:
        socket.on('game:cards', (response)=> {
            let {cards} = response;
            setCardsPlayer((prev)=> [...prev, ...cards]);
            
        });

        //recibimos los errores:
        socket.on('room:error', (error)=> {
            console.log(error);
        });
        socket.on('game:error', (error)=> {
            console.log(error);
            
        });

        //recibiendo el codigo:
        socket.on('room:joinRoom', (code)=> {
            if (code === "The room doesn't exist") {
                setRenderLogin('');
                setTimeout(() => {
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "The room doesn't exist",
                      });
                }, 400);
            }else {
                setCode(code);
            }
                        
        });

    }, [socket])

    //escuchando el cambio de las cartas:
    useEffect(()=> {
        if (cardsPlayer.length > 0) {
            setTimeout(() => {
                setRenderGame(true);

            }, 500);
            
        }

    }, [cardsPlayer])



  return (
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
                                <h2 className="fs-1 text-center">{nPlayers}/7 Players</h2>
                        </div>
                        
                        <div className="row m-5 mb-0">
                            <button className="btn btn-primary fs-5" type="button" disabled={buttonState}>
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            ></span>
                            <span role="status">Loading...</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : 
            (
                <Game
                cardsPlayer={cardsPlayer}
                nPlayers={nPlayers}
                socket={socket}
                code={code}
                ></Game> 
            )
        }
    </>
  );
};
