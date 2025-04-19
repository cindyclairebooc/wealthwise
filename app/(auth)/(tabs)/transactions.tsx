import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ImageBackground, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TransactionItemProps {
  time: string;
  title: string;
  category: string;
  amount: string;
  iconColor: string;
  iconName: 'caret-up' | 'caret-down';
}

const TransactionItem: React.FC<TransactionItemProps> = ({time, title, category, amount, iconColor, iconName}) => (
  <View style={styles.transactionContainer}>
    <View style={styles.transactionContent}>
      <View style={styles.transactionTextContainer}>
        <Text style={styles.transactionTime}>{time}</Text>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionCategory}>{category}</Text>
      </View>

      <View style={styles.transactionDetails}>
        <FontAwesome name={iconName} size={30} color={iconColor} style={styles.icon} />
        <Text style={[styles.expensesAmountText, { color: iconColor }]}>{amount}</Text>
      </View>
    </View>
  </View>
);

export default function Transactions() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Income', 'Expenses'];

  // EXAMPLE DUMMY DATA
  const transactions = [
    {
      time: '10:02 PM',
      title: 'Grocery Shopping',
      category: 'Food',
      amount: '₱1300.00',
      iconColor: 'red',
      iconName: 'caret-down',
      date: 'April 01, 2025', 
    },
    {
      time: '08:15 AM',
      title: 'Taxi Fare',
      category: 'Transportation',
      amount: '₱120.00',
      iconColor: 'red',
      iconName: 'caret-down',
      date: 'April 01, 2025', 
    },
    {
      time: '7:52 AM',
      title: 'Salary',
      category: 'Income',
      amount: '₱2000.00',
      iconColor: 'green',
      iconName: 'caret-up',
      date: 'April 01, 2025',  
    },
    {
      time: '07:30 AM',
      title: 'Breakfast',
      category: 'Meal',
      amount: '₱63.00',
      iconColor: 'red',
      iconName: 'caret-down',
      date: 'March 31, 2025', 
    },  
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newType, setNewType] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');


  return (
    <ImageBackground source={require("../../../assets/images/cover.png")} style={{ flex: 1 }}>
      <View style={styles.page}>
        <View style={styles.header}>
            <Text style={styles.transacText}>Transactions</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
      </View>
        <Text style={styles.totalBalance}>₱3517.00</Text>

        <View style={styles.incomeExpensesAmount}>
          <View style={styles.incomeAmount}>
            <View style={styles.row}>
              <FontAwesome name="caret-up" size={30} color="green" style={styles.icon} />
              <Text style={styles.incomeAmountText}>₱5000.00</Text>
            </View>
          </View>

          <View style={styles.expensesAmount}>
            <View style={styles.row}>
              <FontAwesome name="caret-down" size={30} color="red" style={styles.icon} />
              <Text style={styles.expensesAmountText}>₱1483.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.whiteBox}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.category}>
              {categories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.allCat,
                    selectedCategory === cat && { backgroundColor: '#4680F3' },
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.catText,
                      { color: selectedCategory === cat ? '#fff' : '#000' },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {transactions.map((transaction, index) => (
              <View key={index}>
                {index === 0 || transactions[index].date !== transactions[index - 1].date ? (
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                ) : null}

                <TransactionItem
                  time={transaction.time}
                  title={transaction.title}
                  category={transaction.category}
                  amount={transaction.amount}
                  iconColor={transaction.iconColor}
                  iconName={transaction.iconName as "caret-up" | "caret-down"}
                />
              </View>
            ))}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>New Record</Text>
                          <TextInput
                            style={styles.input}
                            placeholder="Amount"
                            value={newAmount}
                            onChangeText={setNewAmount}
                          />

                          <View style={styles.dropdowninput}>
                              <Picker
                                selectedValue={newCategory}
                                onValueChange={(itemValue) => setNewCategory(itemValue)}
                                dropdownIconColor="#333"
                              >
                                <Picker.Item label="Category" value="" style={{ fontSize: 14 }} />
                                <Picker.Item label="Food" value="food" style={{ fontSize: 14 }} />
                                <Picker.Item label="Rent" value="rent" style={{ fontSize: 14 }} />
                                <Picker.Item label="Utilities" value="utilities" style={{ fontSize: 14 }} />
                                <Picker.Item label="Others" value="others" style={{ fontSize: 14 }} />
                              </Picker>
                          </View>

                          <View style={styles.transacaccount}>
                              <View style={styles.pickerWrapper}>
                                <Picker
                                  selectedValue={newType}
                                  onValueChange={(itemValue) => setNewType(itemValue)}
                                  dropdownIconColor="#333"
                                  style={styles.picker}
                                >
                                  <Picker.Item label="Type" value="" style={{ fontSize: 14 }} />
                                  <Picker.Item label="Expense" value="expense" style={{ fontSize: 14 }} />
                                  <Picker.Item label="Income" value="income" style={{ fontSize: 14 }} />
                                </Picker>
                              </View>

                              <View style={styles.pickerWrapper}>
                                <Picker
                                  selectedValue={newAccount}
                                  onValueChange={(itemValue) => setNewAccount(itemValue)}
                                  dropdownIconColor="#333"
                                  style={styles.picker}
                                >
                                  <Picker.Item label="Account" value="" style={{ fontSize: 14 }} />
                                  <Picker.Item label="Cash" value="cash" style={{ fontSize: 14 }} />
                                  <Picker.Item label="Credit" value="credit" style={{ fontSize: 14 }} />
                                </Picker>
                              </View>
                            </View>

                          {showDatePicker && (
                              <DateTimePicker
                                value={new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                  setShowDatePicker(false);
                                  if (selectedDate) {
                                    setNewDueDate(selectedDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
                                  }
                                }}
                              />
                            )}

                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                              <Text>{newDueDate || 'Date'}</Text>
                            </TouchableOpacity>

                          <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            placeholder="Description"
                            value={newDescription}
                            onChangeText={setNewDescription}
                            multiline={true}
                            numberOfLines={4}
                          />
                      
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={[styles.button, { backgroundColor: '#2196F3' }]}
                          onPress={() => {
                            setModalVisible(false);
                          }}
                        >
                          <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, { backgroundColor: '#B0BEC5' }]}
                          onPress={() => setModalVisible(false)}
                        >
                          <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',  
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },
  transacText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2551A3',
    borderRadius: 20,
    padding: 10,
  },
  totalBalance: {
    fontSize: 30,
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
  whiteBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "60%",
    width: "100%",
    flex: 1,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  allCat: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  catText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  transactionContainer: {
    backgroundColor: '#f0f0f0',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  transactionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  transactionContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  transactionTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#888',
  },
  transactionDetails: {
    flexDirection: 'row',  
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transacaccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 12
  },
  picker: {
    width: '105%',
  },
  transacaccountinput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    width: '45%'
  },
  dropdowninput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
});
