import { useState } from "react";
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword]  = useState('')
    const [error, setError]  = useState('')
    const history = useHistory()

    const handleSubmit =  (e) => {
        e.preventDefault();

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
               return setError(data.error)
            }
            history.push('/signin')
        })
        
    
    }

    return (
        <>
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input id='name' type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input id='email' type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input id='password' type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <input type="submit" value='Sign Up' className="btn"/>
        </form>
        <p className="error">{error}</p>
        </>
    )
}

export default Signup;