import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { CalendarPicker } from 'react-native-nepali-picker';

const InputComponent = ({ children }: any) => {
  const [value, setValue] = useState<string>('0');
  return (
    <>
      <TextInput
        keyboardType="phone-pad"
        value={value}
        placeholder="Temp value in Celcius"
        onChangeText={text => setValue(text)}
      />
      {children(value)}
    </>
  );
};

const Kelvin = ({ value }: { value: string }) => {
  return (
    <View className="bg-orange-500 px-4 py-3">
      <Text className="text-black font-spacegrotesk-medium text-lg">
        Kelvin: {(parseFloat(value) + 273.15).toFixed(2)}
      </Text>
    </View>
  );
};

const Fahrenheit = ({ value }: { value: string }) => {
  return (
    <View className="bg-orange-500 px-4 py-3">
      <Text className="text-black font-spacegrotesk-medium text-lg">
        Fahrenheit: {((parseFloat(value) * 9) / 5 + 32).toFixed(2)}
      </Text>
    </View>
  );
};

const HocTestScreen = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>();

  const onPicked = (date: string) => {
    setDate(date);
  };
  return (
    <View>
      <Text className="text-black font-spacegrotesk-medium text-xl">
        HocTestScreen
      </Text>
      <InputComponent>
        {(value: string) => (
          <>
            <Fahrenheit value={value} />
            <Kelvin value={value} />
          </>
        )}
      </InputComponent>
    </View>
  );
};

export default HocTestScreen;
