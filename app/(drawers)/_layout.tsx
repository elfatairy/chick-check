import React, { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import { Pressable, Share, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from 'react-native-reanimated';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import * as Sharing from 'expo-sharing';
import axios from 'axios';

export default function TabLayout() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>("");
  const [bg, setBg] = useState('transparent');

  const share = async () => {
    const res = await axios.get("http://services.ghazala5stars.com/raneemshareurl.txt");
    await Share.share({
      message: res.data
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      console.log(e.data);
      if (e.data.state.index == 0) {
        const drawerState = e.data.state.routes[e.data.state.index].state;
        if (drawerState && drawerState.index != undefined) {
          const tabState = drawerState.routes[e.data.state.index].state;
          if (tabState && tabState.index != undefined) {
            const routeName = tabState.routes[tabState.index].name;
            console.log(`Current route is: ${routeName}`);

            if (['database', 'analytics'].includes(routeName)) {
              setTitle(routeName[0].toUpperCase() + routeName.slice(1));
            } else {
              setTitle('');
            }
          }
        }
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Drawer/*  drawerContent={(props) => {
      return <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}></DrawerItemList>
          <Pressable
            style={{ paddingVertical: 15, paddingHorizontal: 17, borderRadius: 40, backgroundColor: bg, opacity: 0.7 }}
            onTouchStart={() => { setBg('#fff4') }}
            onTouchEnd={() => { setBg('transparent') }}
            onPress={share}>
            <Text style={{
              color: 'rgb(135, 79, 31)', fontFamily: 'sans-serif-medium',
              fontWeight: 'normal',
            }}>Share</Text>
          </Pressable>
        </DrawerContentScrollView>
      </>
    }} */>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Readings',
          title: title,
          headerShadowVisible: false
        }}
      />
      <Drawer.Screen
        name="aboutproject"
        options={{
          drawerLabel: 'About the project',
          title: 'About the project',
        }}
      />
      <Drawer.Screen
        name="feedback"
        options={{
          drawerLabel: 'Feedback',
          title: 'Feedback',
        }}
      />
      <Drawer.Screen
        name="contactus"
        options={{
          drawerLabel: 'Contact Us',
          title: 'Contact Us',
        }}
      />
    </Drawer>
  );
}
