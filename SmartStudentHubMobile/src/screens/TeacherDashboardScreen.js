import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TeacherDashboardScreen = ({ navigation, route }) => {
  const { teacherId, name } = route.params || {};

  const QuickAction = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.quickAction, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.nameText}>{name || 'Teacher'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#059669" />
          </TouchableOpacity>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Teacher Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Review Certificates"
              icon="checkmark-circle"
              color="#059669"
              onPress={() => Alert.alert('Coming Soon', 'Certificate Review feature coming soon!')}
            />
            <QuickAction
              title="View Students"
              icon="people"
              color="#4F46E5"
              onPress={() => Alert.alert('Coming Soon', 'Student Management feature coming soon!')}
            />
            <QuickAction
              title="Create Groups"
              icon="add-circle"
              color="#DC2626"
              onPress={() => Alert.alert('Coming Soon', 'Group Management feature coming soon!')}
            />
            <QuickAction
              title="Analytics"
              icon="analytics"
              color="#7C3AED"
              onPress={() => Alert.alert('Coming Soon', 'Analytics feature coming soon!')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748b',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 4,
  },
  profileButton: {
    padding: 5,
  },
  quickActionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  quickAction: {
    width: '47%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TeacherDashboardScreen;
