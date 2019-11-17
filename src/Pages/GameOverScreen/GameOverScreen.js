import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView
} from "react-native";

// finish video part 05 resp adap


import BodyText from '../../Atom/BodyText/BodyText';
import Title from '../../Atom/Title/Title';
import MainButton from '../../Atom/MainButton/MainButton';
import Colors from '../../Template/Constants/colors';


const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Title>The Game is Over!</Title>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../../Template/assets/images/success.png')}
                        //source={{uri:'data:image/jpeg;base64,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'}}
                        resizeMode= "cover"
                        style={styles.image}    
                    />
                </View>
                <View style={styles.textContainer}>
                    <BodyText style={styles.resulttext}>
                        Your phone needed{'  '}
                        <Text style={styles.highlight}>{props.roundsNumber}  </Text>
                        rounds guess The number{'  '}
                        <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 20,
    },
    resulttext: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height > 400 ? 16 : 20,
    },
    highlight: {
        color: Colors.primary, 
        fontFamily: 'bold',
    },
});

export default GameOverScreen;