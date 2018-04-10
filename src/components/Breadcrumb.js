import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Breadcrumb = props => {
  const handleSelection = () => {
    const { onSelection, identifier } = props;
    onSelection(identifier);
  };

  return (
    <TouchableOpacity onPress={handleSelection}>
      <Text style={styles.breadcrumb}>{props.item} </Text>
    </TouchableOpacity>
  );
};

export default Breadcrumb;

const styles = {
  breadcrumb: {
    fontFamily: "open-sans-bold",
    color: "#AED6F1",
    textDecorationLine: "underline",
    fontSize: 14,
    justifyContent: "center"
  }
};
