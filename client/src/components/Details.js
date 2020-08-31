import React from 'react';
import {connect} from 'react-redux';
import {fetchRepo} from '../actions';

class Details extends React.Component{

    componentDidMount(){
        if(this.props.match.params){
            this.props.fetchRepo(this.props.match.params.owner, this.props.match.params.repo)
        }
    }

    render(){
        console.log(this.props)
        if(Object.keys(this.props.github).length === 0 || !this.props.github.owner){
            return(
                <div>Loading...</div>
            )
        } else {


        return(
            <div className="ui container">
                <h4>{this.props.github.name}</h4>
                <div className="description">
                    <p>Owner: <b> {this.props.github.owner.login}</b></p>
                    <p>{this.props.github.description}</p>
                    <p>Language(s): {this.props.github.language}</p>
                    <div>
                        {this.props.github.stargazers_count} <i class="star icon"></i>
                    </div>
                </div>
            </div>
        )}
    }
}


const mapStateToProps = (state) => {
    return{
        github: state.github
    }
}

export default connect(mapStateToProps,{
    fetchRepo
})(Details);