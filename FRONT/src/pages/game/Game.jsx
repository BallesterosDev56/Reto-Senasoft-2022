import './game.css'
import { Card } from '../../components/card/Cards'
import { CardPlayer } from '../../components/cardPlayer/CardPlayer'

export const Game = ()=> {
    return(
        <section className="game--container  min-vh-100">
          <div id='bg--grey' className="bg--grey container-fluid d-flex flex-column col-11 m-3 rounded-4">

            <div className="row">
              <div className="cards--container col-8 rounded p-2 mt-2">
                <h2 className="fs-1 text-center text-light">Players: 👤</h2>
                <div className="card--users--container col h-75">
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                  <CardPlayer></CardPlayer>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-2">
              <div className="battle--container rounded-4">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
              </div>
            </div>

            <div className="row justify-content-center mt-3">

                <h2 className='text-center text-white fs-1'>Your card: </h2>
              <div className="col-2 d-flex justify-content-end mt-2">
                <Card></Card>
              </div>

              <div className="col-1">
                  <div className="row ">
                    <div className="btn btn-danger mt-4 mb-2">Horse Power</div>
                  </div>

                  <div className="row">
                    <div className="btn btn-primary mb-2">Speed</div>
                  </div>

                  <div className="row">
                    <div className="btn btn-info mb-2">Weight</div>
                  </div>

                  <div className="row">
                    <div className="btn btn-warning mb-2">CC</div>
                  </div>
              </div>

            </div>

          </div>
        </section>
    )
}