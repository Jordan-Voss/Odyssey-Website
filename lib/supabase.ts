import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@/config/env';
import { CoachDetail } from '@/types/coach';
import { themes } from '@/constants/Themes';

// Add logging to verify configuration
console.log('Supabase URL:', SUPABASE_URL?.slice(0, 20) + '...');  // Don't log full URL
console.log('Supabase Key exists:', !!SUPABASE_KEY);

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Add function to create bucket if it doesn't exist
async function ensureBucketExists() {
  const { data: buckets } = await supabase.storage.listBuckets();
  
  if (!buckets?.find(b => b.name === 'Odyssey')) {
    const { error } = await supabase.storage.createBucket('Odyssey', {
      public: false,
      allowedMimeTypes: ['image/png', 'image/jpeg']
    });
    if (error) console.error('Error creating bucket:', error);
  }
}

// Simple function to get signed URL
export async function getImageUrl(filename: string) {
  if (!filename) return null;
  
  console.log('Getting signed URL for:', filename);
  
  const { data, error } = await supabase.storage
    .from('Odyssey')
    .createSignedUrl(filename, 3600); // 1 hour expiry

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }

  console.log('Signed URL:', data.signedUrl);
  return data.signedUrl;
}

// Load coach images
export async function loadCoachImages(coaches: CoachDetail[]) {
  const urls: Record<string, string> = {};
  
  for (const coach of coaches) {
    if (coach.image_url) {
      const publicUrl = getPublicUrl(coach.image_url);
      if (publicUrl) {
        urls[coach.id] = publicUrl;
      }
    }
  }
  
  return urls;
}

// Keep getSignedUrl for admin functions
export async function getSignedUrl(fullPath: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return getImageUrl(fullPath); // Fallback to image URL
  }

  const filename = fullPath.split('/').pop() || '';
  console.log('Getting signed URL for:', filename);
  
  const { data, error } = await supabase.storage
    .from('Odyssey')
    .createSignedUrl(filename, 3600);
  console.log('Signed URL:', data?.signedUrl);
  if (error) {
    console.error('Error getting signed URL:', error);
    return getImageUrl(fullPath); // Fallback to image URL
  }
  
  return data?.signedUrl;
}

export function getPublicUrl(filename: string) {
  if (!filename) return null;
  
  const { data } = supabase.storage
    .from('Odyssey')
    .getPublicUrl(filename);
    
  return data.publicUrl;
}

// Add this function to handle coach updates
export async function updateCoach(coach: CoachDetail) {
  if (!coach.id) {
    throw new Error('Cannot update coach without ID');
  }

  console.log('Starting coach update for ID:', coach.id);

  try {
    const updateData = {
      name: coach.name,
      role: coach.role,
      bio: coach.bio,
      image_url: coach.image_url,
      qualifications: coach.qualifications,
      social_links: coach.social_links,
      full_bio: coach.full_bio,
      achievements: coach.achievements,
      images: coach.images,
      show: coach.show,
      order_index: coach.order_index,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('coaches')
      .update(updateData)
      .eq('id', coach.id);  // Use the actual coach ID

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    return coach;
  } catch (error) {
    console.error('Error in updateCoach:', error);
    throw error;
  }
}

// Update the connection test function
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id');  // Just select id instead of count(*)
    
    console.log('Supabase connection test:', {
      success: !error,
      data,
      error: error?.message,
      count: data?.length || 0
    });
    
    return !error;
  } catch (e) {
    console.error('Connection test failed:', e);
    return false;
  }
}

// Call this when app starts
testConnection().then(success => {
  console.log('Initial connection test:', success);
});

export interface ThemeColors {
  // Main colors
  primary: string;
  secondary: string;
  tertiary: string;
  
  // Backgrounds
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceHover: string;
  
  // Text
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  textDisabled: string;
  link: string;
  linkHover: string;
  
