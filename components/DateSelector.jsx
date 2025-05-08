import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateSelector = ({ date, setDate }) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7); // Limit to 7 days from today

  const onChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
        minimumDate={today}
        maximumDate={nextWeek}
      />
    </View>
  );
};
export default DateSelector;
