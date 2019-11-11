import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image,
} from "react-native";

import BodyText from '../Atom/BodyText';
import Title from '../Atom/Title';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Title>The Game is Over!</Title>
            <Image source={require('../Template/assets/images/success.png')}/>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was {props.userNumber}</BodyText>
            <Button 
                title="NEW GAME" 
                onPress={props.onRestart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;