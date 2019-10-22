import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './Routes';

import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({uri:'http://localhost:4000/graphql', credentials:'include'})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>, document.getElementById('root'));
