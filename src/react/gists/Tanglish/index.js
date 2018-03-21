import React from 'react';
import { train, execute } from './training'
import data from './data';


class Tanglish extends React.Component {
    state = {
        input: "",
        trained: false,
    }

    componentDidMount() {
        const trainedNet = train(data)
        window.run = execute.bind(null, trainedNet)
        this.setState({
            trained: true,
        })
    }

    render(){
        return (
            <div>
                <p> Tamil ah English ah? Or... Tanglish? </p>
                {this.state.trained?"trained":"training"}
            </div>
        )
    }
}

export default Tanglish;