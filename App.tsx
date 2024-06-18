import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://4d0a2afcfae1affe8cdcda3c0132123a@o4507451429355520.ingest.us.sentry.io/4507452288008192',
  tracesSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const handleError = () => {
    throw new Error('This is a test error for Sentry.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> ₹ {count}</Text>
      <Text style={styles.emoje}>😍</Text>
      <Button title="Trigger Error" onPress={handleError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  text: {
    color: '#000',
    fontSize: 24,
  },
  emoje:{
    fontSize:38,
    padding:10,
  }
});

export default Sentry.wrap(App);
