import React from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
import styles from "../constants/FormStyles";
import t from "tcomb-form-native";
import _ from "lodash";

const Form = t.form.Form;

const checkboxStylesheet = _.cloneDeep(Form.stylesheet);

checkboxStylesheet.fieldset.marginTop = 10;
checkboxStylesheet.formGroup.normal.flexDirection = "row";
checkboxStylesheet.formGroup.normal.justifyContent = "space-between";

export default class CheckboxForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: "" };
  }

  onFormSubmit = () => {
    const { allOptions, onFormSubmit, validateOneOption, prompt } = this.props;
    const formData = this._form.getValue();
    const selectedIDs = Object.keys(formData).filter(
      key => formData[key] == true
    );
    if (validateOneOption && selectedIDs.length > 1) {
      this.setState({ error: "Please make only one selection." });
    } else if (selectedIDs.length < 1) {
      this.setState({ error: "Please make at least one selection." });
    } else {
      const formattedIDs = selectedIDs.map(key => parseInt(key));
      onFormSubmit(formattedIDs);
    }
  };

  renderSwitchCell = (symptomObj, i) => {
    return (
      <SwitchCell title={symptomObj.Name} key={i} ref={i}>
        {" "}
      </SwitchCell>
    );
  };

  render() {
    const { allOptions, prompt } = this.props;
    let symptomsByID = {};
    let customizeOptions = { stylesheet: checkboxStylesheet, fields: {} };

    allOptions.forEach(obj => {
      symptomsByID[obj.ID] = t.Boolean;
      customizeOptions["fields"][obj.ID] = { label: obj.Name };
    });

    const symptomsForForm = t.struct(symptomsByID);

    return (
      <ScrollView style={localStyles.form}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Text style={localStyles.error}> {this.state.error} </Text>
        <Form
          type={symptomsForForm}
          options={customizeOptions}
          ref={c => (this._form = c)}
        />
        <TouchableOpacity style={styles.button} onPress={this.onFormSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        <View style={styles.whiteSpace}>
        </View>
      </ScrollView>
    );
  }
}

const localStyles = {
  form: {
    padding: 20
  },
  error: {
    alignSelf: "center",
    color: "#ff7043"
  }
};
