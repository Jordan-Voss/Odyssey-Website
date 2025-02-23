'use client';

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabase';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/admin/login') {
      checkAuth();
    }
  }, [pathname]);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedView style={{ flex: 1 }}>
          {children}
        </ThemedView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
} 