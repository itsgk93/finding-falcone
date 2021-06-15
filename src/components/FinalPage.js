import React, { Component } from "react";

export default class FinalPage extends Component {
  render() {
    const { status, time } = this.props.store;
    const planetName =
      status === "success" ? (
        <p>Planet found : {this.props.store.planet_name}</p>
      ) : null;
    return (
      <div>
        <center>
          <p>
            {status == "success"
              ? "Success ! Congratulations on Finding Falcone. King Shan is mighty pleased."
              : "Oops ! Better Luck Next Time"}
          </p>
          <br />
          <p>Time taken : {time}</p>
          {status === "success" ? planetName : null}
          <br />
          <p>
            <button
              className="btn badge badge-secondary "
              onClick={this.props.reset}
            >
              Start Again
            </button>
            <br />
          </p>
        </center>
      </div>
    );
  }
}
