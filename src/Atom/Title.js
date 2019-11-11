import React from "react";
import { 
    Text,
    StyleSheet
} from "react-native";

const Title = (props) => {
    return (
        <Text {...props} style={{...styles.title, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'bold',
        fontSize: 25,
    }
});

export default Title;