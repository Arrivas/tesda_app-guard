import {
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { QrCodeIcon } from "react-native-heroicons/solid";
import store from "../../config/store";
import DialogComponent from "./dialog/DialogComponent";

const HomeComponent = ({ navigation }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentIP, setCurrentIP] = useState("");

  const getIP = async () => {
    const ip = await store.getId();
    await fetch(ip)
      .then((res) => {
        setCurrentIP(ip);
        setDialogVisible(false);
      })
      .catch((err) => {
        setDialogVisible(true);
        ToastAndroid.show(
          "Connection Failed: Provide another ip address and port",
          ToastAndroid.SHORT
        );
      });
    if (!ip) return setDialogVisible(true);
  };

  useEffect(() => {
    let ready = true;
    if (ready) {
      getIP();
    }
    return () => {
      ready = false;
    };
  }, []);

  const handleSaveIP = async () => {
    if (!inputValue) return;
    await fetch(`http://${inputValue}/`)
      .then((res) => {
        setCurrentIP(`http://${inputValue}/`);
        store.storeIp(`http://${inputValue}/`);
        setDialogVisible(false);
      })
      .catch((err) => {
        ToastAndroid.show(
          "Connection Failed: Provide another ip address and port",
          ToastAndroid.SHORT
        );
      });
  };
  return (
    <>
      <View className="flex-1 bg-white">
        <View className="flex-1">
          <View className="m-2 flex-row flex ">
            <TouchableNativeFeedback
              onPress={() => navigation.navigate("QRScanner", { currentIP })}
            >
              <View className="bg-[#F2F2F2] p-5 self-start rounded-lg flex-1 m-1">
                <View className="rounded-full bg-[#0035a9] h-[60px] w-[60px] items-center justify-center">
                  <QrCodeIcon size={34} color="white" />
                </View>
                <View className="mt-5">
                  <Text className="font-semibold text-lg">Scan QR Code</Text>
                  <Text className="font-semibold text-xs">scan qr code</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View className="bg-white  p-5 self-start rounded-lg flex-1 m-1">
                <View className="rounded-full bg-black h-[60px] w-[60px] items-center justify-center">
                  <QrCodeIcon size={34} color="white" />
                </View>
                <View className="mt-5">
                  <Text className="font-semibold text-lg">Asadasda</Text>
                  <Text className="font-semibold text-xs">asdasd</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View className="flex-1">
          <Text>asd asd asdasd</Text>
        </View>
      </View>
      {/* dialog */}
      <DialogComponent
        setDialogVisible={setDialogVisible}
        dialogVisible={dialogVisible}
        handleInputChange={setInputValue}
        inputValue={inputValue}
        handleSave={handleSaveIP}
      />
    </>
  );
};

export default HomeComponent;
