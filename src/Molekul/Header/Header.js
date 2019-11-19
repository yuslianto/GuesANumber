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
        <View style={{
            ...styles.headerBase, 
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}
        >
            <Title style={styles.headerTitle}>{props.title}</Title>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 70,
        //paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,

    },
    headerTitle: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
        //fontSize: 18,
    }
});

export default Header;