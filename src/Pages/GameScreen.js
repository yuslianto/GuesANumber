import React, { useState, useRef, useEffect} from "react";
import { 
    View,
    Text,
    Button,
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";

import NumberContainer from '../Organisme/NumberContainer';
import Card from '../Organisme/Card';
import Title from '../Atom/Title';
import BodyText from '../Atom/BodyText';
import MainButton from '../Atom/MainButton';

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

    
const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem} >
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);


    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t lie', 'You know that this is wrong...',[
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        } 
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
        );
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(currPassGuesses => [nextNumber, ...currPassGuesses])
    };

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton 
                    onPress={nextGuessHandler.bind(this, 'lower')} 
                >LOWER</MainButton>
                <MainButton 
                    onPress={nextGuessHandler.bind(this, 'greater')} 
                >GREATER</MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 900,
        maxWidth: '90%'
    },
    list: {
        width: '80%',
        flex: 1
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default GameScreen;