import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Hello World!</h1>
        <br/>
        <Link to="/counter">Counter</Link>
    </div>
);

export default Home;
