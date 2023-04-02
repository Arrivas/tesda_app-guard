import { View, Text, ScrollView, TouchableNativeFeedback } from "react-native";
import React from "react";
import { CheckIcon } from "react-native-heroicons/solid";
import getDimension from "../../config/getDimension";

const SuccessComponent = ({ route, navigation }) => {
  const { res } = route.params;
  const { width, height } = getDimension();
  return (
    <View className="flex-1 bg-[#f3f5f9]">
      <View className="bg-white mx-5 mt-16 rounded-lg">
        <View className="bg-[#0035a9] self-center p-5 rounded-full relative -top-10">
          <CheckIcon size={40} fill="white" />
        </View>
        <View className="self-center relative -top-6">
          <Text className="font-bold text-2xl">Scanned Successfully</Text>
          <Text className="text-gray-600 self-center">{res._id}</Text>
        </View>
        {/* items */}
        <ScrollView style={{ height: height - 280 }}>
          <View className="px-5 py-5">
            <Text className="px-2 text-lg my-2 font-light">
              Borrower Information
            </Text>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Borrower Name</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.fullName}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Purpose</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.purpose}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Role</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.role}
                </Text>
              </View>
            </View>
            {/* equipment */}
            <Text className="px-2 text-lg my-2 font-light">
              Equipment Information
            </Text>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Qty</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.qty}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Equipment</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.equipment}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Condition</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.condition}
                </Text>
              </View>
            </View>
            <View className="px-5 mt-2">
              <View className="flex-row">
                <Text className="font-bold flex-1">Location</Text>
                <Text className="text-gray-600 flex-1 text-right">
                  {res.location}
                </Text>
              </View>
            </View>
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
