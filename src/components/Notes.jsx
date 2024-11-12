import React from "react"
import { dataAPI } from "../App"

export default class Notes extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            apiData: []
        }
    }

    reload = () => {
        dataAPI('GET', undefined, jsonData => {
            this.setState({apiData:jsonData});
        })
    }

    componentDidMount(){
        this.reload();
    }

    handleClose = (id) => {
        dataAPI('DELETE', id.toString(), () => {
            this.reload();
        })
    }

    render(){
        return(
            <div className="notes">
                <div className="material-icons" onClick={this.reload}>refresh</div>
                {this.state.apiData.map(data=> 
                    <div key={data.id} className="note">
                        <div className="note-content">{data.content}</div>
                        <div className="note-close" onClick={()=>this.handleClose(data.id)}>X</div>
                    </div>
                )}
            </div>
        )
    }
}