import React, {useState} from 'react';
import {useLoginMutation} from "../generated/graphql";
import {RouteComponentProps} from 'react-router-dom'

export const Login: React.FC<RouteComponentProps> = ({history}) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login ] = useLoginMutation()
  return (
    <div>
      <form onSubmit={async e=>{
        e.preventDefault()
        const response = await login({variables:{email,password}})
        console.log(response)
        history.push('/')
      }}>
        <div>
          <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}}></input>
        </div>
        <div>
          <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

