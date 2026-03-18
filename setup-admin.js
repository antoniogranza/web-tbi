/* eslint-env node */

import { readFileSync } from 'fs'

// Load environment variables from .env file
const envContent = readFileSync('.env', 'utf8')
const envVars = {}
envContent.split('\n').forEach((line) => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key.trim()] = value.trim().replace(/^["']|["']$/g, '')
  }
})

// Set environment variables
process.env.VITE_SUPABASE_URL = envVars.VITE_SUPABASE_URL
process.env.VITE_SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_ANON_KEY

// This script creates a default admin user
// Run this once during initial setup
async function setupAdmin() {
  console.log('Creating default admin user...')

  // Dynamic import after setting env vars
  const { createDefaultAdmin } = await import('./src/utils/supabase.js')

  const result = await createDefaultAdmin()

  if (result.success) {
    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@tbi-system.com')
    console.log('Password: Admin123!') // Remember to change this!
    console.log('Please change the password after first login.')
  } else {
    console.error('❌ Failed to create admin user:', result.error.message)
  }

  process.exit(result.success ? 0 : 1)
}

setupAdmin()
