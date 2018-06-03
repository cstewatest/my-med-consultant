import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { redFlagIDsNames } from "../reducers/mainRedux";
import Icon from "react-native-vector-icons/Ionicons";

const RedFlagWarning = props => {
  const { symptomIDs } = props;
  const symptomNames = [];
  for (var id of symptomIDs) {
    symptomNames.push(redFlagIDsNames[id])
  }
  return (
    <View style={styles.warningContainer}>
      <Icon
        style={styles.icon}
        name="ios-warning"
        ios="ios-warning"
        md="md-warning"
      /> 
      <Text style={styles.warning}>
        You have selected one or more symptoms which require a prompt check with a medical doctor: {symptomNames.join(', ')} 
      </Text>
    </View>
   )
};

export default RedFlagWarning;

const styles = StyleSheet.create({
  warningContainer: {
    backgroundColor: "#000000",
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2 
  },
  warning: {
    fontFamily: "open-sans-bold",
    color: "#ff7043",
    textAlign: "center"
  },
  icon: {
    color: "#ff7043",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 10
  }
});
