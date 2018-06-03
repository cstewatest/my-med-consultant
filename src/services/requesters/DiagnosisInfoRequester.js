import {
  store,
  actionTypes,
} from "../../reducers/diagnosisInfoRedux";
import { makeRequest, baseURL } from "../RequestMaker"

export default class DiagnosisInfoRequester {
  get() {
    const { requestedID } = store.getState();

    const fullURL = baseURL + "diagnosis_info?diagnosisID=" + requestedID;

    return(makeRequest(fullURL, store, actionTypes));
  }
}
