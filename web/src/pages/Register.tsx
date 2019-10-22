import React, {useState} from 'react';
import {useRegisterMutation} from "../generated/graphql";
import {RouteComponentProps} from 'react-router-dom'

export const Register: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [register ] = useRegisterMutation()
  return (
    <div>
      <form onSubmit={async e=>{
        e.preventDefault()
        await register({variables:{email,password}})
        history.push('/')
      }}>
        <div>
          <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}}></input>
        </div>
        <div>
          <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}></input>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

