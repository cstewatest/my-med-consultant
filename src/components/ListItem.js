import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ListItem = props => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowContent}> {Math.round(props.item.Accuracy)}% match </Text> 
      <Text style={{...styles.rowContent, color: '#ff7043', width: 200}}> {props.item.Name} </Text>
      <TouchableOpacity onPress={props.onPress}>
        <Icon style={styles.icon} name="ios-add-circle" ios="ios-add-circle" md="md-add-circle" /> 
      </TouchableOpacity>
    </View>
  )
};

export default ListItem;

const styles = {
  row: {
    padding: 5,
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContent: {
    fontSize: 15,
    fontFamily: 'open-sans-bold'
  },
  icon: {
    fontSize: 15,
    width: 15,
    height: 15,
    marginRight: 10
  }
}

