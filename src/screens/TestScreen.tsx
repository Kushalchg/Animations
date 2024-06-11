import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {SetStateAction, useState} from 'react';
import DocumentPicker, {pick} from 'react-native-document-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import ReactNativeBlobUtil from 'react-native-blob-util';

const base64Image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=';

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
