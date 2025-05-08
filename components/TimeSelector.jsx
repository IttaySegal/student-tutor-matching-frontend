import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimeSelector = ({ time, setTime }) => {
  const onChange = (event, selectedTime) => {
    setTime(selectedTime || time)
  };

  return (
    <View>
      <DateTimePicker
        value={time}
        mode="time"
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default TimeSelector;
