import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // For the eye icon
import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import { Menu, Provider } from 'react-native-paper'; // Import the Menu and Provider components

function Dashboard() {
  const user = {
    goodDay: "Good Day,",
    name: "Katelyn!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80",
    balance: 9300,
    gcashName: "GCash",
  };

  const recentBalances = [
    {
      id: '1',
      category: 'Meal',
      subCategory: 'Breakfast',
      amount: 63,
      type: 'expense',
      icon: <FontAwesome name="cutlery" size={20} color="#fff" />,
      iconBgColor: '#81C784',
      date: 'Oct 2024'
    },
    {
      id: '2',
      category: 'Transportation',
      amount: 100,
      type: 'expense',
      icon: <FontAwesome name="car" size={20} color="#fff" />,
      iconBgColor: '#FFB300',
      date: 'Oct 2024'
    }
  ];

  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isAddBalanceVisible, setIsAddBalanceVisible] = useState(false);
  const [isEditBalanceVisible, setIsEditBalanceVisible] = useState(false); // Edit modal state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('gcash');
  const [editAmount, setEditAmount] = useState(''); // Store the amount for editing
  const [cashBalanceMenuVisible, setCashBalanceMenuVisible] = useState(false);
  const [isCashBalanceVisible, setIsCashBalanceVisible] = useState(true); // State to hide the whole card

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const toggleAddBalanceModal = () => {
    setIsAddBalanceVisible(!isAddBalanceVisible);
    setSelectedPaymentMethod('gcash');
    setEditAmount('');
  };

  const toggleEditBalanceModal = () => {
    setIsEditBalanceVisible(!isEditBalanceVisible);
  };

  const openCashBalanceMenu = () => {
    setCashBalanceMenuVisible(true);
  };

  const closeCashBalanceMenu = () => {
    setCashBalanceMenuVisible(false);
  };

  const handleHideBalance = () => {
    setIsBalanceVisible(false); // Hide the balance
    setIsCashBalanceVisible(false); // Hide the whole card
    closeCashBalanceMenu();
  };

  const handleEditBalance = () => {
    setEditAmount(user.balance.toString()); // Pre-fill the amount
    setSelectedPaymentMethod('gcash'); // Pre-fill with the payment method (can be dynamic)
    toggleEditBalanceModal();
    closeCashBalanceMenu();
  };

  const handleDeleteBalance = () => {
    closeCashBalanceMenu();
    // Implement your delete logic here
  };

  const handleSaveBalance = () => {
    console.log('Updated Payment Method:', selectedPaymentMethod);
    console.log('Updated Amount:', editAmount);
    toggleEditBalanceModal();
  };

  return (
    <Provider>
      <ImageBackground source={require("../../../assets/images/cover.png")} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Conditionally render the Cash Balance Card */}
          {isCashBalanceVisible && (
            <View style={styles.cashBalanceCard}>
              <View style={styles.cashBalanceCardTop}>
                <View>
                  <Text style={styles.cashBalanceLabel}>Cash Balance</Text>
                  <Text style={styles.gcashName}>{user.gcashName}</Text>
                </View>
                <Menu
                  visible={cashBalanceMenuVisible}
                  onDismiss={closeCashBalanceMenu}
                  anchor={
                    <TouchableOpacity style={styles.cashBalanceDotsButton} onPress={openCashBalanceMenu}>
                      <Icon name="more-horizontal" size={24} color="#2551A3" />
                    </TouchableOpacity>
                  }
                  style={styles.cashBalanceMenu}
                >
                  <Menu.Item
                    onPress={handleHideBalance}
                    title="Hide"
                    leadingIcon={() => <Icon name="eye-off" size={20} color="#757575" />}
                    // style={styles.menuItem}
                    // titleStyle={styles.menuItemTitle}
                  />
                  <Menu.Item
                    onPress={handleEditBalance}
                    title="Edit"
                    leadingIcon={() => <Icon name="edit" size={20} color="#757575" />}
                    // style={styles.menuItem}
                    // titleStyle={styles.menuItemTitle}
                  />
                  <Menu.Item
                    onPress={handleDeleteBalance}
                    title="Delete"
                    leadingIcon={() => <Icon name="trash-2" size={20} color="#757575" />}
                    // style={styles.menuItem}
                    // titleStyle={styles.menuItemTitle}
                  />
                </Menu>
              </View>
              <View style={styles.cashBalanceBottom}>
                <Text style={styles.cashBalanceAvailable}>Available:</Text>
                <View style={styles.cashBalanceAmountRow}>
                  <Text style={styles.cashBalanceAmount}>
                    {isBalanceVisible ? `₱${user.balance.toLocaleString()}` : '₱********'}
                  </Text>
                  <TouchableOpacity onPress={toggleBalanceVisibility}>
                    <FontAwesome
                      name={isBalanceVisible ? 'eye' : 'eye-slash'}
                      size={20}
                      color="#2551A3"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Add Balance Shortcut */}
          <TouchableOpacity style={styles.addBalanceCard} onPress={toggleAddBalanceModal}>
            <Text style={styles.addBalanceText}>Add Balance</Text>
          </TouchableOpacity>

          {/* Recent Balances */}
          <View style={styles.recentRecordsContainer}>
            <View style={styles.recentRecordsBackground}>
              <Text style={styles.recentHeader}>Recent Records</Text>
              <Text style={styles.recentSubHeader}>October Transactions</Text>
              {recentBalances.map(balance => (
                <View key={balance.id} style={styles.balanceCard}>
                  <View style={styles.balanceInfo}>
                    <View style={[styles.iconCircle, { backgroundColor: balance.iconBgColor }]}>
                      {balance.icon}
                    </View>
                    <View>
                      <Text style={styles.category}>{balance.category}</Text>
                      {balance.subCategory && <Text style={styles.subCategory}>{balance.subCategory}</Text>}
                    </View>
                  </View>
                  <View style={styles.amountInfo}>
                    <Text style={[styles.amount, { color: balance.type === 'expense' ? '#E53935' : '#43A047' }]}>
                      {balance.type === 'expense' ? '▼' : '▲'}
                      {isBalanceVisible ? `₱${balance.amount}` : '₱**'}
                    </Text>
                    <Text style={styles.date}>{balance.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Edit Balance Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isEditBalanceVisible}
            onRequestClose={toggleEditBalanceModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Balance</Text>

                {/* Payment Method Dropdown */}
                <View style={styles.modalInputContainer}>
                  <Text style={styles.modalLabel}>Cash Balance:</Text>
                  <View>
                    <Picker
                      selectedValue={selectedPaymentMethod}
                      onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                      // style={styles.picker}
                    >
                      <Picker.Item label="GCash" value="gcash" />
                      <Picker.Item label="Credit Card" value="credit_card" />
                      <Picker.Item label="Debit Card" value="debit_card" />
                      <Picker.Item label="Others" value="others" />
                    </Picker>
                  </View>
                </View>

                {/* Amount Input */}
                <View style={styles.modalInputContainer}>
                  <Text style={styles.modalLabel}>Amount:</Text>
                  <TextInput
                    style={styles.modalTextInput}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={editAmount}
                    onChangeText={setEditAmount}
                  />
                </View>

                {/* Save and Cancel Buttons */}
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveBalance}>
                    <Text style={styles.modalSaveButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalCancelButton} onPress={toggleEditBalanceModal}>
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  cashBalanceCard: {
    backgroundColor: '#E0F7FA',
    borderRadius: 15,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2551A3',
  },
  cashBalanceCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  gcashName: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cashBalanceLabel: {
    color: '#757575',
    fontSize: 14,
  },
  cashBalanceDotsButton: {
    padding: 8,
  },
  cashBalanceMenu: {
    color: '#FFFFFF', 
    borderRadius: 10,
    padding: 8,
    elevation: 5,  
  },
  cashBalanceBottom: {},
  cashBalanceAvailable: {
    color: '#757575',
    fontSize: 14,
    marginBottom: 4,
  },
  cashBalanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cashBalanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  addBalanceCard: {
    backgroundColor: '#2551A3',
    borderRadius: 40,
    paddingVertical: 16,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addBalanceText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recentRecordsContainer: {
    marginTop: 24,
  },
  recentRecordsBackground: {
    backgroundColor: '#fff',
    borderRadius: 30,
    height: "80%",
    width: "100%",
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  recentSubHeader: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  subCategory: {
    fontSize: 12,
    color: '#757575',
  },
  amountInfo: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#757575',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    textAlign: 'left',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalSaveButton: {
    backgroundColor: '#2551A3',
    borderRadius: 10,
    padding: 10,
    width: 120,
    alignItems: 'center',
  },
  modalSaveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#757575',
    borderRadius: 10,
    padding: 10,
    width: 120,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Dashboard;
