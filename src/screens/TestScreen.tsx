import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import DocumentPicker, {pick} from 'react-native-document-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const TestScreen = () => {
  const [documentName, setDocumentName] = useState<any>('text.xls');
  const [base64Data, setBase64Data] = useState<string>('base 64 data here');
  const [selected, setSelected] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const pickDocument = async () => {
    try {
      const [Dcoument] = await pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setSelected(true);
      console.log(Dcoument);

      console.log(imageUrl);
      setImageUrl(Dcoument.uri.toString());
      setDocumentName(Dcoument.name);
    } catch (error) {
      console.log('error occured in pickDocument', error);
    }
  };
  const requestPermission = () => {
    request('android.permission.READ_EXTERNAL_STORAGE');
  };

  const handleDocumentSelect = async () => {
    console.log('first');
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            requestPermission();
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            pickDocument();
            break;
          case RESULTS.BLOCKED:
            request('android.permission.READ_EXTERNAL_STORAGE');
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="mt-4">
        <TouchableOpacity
          onPress={handleDocumentSelect}
          className="bg-green-400 px-4 py-3 rounded-md">
          <Text className="text-black text-xl font-spacegrotesk-medium font">
            Select your document
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 px-4">
        <TouchableOpacity className="">
          <Text className="text-purple-500 text-lg font-spacegrotesk-medium font">
            {documentName}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 px-4">
        <TouchableOpacity className="">
          <Text className="text-blue-500 text-xs font-spacegrotesk-medium font">
            {base64Data}
          </Text>
        </TouchableOpacity>
        {selected && (
          <TouchableOpacity className="">
            <Image source={{uri: imageUrl}} />

            <Text className="text-blue-500 text-xs font-spacegrotesk-medium font">
              {imageUrl}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TestScreen;
