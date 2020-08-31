import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchRepos} from '../actions'
import Search from '../components/layout/Search'

class Results extends React.Component{

    componentDidMount(formValues){
        const data = {
            Search: 'Tetris',
            Language: 'Assembly'
        }
        console.log(formValues)
        this.props.fetchRepos(data);
    }

    loginLink = (login,name) => {
        console.log(login,name)
        if(!login){
            return(
                <div>Loading...</div>
            )
        } else {
            return(
                <Link to={`/repo/${login}/${name}`} className="ui primary button">
                    More Info
                </Link>
            )
        }
    }
    renderResults(){
        if(!this.props.github.length){
            return(
                <div> Loading...</div>
            )
        } else {
            return Object.values(this.props.github).map((git,index) => {
                    return(
                        <div className="ui fluid card" key={index}>  
                            <div className="content">
                                <div className="header">
                                    <h1>{git.name}</h1>
                                </div>
                                <div className="description">
                                    <p>{git.description}</p>
                                </div>           
                            </div>
                            <div className="extra content">
                                    <span>
                                        {git.stargazers_count} <i class="star icon"></i>
                                    </span>
                            </div>
                            {this.loginLink(git.owner.login, git.name)}
                        </div>
                )
            }) 
        }  
    }
    render(){
        console.log(this.props.github)
        return(
            <div className="ui container">
                <Search/>
                <div className="ui four stackable cards" style={{margin:'0 auto'}}>
                    {this.renderResults()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        github: state.github
    }
}

export default connect(mapStateToProps, {fetchRepos})(Results)