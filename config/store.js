import * as SecureStore from "expo-secure-store";

const key = "ipAddress";

const getId = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("error getiing the auth token", error);
  }
};

const storeIp = async (ip) => {
  try {
    await SecureStore.setItemAsync(key, ip);
  } catch (error) {
    console.log("error storing the auth token", error);
  }
};

export default {
  storeIp,
  getId,
};
