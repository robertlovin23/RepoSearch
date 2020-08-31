import React from 'react'
import {connect} from 'react-redux'
import {fetchRepos} from '../../actions/index'
import { Field, reduxForm } from 'redux-form'

class Search extends React.Component{

    renderError({error,touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return( 
            <div className={className}>   
                <label>{label}</label>    
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>   
        )
    }
    renderDropdown = ({input, label, meta}) => {
        return(
            <div style={{marginBottom: "10px"}}>
                <select {...input}>
                    <option value="">Filter By Language</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C">C</option>
                    <option value="C+">C+</option>
                    <option value="C#">C#</option>
                    <option value="Python">Python</option>
                    <option value="PHP">PHP</option>
                    <option value="Assembly">Assembly</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Ruby">Ruby</option>
                    <option value="SQL">SQL</option>
                    <option value="Express">Express</option>
                    <option value="HTML5">HTML5</option>
                    <option value="CSS3">CSS3</option>
                    <option value="Rust">Rust</option>
                    <option value="Dart">Dart</option>
                </select>
            </div>
        )
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.fetchRepos(formValues);

    }

    render(){
        return(
        <div className="ui segment">
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="Search" label="Search for Repository" component={this.renderInput}/>
                <Field name="Language" component={this.renderDropdown}/>
                <button className="ui primary button">Submit</button>      
            </form>
        </div>
        )
    }
}
const validate = (formValues) => {
    const errors = {};
    if(!formValues.Search){
        //only ran if user did not enter in a title
        errors.title = "You must enter a title"
    }
    return errors;
}

const mapStateToProps = (state) => {
    return{
        github: state.github
    }
}

Search = connect(
    mapStateToProps,{
        fetchRepos
    }
)(Search);

export default reduxForm({
    form: 'search',
    validate
})(Search);
