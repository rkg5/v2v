// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ data }) => {
  const { name, description, latitude, longitude, imageSource } = data;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <Text>Name: {name}</Text>
      <Text>Description: {description}</Text>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default Card;
