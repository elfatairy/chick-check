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

const DualYAxisChart = () => {
    const [tempData, setTempData] = useState<lineDataItem[] | undefined>();
    const [amoniaData, setAmoniaData] = useState<lineDataItem[] | undefined>();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [showGraph, setShowGraph] = useState(false);

    const getLastMonthData = async () => {
        const now = new Date();
        console.log("Fetching");
        const snapshot = await get(ref(db, `months/${now.getMonth()}`));

        console.log('snapshot retrieved');

        if (snapshot.exists()) {
            console.log("exists");
            const data = snapshot.val();

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
                    aArr[i].label = `${i * 2 + 1} ${monthNames[now.getMonth() - 1]} `;
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
                amoniaData ?
                    <Text>
                        {amoniaData[0].value}
                    </Text> :
                    <Text>
                        Loading...
                    </Text>
            }
            <TouchableOpacity onPress={() => { setShowGraph(true); setTimeout(() => {setShowGraph(false)}, 5000) }}>
                <Text>Show Graph</Text>
            </TouchableOpacity>
            {
                showGraph && amoniaData ?
                    <LineChart
                        height={180}
                        data={[{value: 0}, {value: 1}, {value: 6}, {value: 3}]}
                        
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
