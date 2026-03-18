import { createClient } from '@supabase/supabase-js'

// Get environment variables (works in both Vite and Node.js)
const getEnvVar = (key) => {
  // Check if we're in Vite environment
  try {
    if (import.meta?.env) {
      return import.meta.env[key]
    }
  } catch {
    // Not in Vite environment, use process.env
  }
  return process.env[key]
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// Authentication helper functions
export const auth = {
  // Sign up a new user
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })
    return { data, error }
  },

  // Sign in an existing user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out the current user
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get the current user
  getCurrentUser() {
    return supabase.auth.getUser()
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// User roles helper
export const userRoles = {
  ADMIN: 'admin',
  INCUBATEE: 'incubatee',
  STAFF: 'staff',
  GUEST: 'guest',
}

// Check if user has admin role
export async function isAdmin() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  // Check user metadata for role
  return user.user_metadata?.role === userRoles.ADMIN
}

// Create default admin user (call this once during setup)
export async function createDefaultAdmin() {
  const adminEmail = 'admin@tbi-system.com'
  const adminPassword = 'Admin123!' // Change this to a secure password

  try {
    const { data, error } = await auth.signUp(adminEmail, adminPassword, {
      role: userRoles.ADMIN,
      name: 'System Administrator',
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error('Error creating admin user:', error.message)
      return { success: false, error }
    }

    console.log('Default admin user created successfully:', data.user.email)
    return { success: true, user: data.user }
  } catch (error) {
    console.error('Failed to create admin user:', error)
    return { success: false, error }
  }
}
