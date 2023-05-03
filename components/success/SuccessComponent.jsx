import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { CheckIcon } from "react-native-heroicons/solid";
import getDimension from "../../config/getDimension";
import ImageModal from "./ImageModal";

const SuccessComponent = ({ route, navigation }) => {
  const { fetchedData } = route.params;
  const { width, height } = getDimension();
  const [modalVisible, setModalVisible] = useState(false);

  const formatAsCurrency = (value) => {
    if (value === 0) return "0";
    const formatter = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    });

    return formatter.format(value);
  };

  return (
    <View className="flex-1 bg-[#f3f5f9]">
      <View className="bg-white mx-5 mt-16 rounded-lg">
        <View className="bg-[#0035a9] self-center p-5 rounded-full relative -top-10">
          <CheckIcon size={40} fill="white" />
        </View>
        <View className="self-center relative -top-6">
          <Text className="font-bold text-2xl">Scanned Successfully</Text>
          <Text className="text-gray-600 self-center">{fetchedData._id}</Text>
        </View>
        {/* items */}
        <ScrollView style={{ height: height - 280 }}>
          <View className="px-5 py-5">
            {fetchedData?.image?.imageUrl ? (
              <ImageModal
                source={fetchedData?.image?.imageUrl}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            ) : (
              <Text className="self-center my-5 text-gray-300">
                Image Unavailable
              </Text>
            )}

            {/* equipment */}
            <Text className="px-2 text-lg my-2 font-light">
              Equipment Information
            </Text>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Property Number</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {fetchedData.propertyNo}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Equipment</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {fetchedData.equipment}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Qty</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {fetchedData.qty}
                </Text>
              </View>
            </View>
            {fetchedData?.condition && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Condition</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.condition}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.unit && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Unit</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.unit}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.amount === 0 ? (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Amount</Text>
                  <Text className="text-gray-600 flex-1 text-right">0</Text>
                </View>
              </View>
            ) : (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Amount</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {formatAsCurrency(item.amount)}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.classification && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Classification</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.classification}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.receiveBy && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Receive By</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.receiveBy}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.location && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Location</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.location}
                  </Text>
                </View>
              </View>
            )}
            {fetchedData?.specificLocation && (
              <View className="px-5 mt-2">
                <View className="flex-row">
                  <Text className="font-bold flex-1">Specific Location</Text>
                  <Text className="text-gray-600 flex-1 text-right">
                    {fetchedData.specificLocation}
                  </Text>
                </View>
              </View>
            )}
            {/* borrower */}
            {fetchedData?.fullName && (
              <>
                <Text className="px-2 text-lg my-2 font-light">
                  Borrower Information
                </Text>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Borrower Name</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {fetchedData.fullName}
                    </Text>
                  </View>
                </View>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Role</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {fetchedData.role}
                    </Text>
                  </View>
                </View>
                <View className="px-5 mt-2">
                  <View className="flex-row">
                    <Text className="font-bold flex-1">Purpose</Text>
                    <Text className="text-gray-600 flex-1 text-right">
                      {fetchedData.purpose}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
        <View
          className=" bg-[#0035a9] items-center py-3 rounded-xl self-center my-5"
          style={{
            width: width - 40,
          }}
        >
          <Text className="font-semibold text-white text-lg">Done</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SuccessComponent;
