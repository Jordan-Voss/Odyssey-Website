'use client';

import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    try {
      setIsLoading(true);
      setError('');

      // 1. Basic auth check
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      console.log('1. Auth attempt:', {
        success: !signInError,
        email: email.trim().toLowerCase(),
        userId: data?.user?.id,
        error: signInError?.message
      });

      if (signInError) throw signInError;
      if (!data.user) throw new Error('No user returned');

      // 2. Get session to verify authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      console.log('2. Session check:', {
        hasSession: !!session,
        error: sessionError?.message
      });

      // 3. Try a basic query first
      const { data: testData, error: testError } = await supabase
        .from('admin_users')
        .select('id');

      console.log('3. Basic query test:', {
        success: !testError,
        count: testData?.length,
        error: testError?.message
      });

      // 4. Check admin status
      const { data: profile, error: profileError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      console.log('4. Admin check:', {
        userId: data.user.id,
        hasProfile: !!profile,
        error: profileError?.message,
        profile
      });

      if (profileError) throw profileError;
      if (!profile) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized access - not an admin');
      }

      router.replace('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Admin Login</ThemedText>
        
        <ThemedInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          // autoCapitalize="none"
        />
        
        <ThemedInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {error && (
          <ThemedText style={styles.error}>{error}</ThemedText>
        )}

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    gap: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: '#dc3545',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 