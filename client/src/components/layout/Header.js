import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return(
            <div className="ui menu">
                <div className="header item">
                    <Link to={'/'} style={{textDecoration: 'none', color: 'black'}}>RepoSearch</Link>
                </div>
            </div>
        )
    }
}

export default Header;