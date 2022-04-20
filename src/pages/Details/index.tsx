import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';

export default () => {
  const [text, onChangeText] = useState("Useless Text");
  
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="useless placeholder"
        value={text}
      />
      <Text> Muito massa</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});