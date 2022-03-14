import React, {Component} from 'react';
import './Watch.css';
import ClockEngine from "../../services/ClockEngine/ClockEngine";

export default class Watch extends Component {
    constructor(props) {
        super(props);
        this.clockEngine = new ClockEngine();
        this.date = this.getTimeWithZone();
        this.state = {
            hour: {transform: `rotate(${this.clockEngine.getHour(this.date)}deg)`},
            minute: {transform: `rotate(${this.clockEngine.getMinute(this.date)}deg)`},
            second: {transform: `rotate(${this.clockEngine.getSecond(this.date)}deg)`},
        }
        this.interval = 1000;
    }

    getTimeWithZone() {
        return new Date((new Date()).toLocaleString("en-EN", {timeZone: this.props.zone}));
    }

    clock() {
        this.interval = setInterval(() => {
            this.date = this.getTimeWithZone();
            this.setState({
                hour: {transform: `rotate(${this.clockEngine.getHour(this.date)}deg)`},
                minute: {transform: `rotate(${this.clockEngine.getMinute(this.date)}deg)`},
                second: {transform: `rotate(${this.clockEngine.getSecond(this.date)}deg)`},
            });
        }, this.interval)
    }

    deleteButtonHandler = event => {
        event.preventDefault();
        this.props.deleteFunc(this._reactInternals.key);
    }

    componentDidMount() {
        this.clock();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">{this.props.zone}</label>
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">{this.props.name}</label>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.deleteButtonHandler}
                >Удалить
                </button>
                <div className="clock">
                    <div className="wrap">
                        <span className="hour" style={this.state.hour}/>
                        <span className="minute" style={this.state.minute}/>
                        <span className="second" style={this.state.second}/>
                        <span className="dot"/>
                    </div>
                </div>
            </div>
        );
    }
}

Watch.defaultProps = {
    zone: 'Europe/Moscow',
    name: 'Moscow'
};