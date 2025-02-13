import Realm, { ObjectSchema } from 'realm';

export class UserInfo extends Realm.Object<UserInfo> {
  _id!: Realm.BSON.ObjectID;
  name!: string;
  age!: number;

  static schema: ObjectSchema = {
    name: 'UserInfo',
    properties: {
      _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
      name: { type: 'string', indexed: 'full-text' },
      age: { type: 'int' },
    },
    primaryKey: '_id',
  };
}
