import * as Realm from "realm-web";

export const db = new Realm.App({
  id: import.meta.env.VITE_APP_ID || "",
});
export const user: Realm.User = db.currentUser
  ? db.currentUser
  : await db.logIn(Realm.Credentials.anonymous());
const mongo = user.mongoClient("mongodb-atlas");

export const collection = mongo.db("dbpdf").collection("pessoa_fisica");
