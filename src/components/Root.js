import React, { Component } from "react";
import HomePage from "./home/Home";
import { connect } from "react-redux";
import { reset } from "./actions/actionCreator";
import FinalPage from "./FinalPage";
import Error from "./utils/Error";
import Loading from "./utils/Loading";
import Header from "./sections/header/Header";
import Footer from "./sections/footer/Footer";

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
    };
  }

  reset = () => {
    this.props.reset();
    this.setState((prevState) => {
      return {
        id: prevState.id + 1,
      };
    });
  };

  componentWillMount() {
    this.props.reset();
  }

  isLoading = () => {
    const { status } = this.props.store;
    return status == "Loading" || status == "Searching";
  };

  isError = () => {
    console.log(this.props.store.error);
    return this.props.store.error.trim().length > 0;
  };

  isProblemSolved = () => {
    if (
      this.props.store.status == "success" ||
      this.props.store.status == "false"
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div>
        <Header reset={this.reset} />
        <div className="container-fluid">
          <center>
            <h1 className="my-3">Finding Falcone!</h1>
          </center>
          {this.isLoading() ? (
            <Loading message={this.props.store.status} />
          ) : null}
          {this.isProblemSolved() ? (
            <FinalPage reset={this.reset} store={this.props.store} />
          ) : null}
          {this.isError() ? <Error message={this.props.store.error} /> : null}
          {!this.isProblemSolved() && !this.isError() && !this.isLoading() ? (
            <HomePage key={this.state.id} />
          ) : null}
        </div>
        <Footer />
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
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
