import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const DayView = ({events}) => {
  const HOUR_HEIGHT = 60; // Height for each hour in pixels
  const MAX_EVENT_WIDTH = 200; // Maximum width of an event

  const sortAndPositionEvents = events => {
    // Sort events by start time
    const sortedEvents = [...events].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });

    const positionedEvents = [];
    const columns = [];

    sortedEvents.forEach(event => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      const endHour = parseInt(event.endTime.split(':')[0]);

      // Find a column where the event fits
      let columnIndex = columns.findIndex(column => column <= startHour);

      if (columnIndex === -1) {
        columnIndex = columns.length;
        columns.push(endHour);
      } else {
        columns[columnIndex] = endHour;
      }

      positionedEvents.push({
        ...event,
        column: columnIndex,
        columnCount: columns.length,
      });
    });

    return positionedEvents;
  };

  const renderHourLines = () => {
    return Array.from({length: 24}).map((_, index) => (
      <View key={index} style={styles.hourLine}>
        <Text style={styles.hourText}>{`${index}:00`}</Text>
      </View>
    ));
  };

  const renderEvents = () => {
    const positionedEvents = sortAndPositionEvents(events);

    return positionedEvents.map((event, index) => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      const endHour = parseInt(event.endTime.split(':')[0]);
      const duration = endHour - startHour;

      const eventWidth = MAX_EVENT_WIDTH / event.columnCount;
      const leftPosition = 50 + event.column * eventWidth;

      return (
        <View
          key={index}
          style={[
            styles.event,
            {
              top: startHour * HOUR_HEIGHT,
              height: duration * HOUR_HEIGHT,
              width: eventWidth,
              left: leftPosition,
            },
          ]}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event.name}
          </Text>
          <Text
            style={
              styles.eventTime
            }>{`${event.startTime} - ${event.endTime}`}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dayContainer}>
        {renderHourLines()}
        {renderEvents()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayContainer: {
    position: 'relative',
    paddingLeft: 50,
  },
  hourLine: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  hourText: {
    position: 'absolute',
    left: -45,
    top: -10,
    fontSize: 12,
  },
  event: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 120, 255, 0.3)',
    borderRadius: 5,
    padding: 5,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  eventTime: {
    fontSize: 10,
  },
});

export default DayView;
