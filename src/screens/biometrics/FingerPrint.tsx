import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { BiometryType } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const FingerPrintScreen = () => {
  const [sensor, setSensor] = useState<BiometryType>();
  const [authResult, setAuthResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if biometric sensor is available and get its type
  const checkBiometricAvailability = async () => {
    try {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();
      if (available) {
        setSensor(biometryType);
        return true;
      }
      setAuthResult('Biometric authentication not available');
      return false;
    } catch (error) {
      setAuthResult('Error checking biometric availability');
      console.error(error);
      return false;
    }
  };

  // Perform fingerprint authentication
  const authenticateWithFingerprint = async () => {
    try {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Just put your finger',
        cancelButtonText: 'Cancel',
        fallbackPromptMessage: 'such a looser',
      });
      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  // Send authentication result to server
  const sendToServer = async (isAuthenticate: boolean) => {
    if (!isAuthenticate) {
      return null;
    }
    try {
      const response = await fetch('https://catfact.ninja/fact', {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setAuthResult(`Server response: ${data.message || 'Success'}`);
    } catch (error) {
      setAuthResult('Server communication failed');
      console.error('Server error:', error);
    }
  };

  const handlePress = async () => {
    setIsLoading(true);
    setAuthResult('');

    // Step 1: Check if biometric is available
    const isAvailable = await checkBiometricAvailability();
    if (!isAvailable) {
      setIsLoading(false);
      return;
    }

    // Step 2: Perform fingerprint authentication
    const authSuccess = await authenticateWithFingerprint();

    if (authSuccess) {
      // Step 3: Send result to server if authentication successful
      await sendToServer(true);
    } else {
      setAuthResult('Fingerprint authentication failed');
      await sendToServer(false);
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center',
      }}>
      <Pressable
        style={{ padding: 10 }}
        onPress={handlePress}
        disabled={isLoading}>
        <Text style={{ color: 'white' }}>
          {isLoading ? 'Processing...' : 'Authenticate with Fingerprint'}
        </Text>
        {sensor && <Text style={{ color: 'white' }}>Sensor: {sensor}</Text>}
        {authResult && <Text style={{ color: 'white' }}>{authResult}</Text>}
      </Pressable>
    </View>
  );
};

export default FingerPrintScreen;
