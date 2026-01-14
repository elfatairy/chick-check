import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, Text, TextStyle, View } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  type
}: {
  name: string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  type?: 'MaterialIcons' | 'Entypo' | 'FontAwesome' | 'AntDesign' | 'MaterialCommunityIcons'
}) {
  return (
    <>
      {type == 'MaterialIcons' && <MaterialIcons color={color} size={size} name={name as keyof typeof MaterialIcons.glyphMap} style={style} />}
      {type == 'FontAwesome' && <FontAwesome color={color} size={size} name={name as keyof typeof FontAwesome.glyphMap} style={style} />}
      {type == 'Entypo' && <Entypo color={color} size={size} name={name as keyof typeof Entypo.glyphMap} style={style} />}
      {type == 'AntDesign' && <AntDesign color={color} size={size} name={name as keyof typeof AntDesign.glyphMap} style={style} />}
      {type == 'MaterialCommunityIcons' && <MaterialCommunityIcons color={color} size={size} name={name as keyof typeof MaterialCommunityIcons.glyphMap} style={style} />}
    </>
  )
}
