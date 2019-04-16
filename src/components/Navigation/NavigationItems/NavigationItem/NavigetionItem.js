import React from 'react'
import { NavLink } from 'react-router-dom';

import classes from './NavigetionItem.css'

const navigetionItem = (props) => (
    <div>
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}
            className={props.active ? classes.active : null}>{props.children}</NavLink>
    </div>
);

export default navigetionItem;