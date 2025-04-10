import React, { useState } from 'react';
import {View, Text,TouchableOpacity, Modal,TextInput,StyleSheet, FlatList,} from 'react-native';

const ProfileScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      setError('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    console.log('Password changed!');
    setIsModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const menuItems = [
    'My Account',
    'Change Password',
    'Logout',
  ];

  const handleMenuItemPress = (item: string) => {
    if (item === 'Change Password') {
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>User Name</Text>
        <Text style={styles.phone}>+63912345678901</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress(item)}
          >
            <Text style={styles.menuText}>{item}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePasswordChange}>
                <Text style={styles.saveBtn}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#cfe7fd',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  phone: {
    color: '#666',
    fontSize: 14,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    color: '#666',
    marginRight: 20,
    fontSize: 16,
  },
  saveBtn: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
