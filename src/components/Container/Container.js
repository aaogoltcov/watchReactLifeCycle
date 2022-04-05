import {Component} from "react";
import Form from "../Form/Form";
import Watch from "../Watch/Watch";
import shortid from "shortid";

export default class Container extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listOfClocks: [{
                key: shortid.generate(),
                zone: undefined,
                name: undefined,
                deleteClock: this.deleteClock.bind(this),
            }]
        }
    }

    renderClocks() {
        return this.state.listOfClocks.map(clock => <Watch
            key={clock.key}
            zone={clock.zone}
            name={clock.name}
            deleteClock={this.deleteClock.bind(this)}
        />)
    }

    deleteClock(key) {
        let newListOfClocks = [];
        for (let item of this.state.listOfClocks) {
            if (item.key.toString() !== key.toString()) {
                newListOfClocks.push(item);
            }
        }
        this.setState({
            listOfClocks: newListOfClocks,
        })
    }

    addClock(clock) {
        this.state.listOfClocks.push({
            key: clock.key,
            zone: clock.zone,
            name: clock.name,
            deleteClock: this.deleteClock.bind(this),
        });
        this.setState({
            listOfClocks: this.state.listOfClocks,
        })
    }

    render() {
        return (
            <div>
                <Form zones={this.props.zones} addClock={this.addClock.bind(this)}/>
                {this.renderClocks()}
            </div>
        );
    }
}