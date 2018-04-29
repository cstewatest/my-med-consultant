import { createStore } from "redux";
import DiagnosisInfoRequester from "../services/requesters/DiagnosisInfoRequester";

const initialState = {
  isFetching: false,
  requestedID: -1,
  diagnosisIDsInfo: [],
  requester: new DiagnosisInfoRequester(),
  requestFailed: false
};

export const actionTypes = {
  INFO_REQUESTED: "INFO_REQUESTED",
  REQUEST_COMPLETED: "REQUEST_COMPLETED",
  REQUEST_FAILED: "REQUEST_FAILED",
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    case actionTypes.INFO_REQUESTED: {
      const requestedID = payload.requestedID;
      return {
        ...state,
        isFetching: true,
        requestedID: requestedID,
        requestFailed: false
      }
    }
    case actionTypes.REQUEST_COMPLETED: {
      let { diagnosisIDsInfo, requestedID } = state;
      const diagnosisInfo = payload.potential;
      diagnosisIDsInfo[requestedID] = diagnosisInfo;
      return {
        ...state,
        isFetching: false,
        diagnosisIDsInfo: diagnosisIDsInfo,
        requestFailed: false
      };
    }
    case actionTypes.REQUEST_FAILED: {
      return {
        ...state, 
        isFetching: false,
        requestFailed: true
      }
    }
  }

  return state;
};
export const store = createStore(reducer);
