import {
  store,
  actionTypes,
} from "../../reducers/diagnosisInfoRedux";
import Requester from "../Requester"

export default class DiagnosisInfoRequester extends Requester {
  get() {
    const { requestedID } = store.getState();

    const fullURL = this.BASE_URL + "diagnosis_info?diagnosisID=" + requestedID;

    return this.makeRequest(fullURL);
  }
}
