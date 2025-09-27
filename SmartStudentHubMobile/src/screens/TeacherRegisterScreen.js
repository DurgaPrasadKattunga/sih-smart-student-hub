import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { teacherAPI } from '../services/api';

const InputField = ({ label, field, value, placeholder, keyboardType = 'default', secureText = false, showPassword = false, onTogglePassword, onChange }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChange(field, text)}
        keyboardType={keyboardType}
        secureTextEntry={secureText && !showPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {secureText && (
        <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#64748b"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const TeacherRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    experience: '',
    qualification: '',
    college: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.college || !formData.phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Optional: phone number validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      Alert.alert('Error', 'Enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await teacherAPI.register(formData);
      Alert.alert('Success', 'Registration successful!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TeacherLogin')
        }
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="always">
          <View style={styles.header}>
            <Ionicons name="person-add" size={60} color="#059669" />
            <Text style={styles.title}>Teacher Registration</Text>
            <Text style={styles.subtitle}>Create your teacher account</Text>
          </View>

          <View style={styles.form}>
            <InputField
              label="Full Name *"
              field="name"
              value={formData.name}
              placeholder="Enter your full name"
              onChange={handleInputChange}
            />

            <InputField
              label="Email *"
              field="email"
              value={formData.email}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChange={handleInputChange}
            />

            <InputField
              label="Password *"
              field="password"
              value={formData.password}
              placeholder="Enter your password"
              secureText={true}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onChange={handleInputChange}
            />

            <InputField
              label="Confirm Password *"
              field="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm your password"
              secureText={true}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handleInputChange}
            />

            <InputField
              label="College *"
              field="college"
              value={formData.college}
              placeholder="Enter your college"
              onChange={handleInputChange}
            />

            <InputField
              label="Phone Number *"
              field="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              onChange={handleInputChange}
            />

            <InputField
              label="Department"
              field="department"
              value={formData.department}
              placeholder="Enter your department"
              onChange={handleInputChange}
            />

            <InputField
              label="Experience (years)"
              field="experience"
              value={formData.experience}
              placeholder="Enter years of experience"
              keyboardType="numeric"
              onChange={handleInputChange}
            />

            <InputField
              label="Qualification"
              field="qualification"
              value={formData.qualification}
              placeholder="Enter your qualification"
              onChange={handleInputChange}
            />

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <View style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('TeacherLogin')}>
                <Text style={styles.loginLinkText}>Sign in here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  eyeIcon: {
    padding: 5,
  },
  registerButton: {
    backgroundColor: '#059669',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: '#64748b',
  },
  loginLinkText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
});

export default TeacherRegisterScreen;
