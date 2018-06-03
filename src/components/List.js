import React from "react";
import { ActivityIndicator, Modal, FlatList, Text, StyleSheet, ScrollView, View, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  store,
  actionTypes
} from "../reducers/diagnosisInfoRedux";
import ListItem from "./ListItem"
import ListItemDiagnosisInfo from  "./ListItemDiagnosisInfo"

export default class List extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { formattedItems: [], modalVisible: false };
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
    this.setModalVisible(true);
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const showError = this.props.items.length == 0 ;
    const errorText = "Could not find potential diagnoses. Please ensure you have selected every symptom you are experiencing."
    let modalTextComponent; 
    if (this.state.requestFailed) {
      modalTextComponent = <Text style={localStyles.modalText}> "We're sorry. Something went wrong. Please try again later."</Text>
    } else if (this.state.diagnosisIDsInfo[this.state.requestedID]) {
      modalTextComponent = (
        <View>
          <ListItemDiagnosisInfo prompt="Description" description={this.state.diagnosisIDsInfo[this.state.requestedID].DescriptionShort} />
          <ListItemDiagnosisInfo prompt="Possible Symptoms" description={this.state.diagnosisIDsInfo[this.state.requestedID].PossibleSymptoms} />
          <ListItemDiagnosisInfo prompt="Description of Symptoms" description={this.state.diagnosisIDsInfo[this.state.requestedID].MedicalCondition} />
          <ListItemDiagnosisInfo prompt="Treatment" description={this.state.diagnosisIDsInfo[this.state.requestedID].TreatmentDescription} />    
      </View>
    )
   }
  const activityIndicator =
     <ActivityIndicator
        size="large"
        color="#1e90ff"
        animating={true}
      />    
  return (
    <ScrollView>
      <Icon
        style={localStyles.icon}
        name="ios-medkit"
        ios="ios-medkit"
        md="md-medkit"
      />
      <Text style={localStyles.prompt}> 
       { showError ? errorText : this.props.prompt }
      </Text>
        <FlatList
          data={this.state.formattedItems}
          renderItem={this.renderItem}
          keyExtractor={this.extractKey}
        />
        <View style={styles.whiteSpace} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
          <ScrollView style={localStyles.modalContent} stickyHeaderIndices={[0]}>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Icon style={localStyles.modalClose} name="ios-close-circle" ios="ios-close-circle-outline" md="md-close-circle" /> 
            </TouchableOpacity>
            {this.state.isFetching ? activityIndicator : modalTextComponent}
            <View style={styles.whiteSpace} />
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  }
}

const localStyles = StyleSheet.create({
  prompt: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    margin: 15
  },
  icon: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 30
  },
  modalContent: {
    backgroundColor: '#000000',
    marginTop: 300,
    marginBottom: 100,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    padding: 10
  },
  modalClose: {
    color: '#AED6F1',
    marginLeft: 'auto',
    fontSize: 15,
    width: 15,
    height: 15
  },
  modalText: {
    fontFamily: "open-sans-bold",
    fontSize: 15
  },
  diagnosisInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
