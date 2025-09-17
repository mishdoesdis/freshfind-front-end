import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';

export default function App(){
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/api/stores')
      .then(r=>r.json())
      .then(data=>{
        setStores(data);
        setLoading(false);
      })
      .catch(e=>{
        Alert.alert('Error','Could not load backend');
        setLoading(false);
      })
  },[]);

  if (loading) return <SafeAreaView><ActivityIndicator/></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>FreshFind Deals</Text>
      {stores.map(s=>(
        <View key={s.id} style={styles.card}>
          <Text style={styles.store}>{s.name}</Text>
          {s.deals.map(d=>(
            <Text key={d.id}>• {d.title} → ₱{d.price} ({d.discountPct}% off)</Text>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, margin:20},
  title: {fontSize:22, fontWeight:'700', marginBottom:12},
  card: {marginBottom:16, padding:12, backgroundColor:'#f6f6f6', borderRadius:8},
  store: {fontWeight:'600', marginBottom:6}
});