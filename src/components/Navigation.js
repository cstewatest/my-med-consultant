import React from "react";

import { StyleSheet, Text } from "react-native";

const Navigation = props => {
  return <Text style={styles.title}> UNJANI </Text>;
};

export default Navigation;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#ffffff",
    padding: 20,
    paddingTop: 50,
    textAlign: "center",
    fontFamily: "open-sans-bold"
  }
});
