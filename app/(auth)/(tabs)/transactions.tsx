import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Transactions() {
  return (
    <ImageBackground source={require("../../../assets/images/cover.png")} style={{ flex: 1 }}>
    <View style={styles.page}>
      <Text style={styles.transacText}>Transactions</Text>

      <Text style={styles.totalBalance}>₱500.00</Text>

      <View style={styles.incomeExpensesAmount}> 
          <View style={styles.incomeAmount}>
            <View style={styles.row}>
              <FontAwesome name="caret-up" size={30} color="green" style={styles.icon} />
              <Text style={styles.incomeAmountText}>₱300.00</Text>
            </View>
          </View>

          <View style={styles.expensesAmount}>
            <View style={styles.row}>
              <FontAwesome name="caret-down" size={30} color="red" style={styles.icon} />
              <Text style={styles.expensesAmountText}>₱300.00</Text>
            </View>
          </View>
        </View>

 
          <View style={styles.searchbar}>
              <TextInput
                placeholder="Search here"
                placeholderTextColor="white"
                style={styles.homesearchtext}
              />
              <FontAwesome name="search" style={styles.searchIcon} />
          </View>

          <View style={styles.whiteBox}>
              <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.category}>
                      <View style={styles.allCat}>
                        <TouchableOpacity>
                            <Text>All</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.allCat}>
                        <TouchableOpacity>
                            <Text>Income</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.allCat}>
                        <TouchableOpacity>
                            <Text>Expenses</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
              </ScrollView>
          </View>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  page: {
      flex: 1,
  },
  transacText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:"left",
    padding: 20
  },
  totalBalance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  incomeExpensesAmount: {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 30,
   
  },
  incomeAmount: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
  },
  incomeAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green"
  },
  expensesAmount: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  expensesAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: 5
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    paddingLeft: 15,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 20
  },
  searchIcon: {
    fontSize: 15,
    color: 'white',
    marginRight: 10,
  },
  homesearchtext: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  whiteBox: {
    backgroundColor: "#fff",
    borderRadius: 30,
    height: "80%",
    width: "100%",
  },
  category: {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  allCat:{
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});