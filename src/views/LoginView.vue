<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, isAdmin } from '@/utils/supabase'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const loading = ref(false)
const apiError = ref('')

const errors = reactive({
  email: '',
  password: '',
})

const validate = () => {
  errors.email = ''
  errors.password = ''

  let valid = true

  if (!email.value) {
    errors.email = 'Email is required'
    valid = false
  }

  if (!password.value) {
    errors.password = 'Password is required'
    valid = false
  }

  return valid
}

const handleLogin = async () => {
  apiError.value = ''

  if (!validate()) return

  loading.value = true

  try {
    const { data, error } = await auth.signIn(email.value, password.value)

    if (error) {
      apiError.value = error.message
      return
    }

    // Check if user is admin
    const adminStatus = await isAdmin()

    if (adminStatus) {
      alert('Admin login successful!')
      // Redirect to admin dashboard
      router.push('/admin')
    } else {
      alert('Login successful!')
      router.push('/')
    }
  } catch (err) {
    apiError.value = 'An unexpected error occurred'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

// Check if user is already logged in
onMounted(async () => {
  const {
    data: { user },
  } = await auth.getCurrentUser()
  if (user) {
    // Check if user is admin and redirect accordingly
    const adminStatus = await isAdmin()
    if (adminStatus) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }
})

// UI-only: password visibility toggle — does not touch any logic
const showPassword = ref(false)
</script>

<template>
  <v-app class="login-app">
    <v-main>
      <div class="login-page">
        <!-- Decorative soft blobs — purely visual -->
        <div class="bg-blob bg-blob--1" />
        <div class="bg-blob bg-blob--2" />
        <div class="bg-blob bg-blob--3" />

        <v-container class="fill-height d-flex justify-center align-center">
          <div class="login-card">
            <!-- ── Brand header ── -->
            <div class="login-brand mb-1">
              <div class="brand-icon">
                <v-icon icon="mdi-compass" size="26" color="white" />
              </div>
              <div>
                <div class="brand-name">NAVIGATÚ</div>
                <div class="brand-sub">Technology Business Incubator</div>
              </div>
            </div>

            <div class="login-divider my-5" />

            <!-- ── Title ── -->
            <div class="mb-6">
              <h2 class="login-title">Admin Sign In</h2>
              <p class="login-subtitle">Enter your credentials to access the dashboard</p>
            </div>

            <!-- ── API error — kept exactly as original, just styled ── -->
            <div v-if="apiError" class="api-error-box mb-5">
              <v-icon icon="mdi-alert-circle-outline" size="15" class="mr-2" />
              {{ apiError }}
            </div>

            <!-- ── Form — @submit.prevent, ref, all bindings unchanged ── -->
            <v-form @submit.prevent="handleLogin" ref="formRef">
              <!-- Email field — v-model, type, :error-messages all unchanged -->
              <div class="field-wrap">
                <label class="field-label">Email Address</label>
                <v-text-field
                  v-model="email"
                  type="email"
                  placeholder="admin@navigatu.edu.ph"
                  :error-messages="errors.email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  bg-color="white"
                  hide-details="auto"
                  class="login-field"
                  required
                />
              </div>

              <!-- Password field — v-model, :error-messages all unchanged -->
              <div class="field-wrap mt-4">
                <label class="field-label">Password</label>
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  :error-messages="errors.password"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  bg-color="white"
                  hide-details="auto"
                  class="login-field"
                  required
                />
              </div>

              <!-- Remember me — v-model unchanged -->
              <v-checkbox
                v-model="rememberMe"
                label="Keep me signed in"
                density="compact"
                hide-details
                color="primary"
                class="mt-3 remember-check"
              />

              <!-- Submit button — type="submit" and :loading unchanged -->
              <v-btn
                block
                color="primary"
                class="mt-5 login-btn"
                :loading="loading"
                type="submit"
                rounded="lg"
                size="large"
                elevation="0"
              >
                <v-icon icon="mdi-login" size="17" class="mr-2" />
                Sign In
              </v-btn>
            </v-form>

            <!-- Secured by note -->
            <div class="secured-note mt-6">
              <v-icon icon="mdi-shield-check-outline" size="13" color="#3ECF8E" class="mr-1" />
              Secured by Supabase Authentication
            </div>
          </div>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

/* ── App + page ──────────────────────────────────────────────────────────────── */
.login-app {
  font-family: 'DM Sans', sans-serif !important;
}

.login-page {
  min-height: 100vh;
  background: linear-gradient(150deg, #e9eef8 0%, #f2f5fc 55%, #e5edf8 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Blurred decorative blobs — no interaction, only atmosphere */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.bg-blob--1 {
  width: 520px;
  height: 520px;
  background: rgba(187, 222, 251, 0.55);
  top: -180px;
  left: -140px;
}
.bg-blob--2 {
  width: 400px;
  height: 400px;
  background: rgba(200, 230, 201, 0.4);
  bottom: -120px;
  right: -100px;
}
.bg-blob--3 {
  width: 240px;
  height: 240px;
  background: rgba(209, 196, 233, 0.45);
  top: 40%;
  left: 58%;
}

/* ── Card ────────────────────────────────────────────────────────────────────── */
.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 22px;
  padding: 40px 40px 32px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(224, 230, 245, 0.9);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.03),
    0 12px 40px rgba(21, 101, 192, 0.11),
    0 32px 80px rgba(21, 101, 192, 0.06);
}

/* ── Brand ───────────────────────────────────────────────────────────────────── */
.login-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.3);
}
.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1565c0;
  line-height: 1.1;
  letter-spacing: 0.5px;
}
.brand-sub {
  font-size: 0.6rem;
  color: #aaa;
  letter-spacing: 0.3px;
  margin-top: 2px;
}

