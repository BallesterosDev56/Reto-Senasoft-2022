import { useEffect, useState } from 'react';
import './adminWaiting.css'


export const AdminWaiting = ({socket})=> {
    const [code, setCode] = useState(null);

    useEffect(()=>{

        //emitimos el generador del codigo
        socket.emit('game:newGame', 'testing');

    }, [])

    useEffect(()=> {
        if (socket) {
            //recibimos el codigo
            socket.on('game:code', (code)=>{
                setCode(code);
            
            });


        }
    }, [socket]);

    useEffect(()=> {
        if (code) {
          console.log(code);
            
            
        }
    }, [code])
    

    return(
        <div className="waiting--container min-vh-100 container">
        <div className="card rounded-5 p-5">
            <div className="row mt-5">
                <div className="card-body rounded bg-secondary text-white p-2">
                <h2 className="fs-1">CODE: {code}</h2>
                </div>
            </div>

            <div className="row mt-5">
                    <h2 className="fs-1 text-center">1/7 Players</h2>
            </div>
            
            <div className="row m-5 mb-0">
                <button className="btn btn-primary fs-3" type="button" disabled={true}>Play</button>
            </div>  
        </div>
    </div>
    )
}