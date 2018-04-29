import {
  store,
  actionTypes,
  stages,
  noneOption
} from "../../reducers/unjaniRedux";
import moment from "moment";
import { makeRequest, baseURL } from "../RequestMaker"

export default class MainRequester {
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
          return baseURL + "sublocations?locationID=" + locationID;
        }
        case stages.BODY_SUBLOCATION: {
          const locationID = this.getLocationID(
            stages.BODY_SUBLOCATION,
            medicalInfo
          );
          const mwbg = this.getMwbg();
          return (
            baseURL +
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
            baseURL +
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
            baseURL +
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

    return makeRequest(fullURL(), store, actionTypes);
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
}
