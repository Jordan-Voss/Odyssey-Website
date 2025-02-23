'use client';

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  }

  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <ThemedView style={{ flex: 1 }}>
          {children}
        </ThemedView>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
} 