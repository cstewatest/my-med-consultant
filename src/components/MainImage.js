import React from "react";
import { StyleSheet, Image } from "react-native";

const MainImage = props => {
  return (
    <Image
      style={styles.image}
      source={require("../../assets/images/homepage.png")}
    />
  );
};

export default MainImage;

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 100
  }
});
