import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Reminder {
  title: string;
  description: string;
  dueDate: string;
}

interface RemindersProps {
  reminders: Reminder[];
  onComplete: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}

const Reminders: React.FC<RemindersProps> = ({ reminders, onComplete, onEdit, onDelete, onAdd }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <MaterialCommunityIcons name="bell-outline" size={20} color="#757575" /> Reminders
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {reminders.map((reminder, index) => (
        <View key={index} style={styles.reminderItem}>
          <View style={styles.reminderInfo}>
            <Text style={styles.reminderTitle}>{reminder.title}</Text>
            <Text style={styles.reminderDescription}>{reminder.description}</Text>
            <Text style={styles.reminderDate}>{reminder.dueDate}</Text>
          </View>
          <View style={styles.reminderActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onComplete(index)}>
              <Icon name="check-circle" size={24} color="#81C784" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(index)}>
              <Icon name="edit" size={24} color="#2196F3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(index)}>
              <Icon name="trash-2" size={24} color="#E53935" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5', // Light grey background similar to the image
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50', // Green add button
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  reminderDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  reminderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 16,
  },
});

export default Reminders;