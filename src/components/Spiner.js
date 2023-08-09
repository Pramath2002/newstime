import React, {Component} from 'react';
import loading from "./image/Rolling-0.7s-211px.gif"
class Spiner extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading"/>
            </div>
        );
    }
}

export default Spiner;