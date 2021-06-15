import {
  UPDATE_TIME,
  ADD_QUANTITY,
  SUB_QUANTITY,
  PENDING,
  FULFILLED,
  ERROR,
  SEARCHED,
  SEARCHING,
} from "../actions/actionType";

const initState = {
  vehicles: [],
  planets: [],
  time: 0,
  status: "",
  error: "",
};

const appReducer = (state = initState, action) => {
  if (action.type === ADD_QUANTITY) {
    if (action.payload.index < 0) {
      return { ...state };
    }
    if (action.payload.type === "vehicle") {
      return updateVehicleStatus(action.payload.index, 1, state);
    }
    if (action.payload.type === "planet") {
      return updatePlanetStatus(action.payload.index, false, state);
    }
  }
  if (action.type === SUB_QUANTITY) {
    if (action.payload.index < 0) {
      return { ...state };
    }
    if (action.payload.type === "vehicle") {
      return updateVehicleStatus(action.payload.index, -1, state);
    }
    if (action.payload.type === "planet") {
      return updatePlanetStatus(action.payload.index, true, state);
    }
  }
  if (action.type === UPDATE_TIME) {
    const new_time = state.time + action.payload.time;
    return {
      ...state,
      time: new_time,
    };
  }
  if (
    action.type === PENDING ||
    action.type === ERROR ||
    action.type === FULFILLED ||
    action.type === SEARCHING ||
    action.type === SEARCHED
  ) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return { ...state };
};

function updateVehicleStatus(index, increment_by, prevState) {
  let prev_quantity = prevState.vehicles[index].total_no;
  let new_quantity =
    prev_quantity + increment_by >= 0
      ? prev_quantity + increment_by
      : prev_quantity;
  let vehicles = [...prevState.vehicles];
  vehicles[index].total_no = new_quantity;
  vehicles[index].selected =
    vehicles[index].selected - (new_quantity - prev_quantity);
  return {
    ...prevState,
    vehicles,
  };
}

function updatePlanetStatus(index, selected, prevState) {
  let planets = [...prevState.planets];
  planets[index].selected = selected;
  return {
    ...prevState,
    planets,
  };
}

export default appReducer;
