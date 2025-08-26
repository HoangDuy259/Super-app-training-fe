import {
  Platform,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Colors from '../themes/Color';

const HeaderTab = ({
  children,
  leftBtnIcon = null,
  rightBtnIcon = null,
  handleLeftBtn = () => {},
  handleRightBtn = () => {},
}) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerTab}>
        <TouchableOpacity
          style={styles.headerTabButton}
          onPress={handleLeftBtn}
        ></TouchableOpacity>
        <Text style={styles.headerTabText}>{children}</Text>
        <TouchableOpacity
          style={styles.headerTabButton}
          onPress={handleRightBtn}
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    paddingTop:
      Platform.OS === 'android' && StatusBar.currentHeight != null
        ? StatusBar.currentHeight - 30
        : 0,
    backgroundColor: '#fff',
  },
  headerTab: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTabText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerTabButton: {
    paddingHorizontal: 10,
  },
});

export default HeaderTab;
