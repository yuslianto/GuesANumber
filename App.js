import React, { Componennt, useState } from "react";
import { 
  View,
  StyleSheet
} from "react-native";

import Header from "./src/Molekul/Header";
import StartGameScreen from "./src/Pages/StartGameScreen/StartGameScreen";
import GameScreen from './src/Pages/GameScreen/GameScreen';
import GameOverScreen from './src/Pages/GameOverScreen/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  
  const configureNewGameHandler = () => {
    setGuessRounds(0); 
    setUserNumber(null);
  };
    
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHnadler = (numOfRound) => {
    setGuessRounds(numOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHnadler} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen 
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
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
