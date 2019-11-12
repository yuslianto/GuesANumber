import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image,
} from "react-native";

// finish video part 22 and just git push


import BodyText from '../Atom/BodyText';
import Title from '../Atom/Title';

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Title>The Game is Over!</Title>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../Template/assets/images/success.png')}
                    resizeMode= "cover"
                    style={styles.image}    
                />
            </View>
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
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30,
    },
    image: {
        width: '100%',
        height: '100%'
    },
});

export default GameOverScreen;