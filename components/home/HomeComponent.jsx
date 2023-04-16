import {
  View,
  Text,
  TouchableNativeFeedback,
  ToastAndroid,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  QrCodeIcon,
  ArrowLeftOnRectangleIcon,
} from "react-native-heroicons/solid";
import store from "../../config/store";
import DialogComponent from "./dialog/DialogComponent";

const HomeComponent = ({ navigation }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentIP, setCurrentIP] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getIP();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getIP = async () => {
    const ip = await store.getId();
    if (!ip) {
      setDialogVisible(true);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const timeout = setTimeout(() => {
      controller.abort();
      setDialogVisible(true);
      ToastAndroid.show(
        "Connection Failed: Provide another IP address and port",
        ToastAndroid.SHORT
      );
    }, 3000);
    await fetch(ip, { signal })
      .then((response) => {
        clearTimeout(timeout);
        if (response.status === 200) {
          setCurrentIP(ip);
          setDialogVisible(false);
        } else {
          setDialogVisible(true);
          ToastAndroid.show(
            "Connection Failed: Provide another IP address and port",
            ToastAndroid.SHORT
          );
        }
      })
      .catch((error) => {
        clearTimeout(timeout);
        setDialogVisible(true);
        ToastAndroid.show(
          "Connection Failed: Provide another IP address and port",
          ToastAndroid.SHORT
        );
      });
  };

  const handleSaveIP = async () => {
    if (!inputValue) return;
    try {
      const res = await fetch(`http://${inputValue}/`);
      if (res.status === 200) {
        setCurrentIP(`http://${inputValue}/`);
        store.storeIp(`http://${inputValue}/`);
        setDialogVisible(false);
      } else {
        ToastAndroid.show(
          "Connection Failed: Provide another ip address and port",
          ToastAndroid.SHORT
        );
      }
    } catch (err) {
      ToastAndroid.show(
        "Connection Failed: Provide another ip address and port",
        ToastAndroid.SHORT
      );
    }
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
            <TouchableNativeFeedback onPress={() => BackHandler.exitApp()}>
              <View className="bg-white  p-5 self-start rounded-lg flex-1 m-1">
                <View className="rounded-full bg-black h-[60px] w-[60px] items-center justify-center">
                  <ArrowLeftOnRectangleIcon size={34} color="white" />
                </View>
                <View className="mt-5">
                  <Text className="font-semibold text-lg">Exit</Text>
                  <Text className="font-semibold text-xs">exit app</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View className="flex-1">
          {/* <Image
            source={require("../../img/tesda_logo.png")}
            className="h-[150px] w-[150px]"
          />
          <Image
            source={require("../../img/logo_bin.png")}
            className="h-[150px] w-[150px]"
          /> */}
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
