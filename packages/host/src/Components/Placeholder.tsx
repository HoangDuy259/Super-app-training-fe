import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../themes/Color';

type Props = {
  label: string;
  icon: string;
};

const Placeholder: FC<Props> = ({ label, icon }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Icon size={96} color={Colors.primary} name={icon} />
      <Text style={styles.text}>{label}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: Colors.primary,
  },
});

export default Placeholder;
