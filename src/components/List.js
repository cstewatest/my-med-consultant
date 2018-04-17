import React from "react";
import { FlatList, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
    this.setState({ formattedItems: formattedItems });
  }

  extractKey = ({ ID }) => ID;

  renderItem = ({ item }) => {
    return (
      <Text style={styles.row}>
        {item.Name}: {item.Accuracy}% Chance
      </Text>
    );
  };

  render() {
    const showError = this.props.items.length == 0 ;
    const errorText = "Could not find potential diagnoses. Please ensure you have selected every symptom you are experiencing."
    return (
      <ScrollView style={styles.container}>
        <Icon
          style={styles.icon}
          name="ios-medkit"
          ios="ios-medkit"
          md="md-medkit"
        />
        <Text style={styles.prompt}> 
         { showError ? errorText : this.props.prompt }
        </Text>
        <FlatList
          data={this.state.formattedItems}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 5,
    marginBottom: 2,
    fontFamily: "open-sans-bold",
    color: "#ffffff"
  },
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
