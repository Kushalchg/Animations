import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import UserInputComponent from '../../components/UserInputComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery, useRealm} from '@realm/react';
import {UserInfo} from '../../../storage/models';
import {Realm} from '@realm/react';

const LocalFirst = () => {
  const [name, setName] = useState<String>(' ');
  const [age, setAge] = useState<number>();
  const realm = useRealm();
  const userInfo = useQuery(UserInfo);

  // store data locally on submmiting the data
  const onSubmit = () => {
    console.log(name, age);
    realm.write(() => {
      realm.create('UserInfo', {
        __id: new Realm.BSON.ObjectId(),
        name: name,
        age: age,
      });
    });
  };
  const DeleteItem = (item: UserInfo) => {
    realm.write(() => {
      realm.delete(item);
    });
  };

  // get the data from local storgate
  const userData = useQuery(UserInfo);
  //   console.log(userData);

  return (
    <ScrollView>
      <View className="px-4 space-y-10">
        <View>
          <Text className="text-lg font-spacegrotesk-regular text-black">
            Input data to store locally
          </Text>
          <View className="mt-4 space-y-3">
            <View>
              <UserInputComponent
                placeholder="Your Name "
                onChangeText={text => setName(text)}
              />
            </View>
            <View>
              <UserInputComponent
                placeholder="Your age"
                onChangeText={text => setAge(parseInt(text, 10))}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            className=" mt-4 bg-green-600 items-center py-2 px-1 rounded-md">
            <Text className="text-base font-spacegrotesk-regular text-white">
              Submit Data
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-lg font-spacegrotesk-regular text-black">
            Local data here
          </Text>
          <View>
            {userData.map((item, index) => {
              return (
                <View
                  key={index}
                  className="justify-center bg-gray-300 px-2 mt-1  py-1 rounded-md">
                  <View className="flex-row justify-between  ">
                    <Text className="text-lg mt-2 font-spacegrotesk-regular my-auto text-black">
                      {item.name}
                    </Text>
                    <Text className="text-lg mt-2 font-spacegrotesk-regular my-auto text-black">
                      {item.age}
                    </Text>
                    <TouchableOpacity
                      className="p-1 bg-red-500 items-center rounded-md"
                      onPress={() => DeleteItem(item)}>
                      <Text className="text-base mt-2 font-spacegrotesk-medium my-auto text-black">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LocalFirst;
