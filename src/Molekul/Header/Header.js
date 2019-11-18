import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import Colors from '../../Template/Constants/colors';
import Title from '../../Atom/Title/Title';

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Title style={styles.headerTitle}>{props.title}</Title>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        //paddingTop: 0,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        //fontSize: 18,
    }
});

export default Header;