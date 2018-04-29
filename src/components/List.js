import React from "react";
import { FlatList, Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  store,
  actionTypes
} from "../reducers/diagnosisInfoRedux";
import ListItem from "./ListItem"

export default class List extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { formattedItems: [] };
  }

  componentWillMount() {
    const { items } = this.props;
    const formattedItems = items.map(o => {
      return o.Issue;
    });
    
    this.setState({ ...store.getState(), formattedItems: formattedItems });
    
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  extractKey = ({ ID }) => ID;

  handleSelection = (ID) => {
    store.dispatch({
      type: actionTypes.INFO_REQUESTED,
      payload: { requestedID: ID }
    });
    this.state.requester && this.state.requester.get();
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        item = {item}
        onPress = {() => this.handleSelection(item.ID)}
      />
    );
  };  

  render() {
    const showError = this.props.items.length == 0 ;
    const errorText = "Could not find potential diagnoses. Please ensure you have selected every symptom you are experiencing."
    return (
      <ScrollView style={localStyles.container}>
        <Icon
          style={localStyles.icon}
          name="ios-medkit"
          ios="ios-medkit"
          md="md-medkit"
        />
        <Text style={localStyles.prompt}> 
          {this.state.diagnosisIDsInfo[this.state.requestedID] && this.state.diagnosisIDsInfo[this.state.requestedID].Description}
         { showError ? errorText : this.props.prompt }
        </Text>
        <FlatList
          data={this.state.formattedItems}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
        />
        <View style={styles.whiteSpace}>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  prompt: {
    fontSize: 15,
    fontFamily: "open-sans-bold",
    color: "#1e90ff",
    textAlign: "center",
    margin: 15
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 2
  },
  icon: {
    color: "#ffffff",
    alignSelf: "center",
    marginTop: 10,
    fontSize: 30
  }
});
