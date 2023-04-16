import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { create } from "apisauce";

const QRScanner = ({ route, navigation }) => {
  const { currentIP } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [fetchedBorrow, setFetchedBorrow] = useState({});

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const api = create({
    baseURL: `${currentIP}`,
  });

  const fetchImage = async (itemId) => {
    if (!itemId) return;
    const result = await api.get(`/images/url/${itemId}`);
    return result.data;
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!data) return;
    const [response1, response2] = await Promise.all([
      api.get(`/borrow/get/one/${data}`),
      api.get(`/inventory/get/one/${data}`),
    ]);
    const imageId = response1?.data?.image?._id
      ? response1?.data?.image?._id
      : response2?.data?.image?._id;
    const image = await fetchImage(imageId);
    if (response1.ok || response2.ok) {
      const res = response1.data !== null ? response1?.data : response2?.data;
      if (!res.image) return navigation.navigate("Success", { res });
      res.image.imageUrl = image;
      // Do something with the data
      res !== null && navigation.navigate("Success", { res });
    } else {
      // Handle errors
    }
  };

  // ToastAndroid.show(
  //   "FATAL ERROR: unable to get data",
  //   ToastAndroid.SHORT
  // )
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="flex-1 flex-col">
      <View
        style={{
          flex: 4,
        }}
      >
        <BarCodeScanner
          className="flex-1"
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      {scanned && (
        <View className=" items-center justify-center w-full flex-1 ">
          <TouchableNativeFeedback onPress={() => setScanned(false)}>
            <View className="w-[80%] bg-[#0035a9] items-center py-3 rounded-xl">
              <Text className="font-semibold text-white">
                Tap to Scan Again
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </View>
  );
};

export default QRScanner;
