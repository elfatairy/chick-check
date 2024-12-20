import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '@/firebaseConfig';
import { ref, query, orderByChild, startAt, endBefore, get, onValue } from "@firebase/database";
import MonthYearPicker, { CustomInputRef } from '@/components/MonthYearPicker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation } from 'expo-router';
import { normalize } from '@/constants/normalizer';
import React from 'react';

export default function TabTwoScreen() {
  const [tempData, setTempData] = useState<lineDataItem[] | undefined>([{ "label": "1", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "4", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "7", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "10", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "13", "value": 0 }, { "value": 0 }, { "value": 25.29 }, { "label": "16", "value": 24.97 }, { "value": 0 }, { "value": 0 }, { "label": "19", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "22", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "25", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "28", "value": 0 }, { "value": 0 }, { "value": 0 }]);
  const [amoniaData, setAmoniaData] = useState<lineDataItem[] | undefined>([{ "label": "1", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "4", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "7", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "10", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "13", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 1013.97 }, { "label": "16", "showXAxisIndex": true, "value": 494.7 }, { "value": 0 }, { "value": 0 }, { "label": "19", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "22", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "25", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "28", "showXAxisIndex": true, "value": 0 }, { "value": 0 }, { "value": 0 }]);
  const [humiData, setHumiData] = useState<lineDataItem[] | undefined>([{ "label": "1", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "4", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "7", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "10", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "13", "value": 0 }, { "value": 0 }, { "value": 69.67 }, { "label": "16", "value": 70.01 }, { "value": 0 }, { "value": 0 }, { "label": "19", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "22", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "25", "value": 0 }, { "value": 0 }, { "value": 0 }, { "label": "28", "value": 0 }, { "value": 0 }, { "value": 0 }]);
  const navigation = useNavigation();

  const PickerRef = useRef<CustomInputRef>(null);

  const getMonthData = async (year: number, month: number) => {
    try {
      console.log("getting month data");
      const snapshot = await get(ref(db, `months/${month}`));

      if (snapshot.exists()) {
        console.log("exists");
        const data = snapshot.val();

        const tArr = new Array(30);
        const aArr = new Array(30);
        const hArr = new Array(30);

        for (let i = 0; i < 30; i++) {
          tArr[i] = {
            value: data.temperature[i]
          }
          aArr[i] = {
            value: data.amonia[i]
          }
          hArr[i] = {
            value: data.humidity[i]
          }
          if (i % 4 == 3) {
            aArr[i].label = i + 1;
            hArr[i].label = i + 1;
            tArr[i].label = i + 1;
            aArr[i].showXAxisIndex = true
            hArr[i].showXAxisIndex = true
            tArr[i].showXAxisIndex = true
          }
        }

        setTempData(tArr);
        setAmoniaData(aArr);
        setHumiData(hArr);

        // console.log(tArr);
        // console.log(aArr);
      } else {
        console.log('No items found.');
      }


    } catch (e) {
      console.log("GET MONTH ERROR");
      console.log(e);
    }
  }

  useEffect(() => {
    const now = new Date();
    getMonthData(now.getFullYear(), now.getMonth());

    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.monthTextContainer}>
          <Text style={styles.monthTextLabel}>Selected Month: </Text>
          <TouchableOpacity onPress={() => { PickerRef.current?.setVisible(true) }}>
            <View style={styles.dateInput}>
              <Text style={styles.monthText}>{PickerRef.current?.selectedYear}</Text>
              <Text style={styles.monthText}> / </Text>
              <Text style={styles.monthText}>{PickerRef.current?.selectedMonth}</Text>
              <IconSymbol name="calendar" type="FontAwesome" color={"#555"} style={{ marginLeft: 15 }} size={20} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Temperature</Text>
          {
            tempData ?
              <LineChart
                height={110}
                data={tempData}
                thickness={2}
                hideRules
                curvature={1}
                // rotateLabel
                initialSpacing={0}
                adjustToWidth
                spacing={10}
                color="#FC9601"
                yAxisColor="#FC9601"
                yAxisThickness={2}
                xAxisLabelTextStyle={{ width: 80, marginLeft: -20, fontSize: normalize(12) }}
                xAxisIndicesHeight={5}
                xAxisIndicesWidth={1}
                disableScroll
                noOfSections={4}
                hideDataPoints
                secondaryLineConfig={{
                  color: "#FC9601"
                }}
                yAxisLabelSuffix='°'
                showXAxisIndices={false}

                showFractionalValues={false}
                dataPointLabelWidth={100}
              /> :
              <Text>
                Loading...
              </Text>
          }
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Humidity</Text>
          {
            humiData ?
              <LineChart
                height={110}
                data={humiData}
                thickness={2}
                hideRules
                curvature={1}
                // rotateLabel
                initialSpacing={0}
                adjustToWidth
                spacing={10}
                color="#37b1f5"
                yAxisColor="#37b1f5"
                yAxisThickness={2}
                xAxisLabelTextStyle={{ width: 80, marginLeft: -20, fontSize: normalize(12) }}
                xAxisIndicesHeight={5}
                xAxisIndicesWidth={1}
                disableScroll
                noOfSections={4}
                hideDataPoints
                showXAxisIndices={false}
                yAxisLabelSuffix='%'

                showFractionalValues={false}
                dataPointLabelWidth={100}
              />
              :
              <Text>
                Loading...
              </Text>
          }
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Ammonia (ppm)</Text>
          {
            amoniaData ?
              <LineChart
                height={110}
                data={amoniaData}
                thickness={2}
                hideRules
                curvature={1}
                // rotateLabel
                initialSpacing={0}
                adjustToWidth
                spacing={10}
                color="#3332c9"
                yAxisColor="#3332c9"
                yAxisThickness={2}
                xAxisLabelTextStyle={{ width: 80, marginLeft: -20, fontSize: normalize(12) }}
                xAxisIndicesHeight={5}
                xAxisIndicesWidth={1}
                disableScroll
                noOfSections={4}
                hideDataPoints
                secondaryLineConfig={{
                  color: "#FC9601"
                }}
                showXAxisIndices={false}

                showFractionalValues={false}
                dataPointLabelWidth={100}
              /> :
              <Text>
                Loading...
              </Text>
          }
        </View>

        <MonthYearPicker ref={PickerRef} getMonthData={getMonthData} />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingVertical: 10
  },
  chartContainer: {
    borderWidth: 1.5,
    borderColor: "#c1a07e",
    backgroundColor: "#fefae0",
    padding: 10,
    // width: "48%",
    borderRadius: 10,
    marginHorizontal: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: normalize(18),
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
  }
});