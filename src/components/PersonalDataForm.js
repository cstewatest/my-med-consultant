import React from "react";
import t from "tcomb-form-native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "../constants/FormStyles";

const Gender = t.enums.of(["male", "female"]);

const startingBirthYear = 1920;

const birthYears = t.enums.of(
  Array.from(new Array(100), (v, i) => (i + startingBirthYear).toString())
);

const personalData = t.struct({
  birthYear: birthYears,
  gender: Gender
});

const defaultPersonalData = {
  birthYear: "1990",
  gender: "female"
};

const Form = t.form.Form;

Form.stylesheet.controlLabel.normal.fontFamily = "open-sans-regular";
Form.stylesheet.controlLabel.normal.color = "#ffffff";
Form.stylesheet.pickerContainer.normal.backgroundColor = "#ffffff";
Form.stylesheet.select.normal.backgroundColor = "#ffffff";

let options = {
  fields: {
    birthYear: {
      nullOption: false,
      label: "Birth Year"
    },
    gender: {
      nullOption: false
    }
  }
};

export default class PersonalDataForm extends React.Component {
  onFormSubmit = () => {
    const value = this._form.getValue();
    const { onFormSubmit } = this.props;
    onFormSubmit(value.gender, value.birthYear);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>TELL US ABOUT YOURSELF </Text>
        <Form
          type={personalData}
          options={options}
          value={defaultPersonalData}
          ref={c => (this._form = c)}
        />
        <TouchableOpacity style={styles.button} onPress={this.onFormSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
