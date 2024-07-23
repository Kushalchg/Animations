import {Text, TextInput, TextInputProps, View} from 'react-native';
import React, {Component} from 'react';

const UserInputComponent = ({
  placeholder,
  onChangeText,
  value,
}: TextInputProps) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        className="w-full text-black bg-white rounded-xl font-spacegrotesk-medium px-3 "
        placeholderTextColor="gray"
        value={value}
      />
    </View>
  );
};

export default UserInputComponent;
