import React from 'react';
import { View, TextInput } from 'react-native';

export const TextAreaInput = (props) => {
    const ={multiline,onChangeText,numberOfLines,placeholder,placeholderStyle} = props
    return (
        <TextInput  
        multiline={multiline}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderStyle={placeholderStyle}// Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
        />
    );
}