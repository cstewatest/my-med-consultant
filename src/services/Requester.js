import {
  store,
  actionTypes,
  stages,
  noneOption
} from "../reducers/unjaniRedux";
import moment from "moment";

export default class Requester {
  BASE_URL = "http://ec2-54-204-218-134.compute-1.amazonaws.com/";

  constructor(gender, birthYear) {
    this.gender = gender;
    this.birthYear = birthYear;
  }

  get() {
    const { stage, medicalInfo } = store.getState();

    const fullURL = () => {
      switch (stage) {
        case stages.BODY_LOCATION: {
          const locationID = this.getLocationID(
            stages.BODY_LOCATION,
            medicalInfo
          );
          return this.BASE_URL + "sublocations?locationID=" + locationID;
        }
        case stages.BODY_SUBLOCATION: {
          const locationID = this.getLocationID(
            stages.BODY_SUBLOCATION,
            medicalInfo
          );
          const mwbg = this.getMwbg();
          return (
            this.BASE_URL +
            "sublocation_symptoms?locationID=" +
            locationID +
            "&mwbg=" +
            mwbg
          );
        }
        case stages.SUBLOCATION_SYMPTOMS: {
          const locationIDs = this.getLocationIDs(
            stages.SUBLOCATION_SYMPTOMS,
            medicalInfo
          );
          return (
            this.BASE_URL +
            "additional_symptoms?symptoms=" +
            JSON.stringify(locationIDs) +
            "&gender=" +
            this.gender +
            "&year_of_birth=" +
            this.birthYear
          );
        }
        case stages.ADDITIONAL_SYMPTOMS: {
          const symptomLocationIDs = this.getLocationIDs(
            stages.SUBLOCATION_SYMPTOMS,
            medicalInfo
          );
          const locationIDs = this.getLocationIDs(
            stages.ADDITIONAL_SYMPTOMS,
            medicalInfo
          );
          const noneOptionIndex = locationIDs.indexOf(noneOption.ID);
          if (noneOptionIndex > -1) {
            locationIDs.splice(noneOptionIndex);
          }
          const allLocationIDs = symptomLocationIDs.concat(locationIDs);
          return (
            this.BASE_URL +
            "diagnosis?symptoms=" +
            JSON.stringify(allLocationIDs) +
            "&gender=" +
            this.gender +
            "&year_of_birth=" +
            this.birthYear
          );
        }
      }
    };

    return this.makeRequest(fullURL());
  }

  getLocationID(stage, medicalInfo) {
    return medicalInfo[stage].selected[0];
  }

  getLocationIDs(stage, medicalInfo) {
    return medicalInfo[stage].selected;
  }

  getMwbg() {
    let thisYear = moment().year();
    let elevenYearsAgo = thisYear - 11;
    let isOverEleven = this.birthYear < elevenYearsAgo;

    switch (this.gender) {
      case "female": {
        return isOverEleven ? "woman" : "girl";
      }
      case "male": {
        return isOverEleven ? "man" : "boy";
      }
    }
  }

  makeRequest(url) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const result = request.response;
        store.dispatch({
          type: actionTypes.REQUEST_COMPLETED,
          payload: { potential: eval(result) }
        });
      } else {
        console.log(request.status);
        console.log(request.response);
      }
    };

    request.open("GET", url);
    request.send();
  }
}
