import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTICATION
// ─────────────────────────────────────────────────────────────────────────────
export const auth = {
  // Sign up a new user
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData },
    })
    return { data, error }
  },

  // Sign in an existing user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
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

  // Get the current session
  getSession() {
    return supabase.auth.getSession()
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// USER ROLES
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// STORAGE — used by the incubatee wizard upload buttons
//
// ONE-TIME SUPABASE DASHBOARD SETUP:
//   1. Go to Storage → New bucket
//   2. Name it "incubatees" and toggle it to PUBLIC
//   3. Go to Storage → Policies and add these rules for the "incubatees" bucket:
//        SELECT  → allow for anon role          (so uploaded images load publicly)
//        INSERT  → allow for authenticated role  (only logged-in admins can upload)
//        DELETE  → allow for authenticated role  (only logged-in admins can delete)
//
// Sub-folders are created automatically on first upload:
//   incubatees/logos/
//   incubatees/gallery/
//   incubatees/achievements/
//   incubatees/team/
//   incubatees/testimonials/
// ─────────────────────────────────────────────────────────────────────────────

// Default bucket for all incubatee media
const INCUBATEE_BUCKET = 'incubatees'

/**
 * Folder name constants — always use these when calling uploadFile()
 * so folder paths stay consistent across the whole app.
 *
 * @example
 * import { uploadFile, incubateeFolders } from '@/utils/supabase'
 * const { url } = await uploadFile(file, incubateeFolders.LOGOS)
 */
export const incubateeFolders = {
  LOGOS: 'logos',
  GALLERY: 'gallery',
  ACHIEVEMENTS: 'achievements',
  TEAM: 'team',
  TESTIMONIALS: 'testimonials',
}

/**
 * Upload a File to Supabase Storage and return its public URL.
 *
 * @param {File}   file           - File object from <input type="file">
 * @param {string} folder         - Target sub-folder (use incubateeFolders constants)
 * @param {string} [bucket]       - Bucket name, defaults to 'incubatees'
 * @param {number} [maxSizeMB=5]  - Max allowed file size in MB
 * @returns {Promise<{ url: string|null, path: string|null, error: string|null }>}
 *
 * @example
 * const { url, error } = await uploadFile(file, incubateeFolders.LOGOS)
 * if (error) { showToast(error); return }
 * form.logo = url
 */
export async function uploadFile(file, folder, bucket = INCUBATEE_BUCKET, maxSizeMB = 5) {
  if (!file) return { url: null, path: null, error: 'No file provided.' }

  // Validate file type — only images allowed
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return {
      url: null,
      path: null,
      error: 'Invalid file type. Please upload a JPG, PNG, WEBP, or GIF image.',
    }
  }

  // Validate file size
  const maxBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxBytes) {
    return { url: null, path: null, error: `File exceeds the ${maxSizeMB}MB size limit.` }
  }

  // Build a unique storage path so filenames never collide
  const ext = file.name.split('.').pop().toLowerCase()
  const uniqueName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `${folder}/${uniqueName}`

  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (uploadError) {
    console.error('[uploadFile] Upload failed:', uploadError)
    return { url: null, path: null, error: uploadError.message }
  }

  // Retrieve the permanent public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return { url: data?.publicUrl ?? null, path: filePath, error: null }
}

/**
 * Delete a previously uploaded file using its storage path.
 * The path is the value returned in the `path` field from uploadFile().
 *
 * @param {string} filePath  - e.g. 'logos/1718000000_abc123.png'
 * @param {string} [bucket]  - Bucket name, defaults to 'incubatees'
 * @returns {Promise<{ error: string|null }>}
 *
 * @example
 * await deleteFile('logos/1718000000_abc123.png')
 */
export async function deleteFile(filePath, bucket = INCUBATEE_BUCKET) {
  if (!filePath) return { error: 'No file path provided.' }

  const { error } = await supabase.storage.from(bucket).remove([filePath])
  if (error) {
    console.error('[deleteFile] Delete failed:', error)
    return { error: error.message }
  }
  return { error: null }
}

/**
 * Delete a file using its full public URL instead of its path.
 * Useful when you only stored the URL (not the path) in the database.
 *
 * @param {string} publicUrl  - Full URL e.g. 'https://xyz.supabase.co/storage/v1/object/public/incubatees/logos/file.png'
 * @param {string} [bucket]   - Bucket name, defaults to 'incubatees'
 * @returns {Promise<{ error: string|null }>}
 *
 * @example
 * await deleteFileByUrl(form.logo)
 */
export async function deleteFileByUrl(publicUrl, bucket = INCUBATEE_BUCKET) {
  if (!publicUrl) return { error: 'No URL provided.' }

  // Parse the file path out of the public URL
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return { error: 'Could not parse a file path from the provided URL.' }

  const filePath = publicUrl.slice(idx + marker.length)
  return deleteFile(filePath, bucket)
}
