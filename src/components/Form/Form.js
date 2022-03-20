import {Component} from "react";
import shortid from 'shortid';
import Watch from "../Watch/Watch";
import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.zoneTemplate = "Выберите...";
        this.state = {
            zone: undefined,
            name: undefined,
            error: {display: "none"},
            listOfClocks: [{
                key: shortid.generate(),
                zone: undefined,
                name: undefined,
                deleteFunc: this.deleteItem,
            }]
        }
    }

    renderOptions() {
        return this.props.zones.map(item => <option key={shortid.generate()} value={item}>{item}</option>);
    }

    renderClocks() {
        return this.state.listOfClocks.map(clock => <Watch
            key={clock.key}
            zone={clock.zone}
            name={clock.name}
            deleteFunc={this.deleteItem}
        />)
    }

    selectChangeHandler = event => {
        this.setState({
            zone: event.target.value,
        })
    }

    nameChangeHandler = event => {
        this.setState({
            name: event.target.value,
        })
    }

    clickButtonHandler = event => {
        event.preventDefault();
        console.log("zone: ", this.state.zone, "name: ", this.state.name);
        if (!this.state.zone || !this.state.name || this.state.zone === this.zoneTemplate) {
            this.setState({
                error: {display: "block"}
            })
        } else {
            this.state.listOfClocks.push({
                key: shortid.generate(),
                zone: this.state.zone,
                name: this.state.name,
                deleteFunc: this.deleteItem,
        });
            this.setState({
                zone: this.zoneTemplate,
                name: "",
                error: {display: "none"},
            })
        }
    }

    deleteItem = key => {
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

    render() {
        return (
            <>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">Временные зоны</label>
                            <div className="col-auto my-1 option-list">
                                <select
                                    className="custom-select mr-sm-2"
                                    id="inlineFormCustomSelect"
                                    onChange={this.selectChangeHandler}
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
                                        onChange={this.nameChangeHandler}
                                        required={true}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.clickButtonHandler}
                                >Добавить
                                </button>
                            </div>
                            <div className="invalid-feedback " style={this.state.error}>Введены не все данные...</div>
                        </div>
                    </div>
                </form>
                <div>
                    {this.renderClocks()}
                </div>
            </>
        );
    }

}