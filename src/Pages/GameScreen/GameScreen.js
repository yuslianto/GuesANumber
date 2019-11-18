import React, { useState, useRef, useEffect} from "react";
import { 
    View,
    Text,
    Button,
    Alert,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions
} from "react-native";

import NumberContainer from '../../Organisme/NumberContainer';
import Card from '../../Organisme/Card';
import Title from '../../Atom/Title/Title';
import BodyText from '../../Atom/BodyText/BodyText';
import MainButton from '../../Atom/MainButton/MainButton';

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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem} >
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(
        Dimensions.get('window').width
    );
    const [ availableDeviceHeigth, setAvailableDeviceHeigth ] = useState(
        Dimensions.get('window').height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeigth(Dimensions.get('window').height)
        };

        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    })

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
        setPastGuesses(currPassGuesses => [nextNumber.toString(), ...currPassGuesses]);
    };

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig
    }

    if (availableDeviceHeigth < 500 ) {
        return (
            <View style={styles.screen}>
                <Title>Opponent's Guess</Title>
                    <View style={styles.controls}>
                    <MainButton 
                        onPress={nextGuessHandler.bind(this, 'lower')} 
                    >
                        <BodyText style={styles.bodyText}>-</BodyText>
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton 
                        onPress={nextGuessHandler.bind(this, 'greater')} 
                    >
                        <BodyText style={styles.bodyText}>+</BodyText>
                    </MainButton>
                    </View>
                <View style={listContainerStyle}>
                    {/*<ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>*/}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton 
                    onPress={nextGuessHandler.bind(this, 'lower')} 
                >
                    <BodyText style={styles.bodyText}>-</BodyText>
                </MainButton>
                <MainButton 
                    onPress={nextGuessHandler.bind(this, 'greater')} 
                >
                    <BodyText style={styles.bodyText}>+</BodyText>
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/*<ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>*/}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 900,
        maxWidth: '90%'
    },
    bodyText: {
        fontSize: 20,
        fontFamily: 'bold',
        color: 'white'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').width > 350 ? '60%':'80%',
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});

export default GameScreen;