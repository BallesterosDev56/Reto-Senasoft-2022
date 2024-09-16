import './game.css'
import { Card } from '../../components/card/Cards'
import { CardPlayer } from '../../components/cardPlayer/CardPlayer'
import { useEffect, useState } from 'react'

export const Game = ({cardsPlayer, nPlayers, socket, code})=> {
  
const [numberPlayers, setNumberPlayers] = useState([]);
const [enablePerks, setEnablePerks] = useState(true);
const [playButton, setPlayButton] = useState(true);
const [yourTurn, setYourTurn] = useState(null);

  useEffect(()=> {
    if (socket) {
      socket.emit('game:startRound', {code : code, card : cardsPlayer[0]}); 
  
    }
  }, [])

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

      //recibiendo los errores:
      socket.on('game:error', ((error)=> {
        console.log(error);
        
      }));

      //recibiendo el id del primer jugador:
      socket.on('game:selectPlayer', (firstCardId)=> { 
        if (firstCardId === cardsPlayer[0].id) {
          setEnablePerks(false);
          
        }
        
      })

      //recibiendo el turno de los demás
      socket.on('card:yourTurn', (response)=> {
        console.log(response);
        
        setYourTurn(response);
      });

    }

  }, [socket])

  //escuchando los cambios de your turn:
  useEffect(()=> {
    if (yourTurn) {
      console.log('tu turno mf');
      
    }
  }, [yourTurn])


  //manejando los perks:
  const handleHorsePower = ()=> {
    if (socket) {
      socket.emit('card:perk', 'potencia');
      setPlayButton(false);

    }
  }
  const handleSpeed = ()=> {
    if (socket) {
      socket.emit('card:perk', 'topSpeed');
      setPlayButton(false);

    }    
  }
  const handleWeight = ()=> {
    if (socket) {
      socket.emit('card:perk', 'peso');
      setPlayButton(false);

    }
  }
  const handleCC = ()=> {
    if (socket) {
      socket.emit('card:perk', 'cilindraje');
      setPlayButton(false);

    }
  }

  //manejando play Button:
  const handlePlayButton = ()=> {
    if (socket) {
      socket.emit('card:firstCard', {code: code, card: cardsPlayer[0] });
    }

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
                <div className="row col-2 h-25 p-3">
                  <button onClick={handlePlayButton} className='btn btn-success btn-gradient mt-1 mb-1' disabled={playButton}>Play</button>
                </div>
              <div className="col-2 d-flex justify-content-end mt-2">
                <Card data={cardsPlayer[0]}></Card>
              </div>

              <div className="col-1">
                  <div className="row ">
                    <button onClick={handleHorsePower} className="btn btn-danger mt-4 mb-2" disabled={enablePerks}>Potencia</button>
                  </div>

                  <div className="row">
                    <button onClick={handleSpeed} className="btn btn-primary mb-2" disabled={enablePerks}>Velocidad</button>
                  </div>

                  <div className="row">
                    <button onClick={handleWeight} className="btn btn-info mb-2" disabled={enablePerks}>Peso</button>
                  </div>

                  <div className="row">
                    <button onClick={handleCC} className="btn btn-warning mb-2" disabled={enablePerks}>Cilindraje</button>
                  </div>
              </div>

            </div>

          </div>
        </section>
    )
}