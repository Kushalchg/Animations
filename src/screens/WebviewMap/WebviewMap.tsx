// WebviewMapScreen.jsx
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { createMapScript, mapHTML } from './components/mainHtml';

const WebviewMapScreen = () => {
  const customPath = [
    [27.685008, 85.30328], // Starting point
    [27.68, 85.31], // Intermediate point
    [27.67, 85.305], // End point
  ];

  const mapScript = createMapScript(
    27.685008, // Default latitude (fallback)
    85.30328, // Default longitude (fallback)
    10, // Initial zoom level
    customPath, // Path coordinates
    2, // Minimum zoom level
  );
  const html = mapHTML(mapScript);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <WebView
        source={{ html: html }}
        style={{ flex: 1 }}
        onMessage={event => console.log(event.nativeEvent.data)}
        geolocationEnabled={true} // Enable geolocation in WebView
      />
    </View>
  );
};

export default WebviewMapScreen;
