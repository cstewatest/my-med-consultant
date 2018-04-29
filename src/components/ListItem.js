import React from "react";
import { View, Text, TouchableOpacity} from "react-native";

const ListItem = props => {
  return (
    <View>
      <Text style={styles.row}>
        {props.item.Name}: {props.item.Accuracy}% Chance
      </Text> 
      <TouchableOpacity onPress={props.onPress}>
         <Text style={styles.row}> More Info </Text>
      </TouchableOpacity>
    </View>
  )
};

export default ListItem;

const styles = {
  row: {
    padding: 5,
    marginBottom: 2,
    fontFamily: "open-sans-bold",
    color: "#ffffff"
  }
}

