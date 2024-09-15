import './game.css'
import { Card } from '../../components/card/Cards'
import { CardPlayer } from '../../components/cardPlayer/CardPlayer'
import { useEffect, useState } from 'react'

export const Game = ({cardsPlayer, nPlayers, socket, code})=> {
  
const [numberPlayers, setNumberPlayers] = useState([]);
const [startRound, setStartRound] = useState(null);

  // if (socket) {
  //   socket.emit('game:setStart', 'data');

  // }
  if (socket) {
    console.log(code, cardsPlayer[0]);
    
    socket.emit('game:startRound', {code : code, card : cardsPlayer[0]}); 


  }

  //creamos el array para iterar el numero de cartas por renderizar
  useEffect(()=> {
    if (nPlayers>=2) {
      const returnPlayers = ()=> {      
        let arrayPlayers = [];
    
        for (let i = 0; i < nPlayers; i++) {
          arrayPlayers.push(i);
    
        }
        setNumberPlayers((prev)=>[...prev, ...arrayPlayers])

      }
      returnPlayers();

    }

  }, [nPlayers])

  //escuchando los cambios del socket:
  useEffect(()=> {
    if (socket) {
      //recibiendo el seteador del evento startRound:
      // socket.on('game:setStart', ((response)=> {
      //   console.log('este', response);
        
      //   setStartRound(response);

      // }));     
      
      //recibiendo los errores:
      socket.on('game:error', ((error)=> {
        console.log(error);
        
      }));

      //recibiendo el id del primer jugador:
      socket.on('game:selectPlayer', (firstCardId)=> {
        console.log(firstCardId);
        
      })

    }

  }, [socket])

  //escuchando los cambios de el start round:
  // useEffect(()=> {
  //   if (startRound) {
  //     socket.emit('game:startRound', {code : code, card : cardsPlayer[0]}); 

  //   }

  // }, [startRound])


  //manejando los perks:
  const handleHorsePower = ()=> {
    
  }
  const handleSpeed = ()=> {

  }
  const handleWeight = ()=> {

  }
  const handleCC = ()=> {

  }
  
  
  
    return (
        <section className="game--container  min-vh-100">
          <div id='bg--grey' className="bg--grey container-fluid d-flex flex-column col-11 m-3 rounded-4">

            <div className="row">
              <div className="cards--container col-8 rounded p-2 mt-2">
                <h2 className="fs-1 text-center text-light">Players: 👤</h2>
                <div className="card--users--container col h-75">
                  {numberPlayers.map((e, index)=> {
                    return <CardPlayer key={index}></CardPlayer>
                  })}
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-2">
              <div className="battle--container rounded-4">
                
              </div>
            </div>

            <div className="row justify-content-center mt-3">

                <h2 className='text-center text-white fs-1'>Your card: </h2>
              <div className="col-2 d-flex justify-content-end mt-2">
                <Card data={cardsPlayer[0]}></Card>
              </div>

              <div className="col-1">
                  <div className="row ">
                    <button onClick={handleHorsePower} className="btn btn-danger mt-4 mb-2">Horse Power</button>
                  </div>

                  <div className="row">
                    <button onClick={handleSpeed} className="btn btn-primary mb-2">Speed</button>
                  </div>

                  <div className="row">
                    <button onClick={handleWeight} className="btn btn-info mb-2">Weight</button>
                  </div>

                  <div className="row">
                    <button onClick={handleCC} className="btn btn-warning mb-2">CC</button>
                  </div>
              </div>

            </div>

          </div>
        </section>
    )
}