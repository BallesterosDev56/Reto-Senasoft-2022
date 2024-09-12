import { useEffect, useState } from 'react';
import './adminWaiting.css'


export const AdminWaiting = ({socket, nPlayers})=> {
    const [code, setCode] = useState(null);
    const [buttonState, setButtonState] = useState(true)

    useEffect(()=> {
        if (nPlayers >= 2) {
            setButtonState(false)
        }
    }), [nPlayers];

    useEffect(()=>{
        //emitimos el generador del codigo
        socket.emit('game:newGame', 'testing');

    }, [])

    //escuchando el cambio del socket
    useEffect(()=> {
        if (socket) {
            //recibimos el codigo
            socket.on('game:code', (code)=>{
                setCode(code);
            
            });

            //recibiendo las cartas:
            socket.on('game:cards', (cards)=> {
                console.log(cards);
                
            });


        }
    }, [socket]);


    //escuchando el cambio del estado de code
    useEffect(()=> {
        if (code) {
          console.log(code);
            
            
        }
    }, [code, setCode])

    //emitir boton play
    const handlePlayClick = ()=> {
        console.log(`codeee: ${code}`);
        
        socket.emit('game:startGame', code);
    }
    

    return(
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
    )
}