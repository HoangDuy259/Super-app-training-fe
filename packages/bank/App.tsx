/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import BankNavigation from './src/navigation/BankNavigation';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <BankNavigation />
    </NavigationContainer>
  );
}

export default App;
