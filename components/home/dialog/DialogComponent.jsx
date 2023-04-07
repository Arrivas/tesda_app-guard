import { Text } from "react-native";
import React from "react";
import Dialog from "react-native-dialog";

const DialogComponent = ({
  dialogVisible,
  handleInputChange,
  inputValue,
  handleSave,
  setDialogVisible,
}) => {
  return (
    <Dialog.Container visible={dialogVisible}>
      <Dialog.Title>
        Enter the IP Address and Port <Text>example: 192.168.1.1:5000</Text>
      </Dialog.Title>

      <Dialog.Input
        placeholder="Type here..."
        onChangeText={handleInputChange}
        value={inputValue}
      />
      <Dialog.Button label="Save" onPress={handleSave} />
    </Dialog.Container>
  );
};

export default DialogComponent;
