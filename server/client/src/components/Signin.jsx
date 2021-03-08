import { useState } from "react";
import {useHistory} from 'react-router-dom';

const Signin = ({ setLogState }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword]  = useState('')
    const [error, setError]  = useState('')
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        fetch('/signin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {         
            if(data._id) {
            sessionStorage.setItem("jwt", data.token)
            sessionStorage.setItem("user", JSON.stringify(data))
            history.push('/')
            setLogState(true)
            } else {
                setError(data.error)
            }
            
        }).catch(err => console.log(err))
    
    }

    return (
        <>
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input id='email' type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input id='password' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <input type="submit" value='Login' className="btn"/>
        </form>
        <p className='error'>{error}</p>
        </>
    )
}

export default Signin;