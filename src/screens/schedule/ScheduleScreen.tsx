import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ColorEventMap: {[key: string]: string} = {
  Meeting: '#53e055b7',
  Lunch: '#4565b1d1',
};

const DayView = () => {
  const HOUR_HEIGHT = 60; // Height for each hour in pixels
  const events = [
    {name: 'Meeting', startTime: '12:00', endTime: '15:00'},
    {name: 'Meeting', startTime: '1:00', endTime: '6:00'},
    {name: 'Sports', startTime: '4:00', endTime: '6:00'},
    {name: 'Lunch', startTime: '13:00', endTime: '16:00'},
    {name: 'Lunch', startTime: '18:00', endTime: '21:00'},
    // Add more events as needed
  ];

  const renderHourLines = () => {
    return Array.from({length: 24}).map((_, index) => (
      <View key={index} className="h-[60px] border-t border-gray-300  ">
        <Text className="absolute -top-[10px] -left-[40px] text-black font-spacegrotesk-regular ">{`${index}:00`}</Text>
      </View>
    ));
  };

  const renderEvents = () => {
    return events.map((event, index) => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      const endHour = parseInt(event.endTime.split(':')[0]);
      const duration = endHour - startHour;

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.event,
            {
              backgroundColor: ColorEventMap[event.name] || '#df3a3d97',
              top: startHour * HOUR_HEIGHT,
              height: duration * HOUR_HEIGHT,
            },
          ]}>
          <Text className=" font-spacegrotesk-medium text-black text-sm">
            {event.name}
          </Text>
          <Text className=" font-spacegrotesk-regular text-black text-xs">{`${event.startTime} - ${event.endTime}`}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView className="flex-1 mx-1">
      <View className="relative pl-[50px] mt-10 ">
        {renderHourLines()}
        {renderEvents()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  event: {
    position: 'absolute',
    left: 50,
    right: 0,
    backgroundColor: 'rgba(37, 136, 24, 0.3)',
    borderRadius: 5,
    padding: 5,
  },
});

export default DayView;
