import {Component} from "react";
import shortid from 'shortid';
import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.zoneTemplate = "Выберите...";
        this.state = {
            zone: '',
            name: '',
            error: {display: "none"},
        }
    }

    renderOptions() {
        return this.props.zones.map(item => <option key={shortid.generate()} value={item}>{item}</option>);
    }

    selectChangeHandler(event) {
        this.setState({
            zone: event.target.value,
        })
    }

    nameChangeHandler(event) {
        this.setState({
            name: event.target.value,
        })
    }

    clickButtonHandler(event) {
        event.preventDefault();
        if (!this.state.zone || !this.state.name || this.state.zone === this.zoneTemplate) {
            this.setState({
                error: {display: "block"}
            })
        } else {
            this.props.addClock({
                key: shortid.generate(),
                zone: this.state.zone,
                name: this.state.name,
            })
            this.setState({
                zone: this.zoneTemplate,
                name: "",
                error: {display: "none"},
            })
        }
    }

    render() {
        return (
            <form>
                <div className="form-row align-items-center">
                    <div className="col-auto my-1">
                        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Временные зоны</label>
                        <div className="col-auto my-1 option-list">
                            <select
                                className="custom-select mr-sm-2"
                                id="inlineFormCustomSelect"
                                onChange={this.selectChangeHandler.bind(this)}
                                required={true}
                            >
                                <option>{this.state.zone || "Выберите зону..."}</option>
                                {this.renderOptions()}
                            </select>
                            <div className="col-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Название"
                                    value={this.state.name}
                                    onChange={this.nameChangeHandler.bind(this)}
                                    required={true}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.clickButtonHandler.bind(this)}
                            >Добавить
                            </button>
                        </div>
                        <div className="invalid-feedback " style={this.state.error}>Введены не все данные...</div>
                    </div>
                </div>
            </form>
        );
    }
}