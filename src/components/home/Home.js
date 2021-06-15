import React, { Component } from "react";
import "./Home.css";
import Planet from "../planet/Planet";
import { connect } from "react-redux";
import { findfalcone } from "../actions/actionCreator";
import { token_url, find_url } from "../utils/endpoints";

const MAX_PLANETS = 4;

export class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  findFalcone = () => {
    let planet_names = [];
    let vehicle_names = [];
    this.props.store.planets.forEach((planet) => {
      if (planet.selected) {
        planet_names.push(planet.name);
      }
    });
    this.props.store.vehicles.forEach((vehicle) => {
      if (vehicle.selected > 0) {
        let count = vehicle.selected;
        while (count > 0) {
          vehicle_names.push(vehicle.name);
          count--;
        }
      }
    });
    const body = {
      token: "",
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };
    this.props.findfalcone(token_url, find_url, body);
  };

  planetsSelected() {
    let count = 0;
    this.props.store.vehicles.forEach((vehicle) => {
      count = count + vehicle.selected;
    });
    return count == MAX_PLANETS;
  }

  render() {
    let planets = [];

    for (let id = 1; id <= MAX_PLANETS; id++) {
      const key = id;

      planets.push(
        <div className="w-20" key={key}>
          <b className="text_bold">Destination {id}</b>
          <Planet id={key} />
        </div>
      );
    }

    return (
      <div className="container">
        <center>
          <h3 className="py-5">Select planets you want to search in</h3>
        </center>
        <div className="row">
          {planets}
          <div className="w-20">
            <b className="text_bold stick_right">
              Time taken : {this.props.store.time}
            </b>
            <br />
          </div>
        </div>
        <center className="my-5">
          <button
            className="btn badge badge-secondary"
            onClick={this.findFalcone}
            disabled={this.planetsSelected() ? false : true}
          >
            Find Falcone
          </button>
          <br />
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findfalcone: (token_url, find_url, data) => {
      dispatch(findfalcone(token_url, find_url, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
