import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import Card from '../../Organisme/Card';
import Input from '../../Atom/Input/Input';
import NumberContainer from '../../Organisme/NumberContainer';
import MainButton from '../../Atom/MainButton/MainButton';
import Colors from '../../Template/Constants/colors';
import DefaultStyle from '../../Template/Constants/DefaultStyle';

const StartGameScreen = (props) => {

    const [ enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [ buttoWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
    

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    
    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 - 99.',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            )
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    
    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={DefaultStyle.bodytext}>You Selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPress={()=> props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>

                        <Card style={styles.inputContainer}>
                            <Text style={styles.subTitle}>Select a Number</Text>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitaliza='none'  
                                autoCorrect={false} 
                                keyboardType="number-pad" 
                                maxLength={2} 
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttoWidth}}>
                                    <Button title="Reset" 
                                        onPress={resetInputHandler} 
                                        color={Colors.accent} 
                                    />
                                </View>
                                <View style={{width: buttoWidth}}>
                                    <Button title="Confirm"    
                                        onPress={confirmInputHandler} 
                                        color={Colors.primary} 
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'Roboto-Bold',
    },
    subTitle: {
        fontFamily: 'Roboto-Ligh',
    },
    inputContainer: {
        width: '80%',
        //maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        //width: 100,
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
});

export default StartGameScreen;