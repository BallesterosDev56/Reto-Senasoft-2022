import './adminWaiting.css'

export const AdminWaiting = ()=> {
    return(
        <div className="waiting--container min-vh-100 container">
        <div className="card rounded-5 p-5">
            <div className="row mt-5">
                <div className="card-body rounded bg-secondary text-white p-2">
                <h2 className="fs-1">CODE: #33D4F345</h2>
                </div>
            </div>

            <div className="row mt-5">
                    <h2 className="fs-1 text-center">1/7 Players</h2>
            </div>
            
            <div className="row m-5 mb-0">
                <button class="btn btn-primary fs-3" type="button" disabled={true}>Play</button>
            </div>  
        </div>
    </div>
    )
}