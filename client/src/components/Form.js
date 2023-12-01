import React from "react";

const Form = ({ username, setUsername, password, setPassword , label , onSubmit})=>{
    return(
        <div className="auth-container">
            <form onSubmit={onSubmit} >
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    id="username"
                    placeholder="Username"
                    value={username} 
                    onChange={(event)=> setUsername(event.target.value)} />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id="password" 
                    placeholder="......."
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)} 
                    />
                    <button type="submit">{label}</button>
                </div>
            </form>
        </div>
    )
}

export default Form;