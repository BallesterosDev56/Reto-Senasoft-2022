import './game.css'

export const Game = ()=> {
    return(
        <section className="game--container">
          <div className="container-fluid d-flex flex-column col-11 bg-light m-3 rounded min-vh-100 ">

          <div className="cards--container row">
            <div className="col-10 bg-secondary bg-gradient rounded p-2 mt-2">
              <h2 className="text-center">Players:</h2>
              <div className="col">

              </div>
            </div>
          </div>

          <div className="battle--container row d-flex justify-content-center mt-2">
            <div className="card col-10">
              s
            </div>
          </div>

          <div className="row mt-3">
            <div className="row">
              <div className="buttons--container col">
                <div className="btn btn-danger">Horse Power</div>
                <div className="btn btn-primary">Speed</div>
                <div className="btn btn-info">Weight</div>
                <div className="btn btn-success">CC</div>
              </div>
            </div>
            <div className="row">

            </div>
          </div>

          </div>
        </section>
    )
}