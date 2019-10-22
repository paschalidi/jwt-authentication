import React from 'react';
import {Link} from "react-router-dom";
import {useUsersQuery} from "../generated/graphql";

export const Home: React.FC = () => {
  const {data,loading} = useUsersQuery({fetchPolicy:"network-only"})

  if(loading || !data){
    return <div>loading...</div>
  }
  console.log(data)
  return (
    <ul>{data.users.map(user=><li key={user.id}>{user.email}</li>)}</ul>
  );
}

