import './login.css'
import { useForm } from 'react-hook-form'

export const Login = ({setRenderLogin, socket})=> {
    
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const handleOnClick = ()=>{
        setRenderLogin('Admin');
        git 
    }
    const onSubmit = (data)=> {
        
        socket.emit('room:joinRoom', data.match);
        setRenderLogin('Guest');
        
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
                        <div className="mt-">
                            <label htmlFor="match" className="form-label fs-3">Join a game:</label><br />
                            <input {...register('match', {
                                required: 'Field required!',
                                pattern: {
                                    value: /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
                                    message: 'The code does not match the pattern ❌'
                                }
                            })} id='match' type="text" className="form-control" required/>
                            {errors.match && <p className='text-danger fs-5 m-1'>{errors.match.message}</p>}
                            <button type='submit' className="btn btn-primary mt-3">Join</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}