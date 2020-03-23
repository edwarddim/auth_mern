import React,{useState} from "react"
import axios from 'axios'

const AppComponent = () =>{

    const [errorState, setErrorState] = useState({})
    const [loginState, setLoginState] = useState({
        email:"",
        password:""
    })
    const [registerState, setRegisterState] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const loginChangeHandler = e => {
        setLoginState({
            ...loginState,
            [e.target.name]:e.target.value
        })
    }
    const registerChangeHandler = e => {
        setRegisterState({
            ...registerState,
            [e.target.name]:e.target.value
        })
    }

    const registerSubmit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/user", registerState, {withCredentials:true})
            .then(res => console.log(res))
            .catch(err => {
                const {errors} = err.response.data;
                console.log(errors)
                const errObj = {}

                for(const key of Object.keys(errors)){
                    console.log(errors[key])
                    errObj[key] = true;
                }
                setErrorState(errObj)
            })
    }

    const loginSubmit = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", loginState, {withCredentials:true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const getAllUsers = () =>{
        axios.get("http://localhost:8000/api/users", {withCredentials:true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return(
        <div className="row">
            <div className="col-6">
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <p>
                        Email:
                        <input name="email" type="text" onChange={loginChangeHandler} />
                    </p>
                    <p>
                        Password:
                        <input name="password" type="text" onChange={loginChangeHandler} />
                    </p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-6">
                <h1>Register</h1>
                <form onSubmit={registerSubmit}>
                    <p>
                        First Name:
                        <input name="firstName" type="text" onChange={registerChangeHandler} />
                        {(errorState.firstName)? <small className="ml-1 text-danger font-weight-bold">WRONG</small>:null}
                    </p>
                    <p>
                        Last Name:
                        <input name="lastName" type="text" onChange={registerChangeHandler} />
                        {(errorState.lastName)? <small className="ml-1 text-danger font-weight-bold">WRONG</small>:null}
                    </p>
                    <p>
                        Email:
                        <input name="email" type="text" onChange={registerChangeHandler} />
                        {(errorState.email)? <small className="ml-1 text-danger font-weight-bold">WRONG</small>:null}
                    </p>
                    <p>
                        Password:
                        <input name="password" type="text" onChange={registerChangeHandler} />
                        {(errorState.password)? <small className="ml-1 text-danger font-weight-bold">WRONG</small>:null}
                    </p>
                    <p>
                        Confirm Password:
                        <input name="confirmPassword" type="text" onChange={registerChangeHandler} />
                        {(errorState.confirmPassword)? <small className="ml-1 text-danger font-weight-bold">WRONG</small>:null}
                    </p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <button onClick={getAllUsers}>GET ALL USERS</button>
        </div>
    )
}
export default AppComponent