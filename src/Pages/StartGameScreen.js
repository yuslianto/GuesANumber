import React, {useState} from "react";
import { 
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet
} from "react-native";

import Card from '../Organisme/Card';
import Colors from '../Template/Constants/colors';
import Input from '../Atom/Input';

// finish video part 10
const StartGameScreen = (props) => {

    const [ enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    return (
        <TouchableWithoutFeedback
            onPress={()=>{
                Keyboard.dismiss();
            }}
        >
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>

                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
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
                        <View style={styles.button}>
                            <Button title="Reset" onPress={()=> {}} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={()=> {}} color={Colors.primary} />
                        </View>
                    </View>
                </Card>

            </View>
        </TouchableWithoutFeedback>
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
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center',
    }
});

export default StartGameScreen;