import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { db } from "../../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import DualYAxisChart from '@/components/DualYAxisChart';
import { normalize } from '@/constants/normalizer';

export default function HomeScreen() {
  const [lightVal, setLightVal] = useState<number | undefined>();
  const [tempVal, setTempVal] = useState<number | undefined>();
  const [humidVal, setHumidVal] = useState<number | undefined>();
  const [ammoniaVal, setAmmoniaVal] = useState<number | undefined>();

  const mapTemperatureToColor = (temp: number) => {
    if (temp < 18 || temp > 25) return "#ff0100"
    else return "#27ae60"
  }

  useEffect(() => {
    try {
      const tempRef = ref(db, 'temperature');
      onValue(tempRef, (snapshot) => {
        const data = snapshot.val();
        setTempVal(data);
      });

      const humidRef = ref(db, 'humid');
      onValue(humidRef, (snapshot) => {
        const data = snapshot.val();
        setHumidVal(data);
      });

      const amoniaRef = ref(db, 'ammonia');
      onValue(amoniaRef, (snapshot) => {
        const data = snapshot.val();
        setAmmoniaVal(data);
      });

      const lightRef = ref(db, 'light');
      onValue(lightRef, (snapshot) => {
        const data = snapshot.val();
        setLightVal(data);
      });
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  }, []);

  const BotChart = useCallback(() => <DualYAxisChart />, []);


  if (!tempVal || !humidVal || !lightVal || !ammoniaVal) {
    return <View>
      <Text>Loading...</Text>
    </View>
  }

  return (
    <>
      <View style={styles.tempContainer}>
        <View style={{ ...styles.circleOuter, backgroundColor: mapTemperatureToColor(tempVal) }}>
          <View style={styles.circleInner}>
            <IconSymbol style={styles.icon} name="thermometer-three-quarters" type="FontAwesome" color={mapTemperatureToColor(tempVal)} size={60} />
            <View style={styles.circleContent}>
              <Text style={styles.textLabel}>Temperature</Text>
              <Text style={styles.textValue}>{tempVal}°</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.blocks}>
        <View style={styles.block}>
          <IconSymbol name="molecule" type="MaterialCommunityIcons" color="#3332c9" size={30} />
          <View>
            <Text style={styles.blockTextLabel}>Ammonia</Text>
            <Text style={styles.blockTextValue}>{ammoniaVal}ppm</Text>
          </View>
        </View>

        <View style={{ ...styles.block, gap: 5, paddingRight: 20 }}>
          <IconSymbol name="water-percent" type="MaterialCommunityIcons" color="#37b1f5" size={40} />
          <View>
            <Text style={styles.blockTextLabel}>Humidity</Text>
            <Text style={styles.blockTextValue}>{humidVal}%</Text>
          </View>
        </View>

        <View style={{ ...styles.block, width: '100%' }}>
          <IconSymbol name="light-down" type="Entypo" color="#FC9601" size={50} />
          <View>
            <Text style={styles.blockTextLabel}>Light Intenisty</Text>
            <Text style={styles.blockTextValue}>{lightVal ?? ' - '} lumens</Text>
          </View>
        </View>
      </View>

      <BotChart />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  tempContainer: {
    backgroundColor: Colors.brown.card,
    height: '33%',
    borderStartEndRadius: 30,
    borderEndEndRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25
  },
  circleOuter: {
    borderRadius: 9999,
    backgroundColor: "#f00",
    aspectRatio: 1,
    padding: 18
  },
  circleInner: {
    borderRadius: 9999,
    backgroundColor: Colors.brown.card,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10
  },
  icon: {
  },
  circleContent: {
  },
  textLabel: {
    fontSize: normalize(20),
  },
  textValue: {
    textAlign: "center",
    fontSize: normalize(30),
    fontWeight: '600'
  },
  blocks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  block: {
    borderWidth: 1.5,
    borderColor: "#c1a07e",
    backgroundColor: "#fefae0",
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  blockTextLabel: {
    fontSize: normalize(16),
    textAlign: 'center'
  },
  blockTextValue: {
    textAlign: "center",
    fontSize: normalize(25),
    fontWeight: '600'
  },
});
