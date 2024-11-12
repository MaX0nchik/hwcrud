import React from "react";

export default class Form extends React.Component {
    constructor(props){
        super(props);
        this.state={note: ''};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onNoteSumbit(event, this.state);
    }
    
    handleChange = (event) => {
        const {target} = event;
        const {name, value} = target;
        console.log("change:" + value)
        if (name === "note")
            this.setState({[name]:value});
    }
    
    render(){
        return(
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <textarea id="note" name="note" onChange={this.handleChange} value={this.state.note}/>
                        <button type="submit" className="material-icons">send</button>
                    </div>
                </form>
            </div>
        )
    }
}
