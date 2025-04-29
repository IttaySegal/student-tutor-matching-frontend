// import React from "react";
// import { View, Text } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const TimeSelector = ({ time, setTime }) => {
//   // הגבלת השעה
//   const startOfDay = new Date();
//   startOfDay.setHours(8, 0, 0); // 8:00 בבוקר

//   const endOfDay = new Date();
//   endOfDay.setHours(18, 0, 0); // 6:00 בערב

//   const onChange = (event, selectedTime) => {
//     if (selectedTime >= startOfDay && selectedTime <= endOfDay) {
//       setTime(selectedTime || time); // עדכון הסטייט עם הזמן הנבחר
//     } else {
//       alert("הזמן חייב להיות בין 8:00 ל-18:00");
//     }
//   };

//   return (
//     <View>
//       <Text style={{ marginBottom: 10 }}>בחר שעה:</Text>
//       <DateTimePicker
//         value={time}
//         mode="time" // מצב time כדי לבחור שעה
//         display="default"
//         onChange={onChange}
//         minimumDate={startOfDay} // הגבלה לשעה 8:00 בבוקר
//         maximumDate={endOfDay} // הגבלה לשעה 6:00 בערב
//         minuteInterval={15} // בוחרים כל רבע שעה
//       />
//     </View>
//   );
// };

// export default TimeSelector;

import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimeSelector = ({ time, setTime }) => {
  const onChange = (event, selectedTime) => {
    setTime(selectedTime || time); // עדכון הסטייט עם הזמן הנבחר
  };

  return (
    <View>
      <DateTimePicker
        value={time}
        mode="time" // מצב time כדי לבחור שעה
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default TimeSelector;
