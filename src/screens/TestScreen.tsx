import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import DocumentPicker, {pick} from 'react-native-document-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import ReactNativeBlobUtil from 'react-native-blob-util';

const TestScreen = () => {
  const [documentName, setDocumentName] = useState<any>('text.xls');
  const [base64Data, setBase64Data] = useState('');
  const [selected, setSelected] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const pickDocument = async () => {
    try {
      const [Document] = await pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      ReactNativeBlobUtil.fs
        .readFile(`${Document.uri.toString()}`, 'base64')
        .then(data => {
          setBase64Data(data);
          setImageUrl(data.toString());
        });
      setSelected(true);
      console.log(Document);

      console.log(imageUrl);
      // setImageUrl(Document.uri.toString());
      setDocumentName(Document.name);
    } catch (error) {
      console.log('error occured while Document pick', error);
    }
  };

  const requestPermission = () => {
    request('android.permission.READ_EXTERNAL_STORAGE');
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Avyasha wants you permission',
          message: 'Avyasha wants you Media permission to upload your answers',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDocumentSelect = async () => {
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
    <ScrollView>
      <View className="">
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
            <Text
              className="text-blue-500 text-xs font-spacegrotesk-medium font"
              numberOfLines={2}>
              {base64Data}
            </Text>
          </TouchableOpacity>
          {selected && (
            <>
              <TouchableOpacity className=" items-center justify-center ">
                <Image
                  source={require('../../assets/images/images.jpeg')}
                  className="h-33 w-32"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity className=" bg-green-400 h-32 w-32  p-2 rounded-md items-center justify-center ">
                <Image
                  source={{uri: `data:image/png;base64,${imageUrl}`}}
                  className="h-full w-full"
                  resizeMode="contain"
                />
              </TouchableOpacity> */}
            </>
          )}
          {/* <Text className="text-blue-500 text-xs font-spacegrotesk-medium font">
            {imageUrl}
          </Text> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default TestScreen;
