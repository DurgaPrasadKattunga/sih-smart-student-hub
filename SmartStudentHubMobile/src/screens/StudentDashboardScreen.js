import React, { useState, useEffect } from 'react';
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
import { studentAPI } from '../services/api';

const StudentDashboardScreen = ({ navigation, route }) => {
  const { studentId, name } = route.params || {};
  const [stats, setStats] = useState({
    certificates: 0,
    academicCertificates: 0,
    projects: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, [studentId]);

  const loadDashboardData = async () => {
    try {
      const [certificates, academicCertificates, projects] = await Promise.all([
        studentAPI.getCertificates(studentId),
        studentAPI.getAcademicCertificates(studentId),
        studentAPI.getProjects(studentId),
      ]);

      setStats({
        certificates: certificates.data?.length || 0,
        academicCertificates: academicCertificates.data?.length || 0,
        projects: projects.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const StatCard = ({ title, count, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.statContent}>
        <View style={[styles.statIcon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <View style={styles.statInfo}>
          <Text style={styles.statCount}>{count}</Text>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const QuickAction = ({ title, icon, color, onPress }) => (
    <TouchableOpacity style={[styles.quickAction, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{name || 'Student'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Personal Certificates"
              count={stats.certificates}
              icon="certificate"
              color="#4F46E5"
              onPress={() => Alert.alert('Coming Soon', 'Personal Certificates feature coming soon!')}
            />
            <StatCard
              title="Academic Certificates"
              count={stats.academicCertificates}
              icon="school"
              color="#059669"
              onPress={() => Alert.alert('Coming Soon', 'Academic Certificates feature coming soon!')}
            />
            <StatCard
              title="Projects"
              count={stats.projects}
              icon="code-slash"
              color="#DC2626"
              onPress={() => Alert.alert('Coming Soon', 'Projects feature coming soon!')}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Add Certificate"
              icon="add-circle"
              color="#4F46E5"
              onPress={() => Alert.alert('Coming Soon', 'Add Certificate feature coming soon!')}
            />
            <QuickAction
              title="View Profile"
              icon="person"
              color="#059669"
              onPress={() => Alert.alert('Coming Soon', 'View Profile feature coming soon!')}
            />
            <QuickAction
              title="Add Project"
              icon="code-slash"
              color="#DC2626"
              onPress={() => Alert.alert('Coming Soon', 'Add Project feature coming soon!')}
            />
            <QuickAction
              title="Settings"
              icon="settings"
              color="#7C3AED"
              onPress={() => Alert.alert('Coming Soon', 'Settings feature coming soon!')}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Ionicons name="time" size={20} color="#64748b" />
            <Text style={styles.activityText}>No recent activity</Text>
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
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  statsGrid: {
    gap: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  statInfo: {
    flex: 1,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 0,
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
  recentActivitySection: {
    padding: 20,
    paddingTop: 0,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  activityText: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default StudentDashboardScreen;
