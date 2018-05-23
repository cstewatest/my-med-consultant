import React from "react";
import { View, Text} from "react-native";

const ListItemDiagnosisInfo = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{props.prompt}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  )
};

export default ListItemDiagnosisInfo;

const styles = {
  container: {
    marginTop: 10
  },
  prompt: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: '#AED6F1'
  },
  description: {
    fontFamily: 'open-sans-regular',
    color: '#ffffff'
  }
}