  // Buttons
  button: {
    primary: {
      background: string;
      text: string;
      border: string;
      hover: {
        background: string;
        text: string;
        border: string;
      },
      active: {
        background: string;
        text: string;
        border: string;
      },
      disabled: {
        background: string;
        text: string;
        border: string;
      }
    },
    secondary: {
      background: string;
      text: string;
      border: string;
      hover: {
        background: string;
        text: string;
        border: string;
      },
      active: {
        background: string;
        text: string;
        border: string;
      },
      disabled: {
        background: string;
        text: string;
        border: string;
      }
    },
    cta: {
      background: string;
      text: string;
      border: string;
      hover: {
        background: string;
        text: string;
        border: string;
      },
      active: {
        background: string;
        text: string;
        border: string;
      },
      disabled: {
        background: string;
        text: string;
        border: string;
      }
    }
  },
  
  // Forms
  input: {
    background: string;
    text: string;
    border: string;
    placeholder: string;
    focus: {
      background: string;
      border: string;
      shadow: string;
    },
    error: {
      background: string;
      border: string;
      text: string;
    }
  },
  
  // Cards
  card: {
    background: string;
    border: string;
    shadow: string;
    hover: {
      background: string;
      border: string;
      shadow: string;
    }
  },
  
  // Status/Feedback
  status: {
    error: {
      background: string;
      text: string;
      border: string;
    },
    success: {
      background: string;
      text: string;
      border: string;
    },
    warning: {
      background: string;
      text: string;
      border: string;
    },
    info: {
      background: string;
      text: string;
      border: string;
    }
  },
  
  // Navigation
  nav: {
    background: string;
    text: string;
    hover: {
      background: string;
      text: string;
    },
    active: {
      background: string;
      text: string;
      border: string;
    }
  },
  
  // Misc UI
  divider: string;
  shadow: string;
  overlay: {
    background: string;
    text: string;
  },
  tooltip: {
    background: string;
    text: string;
    border: string;
  },
  icon: {
    primary: string;
    secondary: string;
    disabled: string;
  }
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  is_active: boolean;
}

export async function getActiveTheme(): Promise<Theme | null> {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching active theme:', error);
    return null;
  }

  return data;
}

export async function getAllThemes(): Promise<Theme[]> {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching themes:', error);
    return [];
  }

  return data;
}

export async function setActiveTheme(themeId: string): Promise<boolean> {
  try {
    // First, deactivate all themes
    await supabase
      .from('themes')
      .update({ is_active: false })
      .neq('id', themeId);

    // Then activate the selected theme
    const { error } = await supabase
      .from('themes')
      .update({ is_active: true })
      .eq('id', themeId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting active theme:', error);
    return false;
  }
}

export async function updateTheme(theme: Theme): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('themes')
      .upsert({  // Use upsert instead of update to handle new themes
        id: theme.id,
        name: theme.name,
        colors: theme.colors,
        is_active: theme.is_active,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    
    // If this is the active theme, refresh the context
    if (theme.is_active) {
      await getActiveTheme();
    }
    
    return true;
  } catch (error) {
    console.error('Error updating theme:', error);
    return false;
  }
}

export async function migrateThemes(): Promise<void> {
  try {
    // Clear existing themes
    await supabase.from('themes').delete().neq('id', '');

    // Map themes to the correct structure
    const themesToInsert = themes.map(theme => ({
      name: theme.name,
      colors: theme.colors,
      is_active: theme.id === themes[0].id
    }));

    // Insert all themes at once
    const { error } = await supabase
      .from('themes')
      .insert(themesToInsert)
      .select();

    if (error) throw error;
    console.log('Themes migrated successfully');
  } catch (error) {
    console.error('Error migrating themes:', error);
  }
} 

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export async function getAllAuthors(): Promise<Author[]> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching authors:', error);
    return [];
  }

  return data;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching author:', error);
    return null;
  }

  return data;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id: string;
  author?: Author;
  image_url?: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:authors(*)
    `)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    return null;
  }

  return data;
}