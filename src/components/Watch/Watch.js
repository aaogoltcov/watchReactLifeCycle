import React, {Component} from 'react';
import './Watch.css';
import ClockEngine from "../../services/ClockEngine/ClockEngine";

export default class Watch extends Component {
    constructor(props) {
        super(props);
        this.clockEngine = new ClockEngine();
        this.date = this.getTimeWithZone();
        this.state = {
            hour: {transform: this.transformStyle(this.date, 'hour')},
            minute: {transform: this.transformStyle(this.date, 'minute')},
            second: {transform: this.transformStyle(this.date)},
        }
        this.interval = 1000;
    }

    transformStyle(date, type='second') {
        if (type === 'hour') {
            return `rotate(${this.clockEngine.getHour(date)}deg)`;
        } else if (type === 'minute') {
            return `rotate(${this.clockEngine.getMinute(date)}deg)`;
        } else if (type === 'second') {
            return `rotate(${this.clockEngine.getSecond(date)}deg)`;
        } else {
            console.log('Error with transform style date type');
        }
    }

    getTimeWithZone() {
        return new Date((new Date()).toLocaleString("en-EN", {timeZone: this.props.zone}));
    }

    intervalHandler(type='end') {
        if (type=== 'start') {
            this.clock();
        } else {
            clearInterval(this.intervalFunc);
        }
    }

    clock() {
        this.intervalFunc = setInterval(() => {
            this.date = this.getTimeWithZone();
            this.setState({
                hour: {transform: this.transformStyle(this.date, 'hour')},
                minute: {transform: this.transformStyle(this.date, 'minute')},
                second: {transform: this.transformStyle(this.date)},
            });
        }, this.interval)
    }

    deleteButtonHandler = event => {
        event.preventDefault();
        this.props.deleteFunc(this._reactInternals.key);
    }

    componentDidMount() {
        this.intervalHandler('start');
    }

    componentWillUnmount() {
        this.intervalHandler();
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