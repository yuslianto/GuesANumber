import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

import Header from "./src/Molekul/Header";
import StartGameScreen from "./src/Pages/StartGameScreen";

class App extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number"/>
        <StartGameScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});

export default App;