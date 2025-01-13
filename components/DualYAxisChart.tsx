import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    LineChart,
    BarChart,
    lineDataItem,
} from 'react-native-gifted-charts';
import { ref, onValue, query, orderByChild, startAt, endBefore, get, onChildAdded } from "@firebase/database";
import { db } from '@/firebaseConfig';
import { router } from 'expo-router';
import { normalize } from '@/constants/normalizer';

const DualYAxisChart = () => {
    const [tempData, setTempData] = useState<lineDataItem[] | undefined>();
    const [amoniaData, setAmoniaData] = useState<lineDataItem[] | undefined>();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [showGraph, setShowGraph] = useState(false);

    const getLastMonthData = async () => {
        const now = new Date();
        console.log("Fetching");
        const snapshot = await get(ref(db, `months/${(now.getMonth() + 11) % 12 + 1}`));

        console.log('snapshot retrieved');

        if (snapshot.exists()) {
            console.log("exists");
            const data = snapshot.val();
            console.log(data);

            const tArr = new Array(15);
            const aArr = new Array(15);

            for (let i = 0; i < 15; i++) {
                if (tArr[i] == undefined) {
                    tArr[i] = {
                        value: (data.temperature[i] + data.temperature[i + 1]) / 2
                    }
                    aArr[i] = {
                        value: (data.amonia[i] + data.amonia[i + 1]) / 2
                    }
                } else {
                    tArr[i].value = (data.temperature[i] + data.temperature[i + 1]) / 2;
                    aArr[i].value = (data.amonia[i] + data.amonia[i + 1]) / 2;
                }
                if (i % 4 == 3) {
                    aArr[i].label = `${i * 2 + 1} ${monthNames[(now.getMonth() + 11) % 12]} `;
                    aArr[i].showXAxisIndex = true
                }
            }

            setTempData(tArr);
            setAmoniaData(aArr);

            // console.log(tArr);
            // console.log(aArr);
        } else {
            console.log('No items found.');
        }
    }

    useEffect(() => {
        try {
            const dataRef = ref(db, 'months');
            getLastMonthData();

            onChildAdded(dataRef, () => {
                getLastMonthData();
            })
        } catch (e) {
            console.log('error');
            console.log(e);
            throw new Error(JSON.stringify(e));
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Last Month Readings</Text>
            <View style={styles.graphLabels}>
                <Text style={{ color: "#3332c9" }}>Ammonia (ppm)</Text>
                <Text style={{ color: "#FC9601" }}>Temperature (celesius)</Text>
            </View>
            {
                !amoniaData &&
                <Text>
                    Loading...
                </Text>
            }
            {
                amoniaData ?
                    <LineChart
                        height={160}
                        data={amoniaData}

                        thickness={2}
                        hideRules
                        curvature={1}
                        // rotateLabel
                        initialSpacing={0}
                        adjustToWidth
                        spacing={normalize(22.5)}
                        color="#3332c8"
                        yAxisColor="#3332c9"
                        yAxisThickness={2}
                        xAxisLabelTextStyle={{ width: 80, marginLeft: -20, fontSize: normalize(15) }}
                        xAxisIndicesHeight={5}
                        xAxisIndicesWidth={1}
                        disableScroll
                        noOfSections={4}
                        secondaryData={tempData}
                        secondaryYAxis={{
                            yAxisColor: "#FC9601",
                            yAxisLabelSuffix: '°'

                        }}
                        hideDataPoints
                        secondaryLineConfig={{
                            color: "#FC9601"
                        }}
                        showXAxisIndices={false}

                        showFractionalValues={false}
                    /> : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        fontSize: 18,
    },
    graphLabels: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: "100%"
    }
});

export default DualYAxisChart;
