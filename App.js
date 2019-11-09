import React, { Componennt, useState } from "react";
import { 
  View,
  StyleSheet
} from "react-native";

import Header from "./src/Molekul/Header";
import StartGameScreen from "./src/Pages/StartGameScreen";
import GameScreen from './src/Pages/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number"/>
        {content}
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
