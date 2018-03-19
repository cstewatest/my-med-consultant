import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Image = (props) => {
  return <Image style={styles.image} source={require('../../assets/images/doctor.jpg')} />
}

export default Image

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: 400
  }
})
