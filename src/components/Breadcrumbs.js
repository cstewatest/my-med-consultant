import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Breadcrumb from "./Breadcrumb";

const Breadcrumbs = (props) => {
  const renderItem = (itemObj, index) => {
    const { onItemSelection } = props;
    let icon;
    if (index > 0) {
      icon = (
        <Icon
          style={styles.icon}
          name="ios-arrow-forward"
          ios="ios-arrow-forward"
          md="md-arrow-forward"
        />
      );
    }
    return (
      <View style={styles.breadcrumbGroup} key={index}>
        {icon}
        <Breadcrumb
          onSelection={onItemSelection}
          item={itemObj.item}
          identifier={itemObj.identifier}
        />
      </View>
    );
  };

  return (
    <View style={styles.breadcrumbs}>{props.itemObjs.map(renderItem)}</View>
  );
}

export default Breadcrumbs

const styles = {
  breadcrumbGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 5,
    color: "#AED6F1"
  },
  breadcrumbs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    margin: 10,
    flexWrap: "wrap",
    alignContent: "space-between"
  }
};
