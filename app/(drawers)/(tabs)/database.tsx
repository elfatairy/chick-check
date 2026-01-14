import { StyleSheet, Text, TouchableOpacity, FlatList, View } from 'react-native';
// import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ref, query, orderByChild, startAt, endBefore, get } from "firebase/database";
import { db } from '@/firebaseConfig';
import { DataTable } from 'react-native-paper';
import { normalize } from '@/constants/normalizer';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [date, setDate] = useState<Date>(new Date(2024, 10, 1));
  const [data, setData] = useState<any>([]);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    if (currentDate)
      setDate(currentDate);
  };

  useEffect(() => {
    getDayData();
  }, [date]);

  const getDayData = async () => {
    try {
      const dataRef = ref(db, 'data');

      const endTimeStamp = new Date(date.getTime() + 86400000);
      const itemsQuery = query(dataRef, orderByChild('timestamp'), startAt(date.getTime()), endBefore(endTimeStamp.getTime()));
      console.log("getting the data");
      console.log(date.getTime());
      console.log(endTimeStamp.getTime());

      const snapshot = await get(itemsQuery);

      console.log("retrieved");

      if (snapshot.exists()) {
        setData([...Object.values(snapshot.val())]);
        console.log("data is setted");
      } else {
        setData([]);
        console.log('No items found.');
      }
    } catch (e) {
      console.log("GET MONTH ERROR");
      console.log(e);
    }
  }

  const showPicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  }

  const renderHour = (hour: number) => {
    if (hour == 0) return '12';
    else if (hour < 10) return `0${hour}`;
    else return hour
  }

  const renderMins = (mins: number) => {
    if (mins < 10) return `0${mins}`;
    else return mins
  }

  const renderSeconds = (seconds: number) => {
    if (seconds < 10) return `0${seconds}`;
    else return seconds
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const date = new Date(item.timestamp);

    return (
      <DataTable.Row style={styles.databeBox} key={index}>
        <DataTable.Cell
          style={{ backgroundColor: index % 2 ? '#FBEBE8' : '#F7D5CD' }}
          textStyle={styles.databeRowElementText}
        >
          {renderHour(date.getHours() % 12)}:
          {renderMins(date.getMinutes())}:
          {renderSeconds(date.getSeconds())} {date.getHours() >= 12 ? 'PM' : 'AM'}
        </DataTable.Cell>
        <DataTable.Cell
          style={{ backgroundColor: index % 2 ? '#FBEBE8' : '#F7D5CD' }}
          textStyle={styles.databeRowElementText}
        >
          {item.temperature}°
        </DataTable.Cell>
        <DataTable.Cell
          style={{ backgroundColor: index % 2 ? '#FBEBE8' : '#F7D5CD' }}
          textStyle={styles.databeRowElementText}
        >
          {item.humidity}%
        </DataTable.Cell>
        <DataTable.Cell
          style={{ backgroundColor: index % 2 ? '#FBEBE8' : '#F7D5CD' }}
          textStyle={styles.databeRowElementText}
        >
          {item.amonia} ppm
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthTextLabel}>Selected Day: </Text>
          <TouchableOpacity onPress={showPicker}>
            <View style={styles.dateInput}>
              <Text style={styles.monthText}>{date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()}</Text>
              <IconSymbol name="calendar" type="FontAwesome" color={"#555"} style={{ marginLeft: 15 }} size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {
        data.length ?
          <DataTable style={{ paddingBottom: 130 }}>
            <DataTable.Header style={styles.databeHeader} >
              <DataTable.Title style={styles.databeHeaderElement} textStyle={styles.databeHeaderElementText}>Time</DataTable.Title>
              <DataTable.Title style={styles.databeHeaderElement} textStyle={styles.databeHeaderElementText}>Temperatuer</DataTable.Title>
              <DataTable.Title style={styles.databeHeaderElement} textStyle={styles.databeHeaderElementText}>Humidity</DataTable.Title>
              <DataTable.Title style={styles.databeHeaderElement} textStyle={styles.databeHeaderElementText}>Amonia</DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()} // Use a unique key for each row
            />

          </DataTable> :
          <Text style={{ fontWeight: '500', textAlign: 'center', margin: 10 }}>
            No Readings in this day
          </Text>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 10
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  monthTextContainer: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: "#fefae0",
    borderColor: "#c1a07e",
  },
  monthText: {
    fontSize: normalize(17),
  },
  monthTextLabel: {
    fontSize: normalize(17),
    fontWeight: '500'
  },
  dateInput: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  databeHeader: {
    gap: 1,
  },
  databeHeaderElement: {
    backgroundColor: "#E97132",
    justifyContent: 'center'
  },
  databeHeaderElementText: {
    textAlign: 'center',
    color: "#fff"
  },
  databeRowElement: {
  },
  databeRowElementText: {
    textAlign: 'center',
    width: "100%"
  },
  databeBox: {
    gap: 1
  }
});
