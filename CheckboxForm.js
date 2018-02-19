import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import styles from './FormStyles'
import t from 'tcomb-form-native';

const Form = t.form.Form;

let _ = require('lodash');

const checkboxStylesheet = _.cloneDeep(Form.stylesheet);

checkboxStylesheet.fieldset.marginTop = 10
checkboxStylesheet.formGroup.normal.flexDirection = 'row' 
checkboxStylesheet.formGroup.normal.justifyContent = 'space-between'

export default class CheckboxForm extends React.Component {
  state = {error: ""}  

  onFormSubmit = () =>  {
    const {allOptions, onFormSubmit, validateOneOption, prompt} = this.props
    const formData = this._form.getValue();
    let selectedIDs = Object.keys(formData).filter(key => formData[key] == true);
    if (selectedIDs.length == 1) {
      let formattedIDs = selectedIDs.map(key => parseInt(key))
      onFormSubmit(formattedIDs);
    } else if (validateOneOption && selectedIDs.length > 1) {
      this.setState({error: "Please make only one selection."}) 
    } else {
      this.setState({error: "Please make at least one selection."})
    }
  }
 
  renderSwitchCell = (symptomObj, i) => {
    return (
      <SwitchCell title={symptomObj.Name}  key={i} ref={i}>  </SwitchCell>
    )
  }

  render () {
    const {allOptions, prompt} = this.props
    let symptomsByID = {}
    let customizeOptions = {stylesheet: checkboxStylesheet, fields: {}}  
    
    allOptions.forEach(obj =>{ 
      symptomsByID[obj.ID] = t.Boolean
      customizeOptions['fields'][obj.ID] = {label: obj.Name}
    })  

    let symptomsForForm = t.struct(symptomsByID)  

    return (
      <View style={styles.container}>
        <Text style={styles.prompt}>{prompt}</Text>
        <Text style={localStyles.error}> {this.state.error} </Text>
        <Form type={symptomsForForm} options={customizeOptions}  ref={c => this._form = c} />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onFormSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const localStyles = {
  error: {
    alignSelf: 'center',
    color: '#ff7043',
  }
}
