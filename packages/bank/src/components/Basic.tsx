import { View, Text, StyleSheet, Image, Button } from 'react-native';
import React, { useState } from 'react';

const Basic = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Basic Component</Text>
      <View style={styles.boxContainer}>
        <View style={styles.redBox} />
        <View style={styles.bludBox} />
        <View style={styles.greenBox} />
      </View>
      <Text style={styles.myFirstText}>My first React Native Course</Text>
      <Text style={styles.nestedText}>
        Nested Text <Text style={styles.bold}>is here</Text>
      </Text>
      <Image
        source={{
          uri: 'https://picsum.photos/200/300',
        }}
        style={styles.image}
      />
      <Button
        color={'red'}
        title="Click me"
        onPress={() => {
          setCount(count + 1);
        }}
      />
      <Text>Count is {count}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  redBox: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  bludBox: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
  greenBox: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
  },
  myFirstText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  nestedText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default Basic;
