import { ref, computed } from 'vue'
import { auth, isAdmin, userRoles } from '@/utils/supabase'

const user = ref(null)
const loading = ref(true)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)
  const isAdminUser = computed(() => user.value?.user_metadata?.role === userRoles.ADMIN)
  const userRole = computed(() => user.value?.user_metadata?.role || userRoles.GUEST)

  const setUser = (newUser) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  const checkAuth = async () => {
    try {
      loading.value = true
      const {
        data: { user: currentUser },
      } = await auth.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Auth check failed:', error)
      clearUser()
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    await auth.signOut()
    clearUser()
  }

  // Initialize auth state
  checkAuth()

  // Listen to auth changes
  auth.onAuthStateChange((event, session) => {
    setUser(session?.user || null)
    loading.value = false
  })

  return {
    user: computed(() => user.value),
    isAuthenticated,
    isAdminUser,
    userRole,
    loading: computed(() => loading.value),
    checkAuth,
    signOut,
  }
}
