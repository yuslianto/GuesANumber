import React, {useState} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

const generateRandomBetween = (min, max, exlude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max -min)) + min;
    if (rndNum === exlude) {
        return generateRandomBetween(min, max, exlude);
    } else {
        return rndNum;
    }
};

const GameScreen = (props) => {
    const [currentValue, setCurrentValue] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    return (
        <View style={styles.container}>
            <Text>game screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default GameScreen;