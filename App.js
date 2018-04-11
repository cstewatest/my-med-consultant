import React from "react";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from "react-native";

import {
  store,
  actionTypes,
  stages,
  stagesKeys,
  prompts
} from "./src/reducers/unjaniRedux";

import Requester from "./src/services/Requester";
import PersonalDataForm from "./src/components/PersonalDataForm";
import CheckboxForm from "./src/components/CheckboxForm";
import List from "./src/components/List";
import Navigation from "./src/components/Navigation";
import MainImage from "./src/components/MainImage";
import MedicalInfo from "./src/components/MedicalInfo";

import { Font } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontsAreLoaded: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });

    this.setState({ ...store.getState(), fontsAreLoaded: true });

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkValidateOneOption() {
    const { stage } = this.state;

    return stage === stages.BODY_LOCATION || stage === stages.BODY_SUBLOCATION;
  }

  getExistingMedicalInfo() {
    const { medicalInfo } = this.state;
    const orderedKeys = stagesKeys.filter(n => {
      return (
        Object.keys(medicalInfo).includes(n) && medicalInfo[n].selectedNames
      );
    });
    return orderedKeys.map(k => {
      return { identifier: k, item: medicalInfo[k].selectedNames.join(", ") };
    });
  }

  getPrompt() {
    const { stage } = this.state;

    return prompts[stage];
  }

  getCheckboxFormOptions() {
    const { stage } = this.state;

    return (
      this.state.medicalInfo[stage] && this.state.medicalInfo[stage].potential
    );
  }

  onBreadcrumbSelection = stage => {
    store.dispatch({
      type: actionTypes.PREVIOUS_STAGE_SELECTED,
      payload: { prevStage: stage }
    });
  };

  onPersonalDataChange = (gender, birthYear) => {
    store.dispatch({
      type: actionTypes.PERSONAL_DATA_CHANGE,
      payload: { gender: gender, birthYear: birthYear }
    });
  };

  onSelectOptions = selectedIDs => {
    store.dispatch({
      type: actionTypes.OPTIONS_SUBMITTED,
      payload: { selected: selectedIDs }
    });
    // make this the same requester throughout the code. no need to reinstantiate
    let requester = new Requester(this.state.gender, this.state.birthYear);
    requester.get();
  };

  render() {
    const { stage, isFetching, fontsAreLoaded } = this.state;

    if (!fontsAreLoaded) {
      return (
        <View>
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="#ffffff"
            animating={true}
          />
        </View>
      );
    }

    let mainComponent;
    if (stage == stages.PERSONAL_DATA) {
      mainComponent = (
        <PersonalDataForm onFormSubmit={this.onPersonalDataChange} />
      );
    } else if (stage == stages.REQUEST_FAILED) {
      mainComponent = (
        <View>
          <Text> We're sorry. Something went wrong. Please try again later. </Text>
        </View>
      );
    } else if (stage == stages.DIAGNOSIS) {
      mainComponent = (
        <List prompt={this.getPrompt()} items={this.getCheckboxFormOptions()} />
      );
    } else {
      mainComponent = (
        <CheckboxForm
          onFormSubmit={this.onSelectOptions}
          validateOneOption={this.checkValidateOneOption()}
          prompt={this.getPrompt()}
          allOptions={this.getCheckboxFormOptions()}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Navigation />
        <MainImage />
        <MedicalInfo
          isFetching={isFetching}
          hasSubmittedMedicalInfo={
            !(stage == stages.PERSONAL_DATA || stage == stages.BODY_LOCATION)
          }
          itemObjs={this.getExistingMedicalInfo()}
          onItemSelection={this.onBreadcrumbSelection}
        />
        {isFetching ? (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="#ffffff"
            animating={true}
          />
        ) : (
          mainComponent
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 50
  },
  container: {
    flex: 1,
    backgroundColor: "#1e90ff"
  },
  error: {
    fontFamily: "open-sans-bold",
    paddingBottom: 10,
    color: "#cc0000",
    fontSize: 20
  },
});