/* ── Divider ─────────────────────────────────────────────────────────────────── */
.login-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #dde3f0 30%, #dde3f0 70%, transparent);
}

/* ── Title ───────────────────────────────────────────────────────────────────── */
.login-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 5px;
  line-height: 1.2;
}
.login-subtitle {
  font-size: 0.82rem;
  color: #999;
  margin: 0;
  line-height: 1.5;
}

/* ── API error ───────────────────────────────────────────────────────────────── */
.api-error-box {
  display: flex;
  align-items: center;
  background: #fff5f5;
  border: 1px solid #fecaca;
  border-left: 4px solid #ef4444;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #c62828;
  font-weight: 500;
  line-height: 1.4;
}

/* ── Field labels ────────────────────────────────────────────────────────────── */

.field-label {
  display: block;
  font-size: 0.76rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
}

/* ── Field styling — only visual, all Vuetify props / v-model untouched ── */
.login-field :deep(.v-field) {
  border-radius: 10px !important;
  font-size: 0.88rem;
  transition: box-shadow 0.18s ease;
}
.login-field :deep(.v-field__outline) {
  border-color: #dde3f0 !important;
}
.login-field :deep(.v-field--focused .v-field__outline) {
  border-color: #1565c0 !important;
  border-width: 2px !important;
}
.login-field :deep(.v-field--focused) {
  box-shadow: 0 0 0 4px rgba(21, 101, 192, 0.08);
}
.login-field :deep(.v-field--error .v-field__outline) {
  border-color: #ef4444 !important;
}
.login-field :deep(.v-field__prepend-inner .v-icon) {
  color: #b0b8cc !important;
  font-size: 18px !important;
}
.login-field :deep(.v-field--focused .v-field__prepend-inner .v-icon) {
  color: #1565c0 !important;
}

/* ── Checkbox ────────────────────────────────────────────────────────────────── */
.remember-check :deep(.v-label) {
  font-size: 0.8rem !important;
  color: #666 !important;
}

/* ── Submit button ───────────────────────────────────────────────────────────── */
.login-btn {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.92rem !important;
  font-weight: 700 !important;
  text-transform: none !important;
  letter-spacing: 0.2px !important;
  height: 48px !important;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%) !important;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease !important;
}
.login-btn:not(:disabled):hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.32) !important;
}
.login-btn:not(:disabled):active {
  transform: translateY(0) !important;
}

/* ── Secured note ────────────────────────────────────────────────────────────── */
.secured-note {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #bbb;
  letter-spacing: 0.2px;
}

/* ── Responsive ──────────────────────────────────────────────────────────────── */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 22px 26px;
    border-radius: 18px;
  }
  .login-title {
    font-size: 1.35rem;
  }
}
</style>
