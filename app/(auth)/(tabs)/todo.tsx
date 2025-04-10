import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Reminder {
  title: string;
  description: string;
  dueDate: string;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      title: 'Doctor Appointment',
      description: 'Visit Dr. Smith at 3 PM',
      dueDate: '2025-04-10',
    },
    {
      title: 'Meeting with Client',
      description: 'Zoom call with ABC Corp.',
      dueDate: '2025-04-12',
    },
    {
      title: 'Grocery Shopping',
      description: 'Buy vegetables, fruits, and snacks',
      dueDate: '2025-04-13',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [menuVisibleIndex, setMenuVisibleIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newReminder: Reminder = {
      title: newTitle || 'Untitled',
      description: newDescription || 'No description',
      dueDate: newDueDate || 'No date',
    };
    setReminders([...reminders, newReminder]);
    setNewTitle('');
    setNewDescription('');
    setNewDueDate('');
  };

  const handleComplete = (index: number) => {
    const updated = [...reminders];
    updated.splice(index, 1);
    setReminders(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...reminders];
    updated.splice(index, 1);
    setReminders(updated);
    setMenuVisibleIndex(null);
  };

  const handleEdit = (index: number) => {
    console.log('Edit reminder at index', index);
    setMenuVisibleIndex(null);
  };

  const renderItem = ({ item, index }: { item: Reminder; index: number }) => (
    <View style={styles.reminderItem}>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderDescription}>{item.description}</Text>
        <Text style={styles.reminderDate}>{item.dueDate}</Text>
      </View>
      <View style={styles.reminderActions}>
        <TouchableOpacity onPress={() => handleComplete(index)}>
          <Icon name="check-circle" size={22} color="#81C784" />
        </TouchableOpacity>
        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => setMenuVisibleIndex(menuVisibleIndex === index ? null : index)}>
            <Icon name="more-horizontal" size={22} color="#555" />
          </TouchableOpacity>
          {menuVisibleIndex === index && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem}>
                <MaterialCommunityIcons name="eye-off-outline" size={18} color="#333" />
                <Text style={styles.dropdownText}>Hide</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleEdit(index)}>
                <MaterialIcons name="edit" size={18} color="#333" />
                <Text style={styles.dropdownText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleDelete(index)}>
                <MaterialIcons name="delete" size={18} color="#E53935" />
                <Text style={[styles.dropdownText, { color: '#E53935' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisibleIndex(null)}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              <MaterialCommunityIcons name="bell-outline" size={20} color="#2551A3" /> Reminders
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {reminders.length === 0 ? (
            <Text style={styles.emptyText}>No reminders yet. Tap + to add one!</Text>
          ) : (
            <FlatList
              data={reminders}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>

        {/* Modal for Adding Reminder */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>New Reminder</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newDescription}
                  onChangeText={setNewDescription}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Due Date"
                  value={newDueDate}
                  onChangeText={setNewDueDate}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#2196F3' }]}
                    onPress={() => {
                      handleAdd();
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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD',
    flex: 1,
    padding: 16,
    zIndex: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flex: 1,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  addButton: {
    backgroundColor: '#2551A3',
    padding: 10,
    borderRadius: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#757575',
    paddingVertical: 20,
  },
  reminderItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  reminderDescription: {
    fontSize: 14,
    color: '#757575',
  },
  reminderDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  reminderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuWrapper: {
    marginLeft: 12,
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 25,
    right: 0,
    backgroundColor: '#F5F2FA',
    borderRadius: 10,
    paddingVertical: 4,
    width: 160,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 9999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
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
});

export default Reminders;
