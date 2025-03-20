import { Alert, Linking, View } from 'react-native';
import {
  OmhMapView,
  OmhMapsModule,
  OmhMapsAppleMapsIOSProvider,
  OmhMarker,
} from '@openmobilehub/maps-core';
import { OmhMapsOpenStreetMapProvider } from '@openmobilehub/maps-plugin-openstreetmap';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

// You can use different providers for iOS and Android.
// For Android, you can use different providers for devices with and without Google Play Services.
// Remember to initialize the module before using any of its components.
OmhMapsModule.initialize({
  gmsProvider: OmhMapsOpenStreetMapProvider,
  nonGmsProvider: OmhMapsOpenStreetMapProvider,
  iosProvider: OmhMapsAppleMapsIOSProvider,
});

const MapScreen = () => {
  const checkPermissionAvailable = async (): Promise<boolean> => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch {
      console.log('Permission is not grandted');
      return false;
    }
  };
  const onLocationCLicked = async () => {
    if (!(await checkPermissionAvailable())) {
      Alert.alert(
        'Please give Permission First',
        "DOn't have any permission",
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed'),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => Linking.openSettings() },
        ],
        { cancelable: true },
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <OmhMapView
        rotateEnabled={false}
        myLocationEnabled={true}
        onMyLocationClicked={onLocationCLicked}>
        <OmhMarker
          position={{ latitude: 27.685008, longitude: 85.30328 }}
          title="custom Marker"
          isFlat={true}
          clickable={true}
          onPress={e => console.log('marker is clicked', e.timeStamp)}
          draggable={true}
        />
      </OmhMapView>
    </View>
  );
};

export default MapScreen;
