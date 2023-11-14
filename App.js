import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserScreen from './Screens/UserScreen';
import UserScreen1 from './Screens/UserScreen1';

export default function App() {
  return (
    <View>
      {/* <UserScreen/> */}
      <UserScreen1/>
    </View>
  );
}

