import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Import screens
import LandingScreen from './src/screens/LandingScreen';
import StudentLoginScreen from './src/screens/StudentLoginScreen';
import StudentRegisterScreen from './src/screens/StudentRegisterScreen';
import StudentDashboardScreen from './src/screens/StudentDashboardScreen';
import TeacherLoginScreen from './src/screens/TeacherLoginScreen';
import TeacherRegisterScreen from './src/screens/TeacherRegisterScreen';
import TeacherDashboardScreen from './src/screens/TeacherDashboardScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminRegisterScreen from './src/screens/AdminRegisterScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Landing"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4F46E5',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen} 
            options={{ title: 'Smart Student Hub' }}
          />
          
          {/* Student Routes */}
          <Stack.Screen 
            name="StudentLogin" 
            component={StudentLoginScreen} 
            options={{ title: 'Student Login' }}
          />
          <Stack.Screen 
            name="StudentRegister" 
            component={StudentRegisterScreen} 
            options={{ title: 'Student Registration' }}
          />
          <Stack.Screen 
            name="StudentDashboard" 
            component={StudentDashboardScreen} 
            options={{ title: 'Student Dashboard' }}
          />
          
          {/* Teacher Routes */}
          <Stack.Screen 
            name="TeacherLogin" 
            component={TeacherLoginScreen} 
            options={{ title: 'Teacher Login' }}
          />
          <Stack.Screen 
            name="TeacherRegister" 
            component={TeacherRegisterScreen} 
            options={{ title: 'Teacher Registration' }}
          />
          <Stack.Screen 
            name="TeacherDashboard" 
            component={TeacherDashboardScreen} 
            options={{ title: 'Teacher Dashboard' }}
          />
          
          {/* Admin Routes */}
          <Stack.Screen 
            name="AdminLogin" 
            component={AdminLoginScreen} 
            options={{ title: 'Admin Login' }}
          />
          <Stack.Screen 
            name="AdminRegister" 
            component={AdminRegisterScreen} 
            options={{ title: 'Admin Registration' }}
          />
          <Stack.Screen 
            name="AdminDashboard" 
            component={AdminDashboardScreen} 
            options={{ title: 'Admin Dashboard' }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
