import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="school" size={60} color="#4F46E5" />
          <Text style={styles.title}>Smart Student Hub</Text>
          <Text style={styles.subtitle}>
            Centralized Digital Platform for Comprehensive Student Activity Records
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="certificate" size={30} color="#4F46E5" />
            <Text style={styles.featureText}>Certificate Management</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people" size={30} color="#4F46E5" />
            <Text style={styles.featureText}>Student Profiles</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="analytics" size={30} color="#4F46E5" />
            <Text style={styles.featureText}>Progress Tracking</Text>
          </View>
        </View>

        {/* Login Options */}
        <View style={styles.loginOptions}>
          <TouchableOpacity
            style={[styles.loginButton, styles.studentButton]}
            onPress={() => navigation.navigate('StudentLogin')}
          >
            <Ionicons name="person" size={24} color="#fff" />
            <Text style={styles.buttonText}>Student Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.teacherButton]}
            onPress={() => navigation.navigate('TeacherLogin')}
          >
            <Ionicons name="people" size={24} color="#fff" />
            <Text style={styles.buttonText}>Teacher Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.adminButton]}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Ionicons name="shield-checkmark" size={24} color="#fff" />
            <Text style={styles.buttonText}>Admin Login</Text>
          </TouchableOpacity>
        </View>

        {/* Register Options */}
        <View style={styles.registerOptions}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <View style={styles.registerButtons}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('StudentRegister')}
            >
              <Text style={styles.registerButtonText}>Student Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('TeacherRegister')}
            >
              <Text style={styles.registerButtonText}>Teacher Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('AdminRegister')}
            >
              <Text style={styles.registerButtonText}>Admin Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  loginOptions: {
    gap: 15,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 10,
  },
  studentButton: {
    backgroundColor: '#4F46E5',
  },
  teacherButton: {
    backgroundColor: '#059669',
  },
  adminButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerOptions: {
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 15,
  },
  registerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  registerButtonText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default LandingScreen;
