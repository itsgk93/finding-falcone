import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="collapse navbar-collapse" id="navbarText"></div>
        <a
          className="nav-link navbar-brand"
          href="#"
          onClick={this.props.reset}
        >
          {" "}
          Reset <span className="sr-only">(current)</span>
        </a>
        <a className="navbar-brand" href="https://www.geektrust.in">
          GeekTrust{" "}
        </a>
      </nav>
    );
  }
}
