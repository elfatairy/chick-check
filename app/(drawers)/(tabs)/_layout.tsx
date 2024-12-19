import { Tabs, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationProp } from '@react-navigation/native';
import RootLayout from '@/app/_layout';

type TabParamList = {
  index: undefined;
  analytics: undefined;
  database: undefined;
};

type DrawerParamList = {
  '(tabs)': undefined;
  'aboutus': undefined;
  'aboutproject': undefined;
  'feedback': undefined;
  'contactus': undefined;
  'share': undefined;
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['brown'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          paddingTop: 5
        },
      }}>
      <Tabs.Screen
        name="database"
        options={{
          title: 'Database',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="exclefile1" type='AntDesign' color={color} />,
          tabBarShowLabel: false,
          
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="line-graph" type='Entypo' color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="home" type='Entypo' color={color} />,
          tabBarShowLabel: false
        }}
      />
    </Tabs>
  );
}
