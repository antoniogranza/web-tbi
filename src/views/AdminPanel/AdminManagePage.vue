<template>
  <v-app class="admin-app">
    <!-- SIDEBAR -->
    <v-navigation-drawer permanent :rail="sidebarRail" class="admin-sidebar" width="260">
      <div class="sidebar-brand" :class="{ 'sidebar-brand--rail': sidebarRail }">
        <div class="sb-logo">
          <v-icon icon="mdi-shield-crown-outline" size="22" color="white" />
        </div>
        <div v-if="!sidebarRail" class="sb-brand-text">
          <div class="sb-name">TBI Admin</div>
          <div class="sb-sub">Control Panel</div>
        </div>
      </div>
      <v-divider color="rgba(255,255,255,0.1)" />
      <v-list nav density="compact" class="sidebar-nav mt-2">
        <v-list-item
          prepend-icon="mdi-arrow-left"
          title="Back to Dashboard"
          rounded="lg"
          class="nav-item"
          @click="router.push('/admin/dashboard')"
        />
        <v-divider color="rgba(255,255,255,0.1)" class="my-2" />
        <v-list-subheader v-if="!sidebarRail" class="nav-subheader">{{
          portalName
        }}</v-list-subheader>
        <v-list-item
          v-for="item in sidebarItems"
          :key="item.id"
          :prepend-icon="item.icon"
          :title="item.label"
          :value="item.id"
          :active="activeSection === item.id"
          active-color="white"
          class="nav-item"
          rounded="lg"
          @click="activeSection = item.id"
        />
        <v-divider color="rgba(255,255,255,0.1)" class="my-2" />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          class="nav-item nav-item--logout"
          rounded="lg"
          @click="handleLogout"
        />
      </v-list>
      <template #append>
        <div class="sidebar-toggle-wrap">
          <v-btn
            :icon="sidebarRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            variant="text"
            size="small"
            color="rgba(255,255,255,0.5)"
            @click="sidebarRail = !sidebarRail"
          />
        </div>
      </template>
    </v-navigation-drawer>

    <!-- APP BAR -->
    <v-app-bar flat color="white" border="b" height="60">
      <v-app-bar-title>
        <div class="d-flex align-center">
          <div class="portal-dot mr-2" :style="{ background: portalColor }" />
          <span class="appbar-title">{{ portalName }} — {{ activeSectionLabel }}</span>
        </div>
      </v-app-bar-title>
      <template #append>
        <div class="d-flex align-center mr-3" style="gap: 8px">
          <v-btn icon="mdi-bell-outline" variant="text" size="small" color="#555" />
          <v-btn icon="mdi-logout" variant="text" size="small" color="#555" @click="handleLogout" />
        </div>
      </template>
    </v-app-bar>

    <v-main class="admin-main">
      <div class="content-area">
        <!-- ── SECTION HEADER ── -->
        <div class="section-header mb-6">
          <div>
            <div class="section-eyebrow">
              <v-icon :icon="activeSectionIcon" size="13" class="mr-1" />{{ portalName }} Management
            </div>
            <h2 class="section-title">{{ activeSectionLabel }}</h2>
          </div>
          <v-btn
            color="primary"
            rounded="lg"
            :prepend-icon="`mdi-plus`"
            elevation="0"
            class="add-btn"
            @click="openAddDialog"
          >
            Add {{ activeSectionLabel.replace(/s$/, '') }}
          </v-btn>
        </div>

        <!-- ── SEARCH & FILTER ── -->
        <div class="list-controls mb-5">
          <v-text-field
            v-model="searchQuery"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            rounded="lg"
            hide-details
            bg-color="white"
            style="max-width: 320px"
          />
          <v-chip-group v-model="filterStatus" class="ml-2">
            <v-chip value="all" filter size="small" variant="tonal" color="primary">All</v-chip>
            <v-chip value="active" filter size="small" variant="tonal" color="success"
              >Active</v-chip
            >
            <v-chip value="draft" filter size="small" variant="tonal" color="warning">Draft</v-chip>
          </v-chip-group>
        </div>

        <!-- ── RECORDS TABLE ── -->
        <v-card rounded="xl" elevation="0" border class="records-card">
          <v-data-table
            :headers="tableHeaders"
            :items="filteredRecords"
            :loading="tableLoading"
            :search="searchQuery"
            rounded="xl"
            hover
            class="records-table"
          >
            <!-- Status column -->
            <template #[`item.status`]="{ item }">
              <v-chip
                :color="item.status === 'active' ? 'success' : 'warning'"
                size="x-small"
                variant="tonal"
                class="font-weight-bold"
              >
                {{ item.status }}
              </v-chip>
            </template>

            <!-- Actions column -->
            <template #[`item.actions`]="{ item }">
              <div class="d-flex align-center" style="gap: 4px">
                <v-btn
                  icon="mdi-pencil-outline"
                  size="x-small"
                  variant="text"
                  color="#1565C0"
                  @click="openEditDialog(item)"
                />
                <v-btn
                  icon="mdi-eye-outline"
                  size="x-small"
                  variant="text"
                  color="#555"
                  @click="openViewDialog(item)"
                />
                <v-btn
                  icon="mdi-trash-can-outline"
                  size="x-small"
                  variant="text"
                  color="#C62828"
                  @click="openDeleteDialog(item)"
                />
              </div>
            </template>

            <template #no-data>
              <div class="empty-table-state">
                <v-icon :icon="activeSectionIcon" size="48" color="#ddd" />
                <p class="empty-table-title mt-3">No {{ activeSectionLabel }} yet</p>
                <p class="empty-table-sub">
                  Click "Add {{ activeSectionLabel.replace(/s$/, '') }}" to get started.
                </p>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-main>

    <!-- ===== ADD / EDIT DIALOG ===== -->
    <v-dialog v-model="formDialog" max-width="680" scrollable>
      <v-card rounded="xl" elevation="0" class="form-dialog-card">
        <!-- Header -->
        <div class="dialog-header" :style="{ background: portalColor }">
          <div>
            <div class="dialog-eyebrow">{{ isEditing ? 'Edit' : 'Add New' }}</div>
            <h3 class="dialog-title">{{ activeSectionLabel.replace(/s$/, '') }}</h3>
          </div>
          <v-btn
            icon="mdi-close"
            variant="flat"
            color="rgba(255,255,255,0.2)"
            size="small"
            @click="formDialog = false"
          />
        </div>

        <v-card-text class="pa-7">
          <v-form ref="formRef" @submit.prevent="handleSubmit">
            <!-- ── INCUBATEE FIELDS ── -->
            <template v-if="activeSection === 'incubatees'">
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="form-label">Startup Name *</div>
                  <v-text-field
                    v-model="form.name"
                    placeholder="e.g. Ascribo AI"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Category / Industry *</div>
                  <v-select
                    v-model="form.category"
                    :items="[
                      'Artificial Intelligence',
                      'ICT & Software',
                      'Internet of Things',
                      'Engineering Tech',
                      'AgriTech',
                      'HealthTech',
                      'FinTech',
                      'Other',
                    ]"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Tagline</div>
                  <v-text-field
                    v-model="form.tagline"
                    placeholder="One-sentence description of the startup"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Description *</div>
                  <v-textarea
                    v-model="form.description"
                    placeholder="Detailed description of the startup..."
                    variant="outlined"
                    rounded="lg"
                    rows="3"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Year Founded</div>
                  <v-text-field
                    v-model="form.yearFounded"
                    placeholder="e.g. 2022"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Location / Headquarters</div>
                  <v-text-field
                    v-model="form.location"
                    placeholder="e.g. Bukidnon, Philippines"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Website URL</div>
                  <v-text-field
                    v-model="form.website"
                    placeholder="https://"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Contact Email</div>
                  <v-text-field
                    v-model="form.contactEmail"
                    placeholder="hello@startup.com"
                    type="email"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Total Funding Received</div>
                  <v-text-field
                    v-model="form.funding"
                    placeholder="e.g. ₱1.2M"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Team Size</div>
                  <v-text-field
                    v-model="form.teamSize"
                    placeholder="e.g. 8"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Logo Image Path</div>
                  <v-text-field
                    v-model="form.logo"
                    placeholder="/images/incubatees/startup-logo.png"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                    hint="Path relative to /public folder"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Status</div>
                  <v-select
                    v-model="form.status"
                    :items="['active', 'draft', 'graduated']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- ── NEWS FIELDS ── -->
            <template v-else-if="activeSection === 'news'">
              <v-row>
                <v-col cols="12">
                  <div class="form-label">News Title *</div>
                  <v-text-field
                    v-model="form.title"
                    placeholder="Enter news headline"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Category *</div>
                  <v-select
                    v-model="form.category"
                    :items="[
                      'Announcement',
                      'Achievement',
                      'Partnership',
                      'Program',
                      'Research',
                      'Other',
                    ]"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Date *</div>
                  <v-text-field
                    v-model="form.date"
                    placeholder="e.g. March 5, 2025"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Location</div>
                  <v-text-field
                    v-model="form.location"
                    placeholder="e.g. Bukidnon, Philippines"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Author</div>
                  <v-text-field
                    v-model="form.author"
                    placeholder="e.g. Navigatú Communications"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Short Description *</div>
                  <v-textarea
                    v-model="form.description"
                    placeholder="Brief summary (shown on card)..."
                    variant="outlined"
                    rounded="lg"
                    rows="2"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Full Article Body</div>
                  <v-textarea
                    v-model="form.fullDescription"
                    placeholder="Full article content..."
                    variant="outlined"
                    rounded="lg"
                    rows="5"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Cover Image Path</div>
                  <v-text-field
                    v-model="form.image"
                    placeholder="/images/news/news1.jpg"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                    hint="Path relative to /public folder"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Status</div>
                  <v-select
                    v-model="form.status"
                    :items="['active', 'draft']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- ── EVENT FIELDS ── -->
            <template v-else-if="activeSection === 'events'">
              <v-row>
                <v-col cols="12">
                  <div class="form-label">Event Title *</div>
                  <v-text-field
                    v-model="form.title"
                    placeholder="Enter event name"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Event Type *</div>
                  <v-select
                    v-model="form.type"
                    :items="[
                      'Workshop',
                      'Pitch Night',
                      'Demo Day',
                      'Networking',
                      'Training',
                      'Summit',
                      'Conference',
                      'Other',
                    ]"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Status</div>
                  <v-select
                    v-model="form.status"
                    :items="['upcoming', 'past', 'draft']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="form-label">Day *</div>
                  <v-text-field
                    v-model="form.day"
                    placeholder="e.g. 18"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="form-label">Month *</div>
                  <v-select
                    v-model="form.month"
                    :items="[
                      'JAN',
                      'FEB',
                      'MAR',
                      'APR',
                      'MAY',
                      'JUN',
                      'JUL',
                      'AUG',
                      'SEP',
                      'OCT',
                      'NOV',
                      'DEC',
                    ]"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="form-label">Year *</div>
                  <v-text-field
                    v-model="form.year"
                    placeholder="e.g. 2025"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Time *</div>
                  <v-text-field
                    v-model="form.time"
                    placeholder="e.g. 2:00 PM – 6:00 PM"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Location / Venue *</div>
                  <v-text-field
                    v-model="form.location"
                    placeholder="e.g. Navigatú TBI Main Hall"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Total Capacity</div>
                  <v-text-field
                    v-model="form.capacity"
                    placeholder="e.g. 100"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Slots Available</div>
                  <v-text-field
                    v-model="form.slots"
                    placeholder="e.g. 40"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Short Description *</div>
                  <v-textarea
                    v-model="form.description"
                    placeholder="Brief summary shown on card..."
                    variant="outlined"
                    rounded="lg"
                    rows="2"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Full Event Details</div>
                  <v-textarea
                    v-model="form.fullDescription"
                    placeholder="Complete event information..."
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Banner Image Path</div>
                  <v-text-field
                    v-model="form.image"
                    placeholder="/images/events/event1.jpg"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                    hint="Path relative to /public folder"
                    persistent-hint
                  />
                </v-col>
              </v-row>
            </template>

            <!-- ── GENERIC FIELDS (Programs, Partners, Team, etc.) ── -->
            <template v-else>
              <v-row>
                <v-col cols="12">
                  <div class="form-label">Name / Title *</div>
                  <v-text-field
                    v-model="form.title"
                    placeholder="Enter name or title"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Description *</div>
                  <v-textarea
                    v-model="form.description"
                    placeholder="Describe this record..."
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Date</div>
                  <v-text-field
                    v-model="form.date"
                    placeholder="e.g. March 5, 2025"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">Status</div>
                  <v-select
                    v-model="form.status"
                    :items="['active', 'draft', 'archived']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- Submit row -->
            <v-divider class="my-5" />
            <div class="d-flex justify-end" style="gap: 10px">
              <v-btn variant="outlined" rounded="lg" @click="formDialog = false">Cancel</v-btn>
              <v-btn
                type="submit"
                :color="portalColor"
                rounded="lg"
                :loading="saving"
                elevation="0"
                class="save-btn"
              >
                <v-icon icon="mdi-content-save-outline" class="mr-2" size="16" />
                {{ isEditing ? 'Save Changes' : 'Add Record' }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- DELETE CONFIRM -->
    <v-dialog v-model="deleteDialog" max-width="380">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="text-center mb-5">
          <v-icon icon="mdi-trash-can-outline" size="40" color="#C62828" />
          <h3 class="delete-title mt-3">Delete Record?</h3>
          <p class="delete-sub mt-2">This action cannot be undone.</p>
        </div>
        <v-row dense>
          <v-col cols="6"
            ><v-btn block variant="outlined" rounded="lg" @click="deleteDialog = false"
              >Cancel</v-btn
            ></v-col
          >
          <v-col cols="6"
            ><v-btn block color="error" rounded="lg" :loading="deleting" @click="confirmDelete"
              >Delete</v-btn
            ></v-col
          >
        </v-row>
      </v-card>
    </v-dialog>

    <!-- LOGOUT -->
    <v-dialog v-model="logoutDialog" max-width="360">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="text-center mb-5">
          <v-icon icon="mdi-logout" size="40" color="#C62828" />
          <h3 class="delete-title mt-3">Sign Out?</h3>
          <p class="delete-sub mt-2">You will be returned to the login page.</p>
        </div>
        <v-row dense>
          <v-col cols="6"
            ><v-btn block variant="outlined" rounded="lg" @click="logoutDialog = false"
              >Cancel</v-btn
            ></v-col
          >
          <v-col cols="6"
            ><v-btn block color="error" rounded="lg" @click="confirmLogout">Sign Out</v-btn></v-col
          >
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '@/utils/supabase'

const router = useRouter()
const route = useRoute()

// ── Portal config — driven by route params ────────────────────────────────────
// Routes: /admin/:portal/:section   e.g. /admin/navigatu/incubatees
const portalId = computed(() => route.params.portal || 'navigatu')
const sectionId = computed(() => route.params.section || 'incubatees')
const activeSection = ref(sectionId.value)

const portalConfig = {
  navigatu: { name: 'Navigatú TBI', color: '#1565C0', icon: 'mdi-compass-outline' },
  tara: { name: 'TARA ATBI', color: '#2E7D32', icon: 'mdi-leaf-circle-outline' },
  csutbi: { name: 'CSU TBI', color: '#B71C1C', icon: 'mdi-domain' },
}

const portalName = computed(() => portalConfig[portalId.value]?.name || 'TBI')
const portalColor = computed(() => portalConfig[portalId.value]?.color || '#1565C0')

const sidebarItems = computed(() => {
  const base = [
    { id: 'incubatees', label: 'Incubatees', icon: 'mdi-rocket-launch-outline' },
    { id: 'news', label: 'News', icon: 'mdi-newspaper-variant-outline' },
    { id: 'events', label: 'Events', icon: 'mdi-calendar-star-outline' },
    { id: 'achievements', label: 'Achievements', icon: 'mdi-trophy-outline' },
    { id: 'partners', label: 'Partners', icon: 'mdi-handshake-outline' },
    { id: 'team', label: 'Leadership Team', icon: 'mdi-account-group-outline' },
  ]
  if (portalId.value === 'csutbi') {
    return [
      { id: 'programs', label: 'Programs', icon: 'mdi-school-outline' },
      { id: 'reports', label: 'Reports', icon: 'mdi-chart-bar-stacked' },
      { id: 'users', label: 'User Management', icon: 'mdi-account-cog-outline' },
      { id: 'content', label: 'Content', icon: 'mdi-file-document-edit-outline' },
      { id: 'partners', label: 'Partners', icon: 'mdi-handshake-outline' },
      { id: 'settings', label: 'System Settings', icon: 'mdi-tune-vertical' },
    ]
  }
  if (portalId.value === 'tara') {
    return [
      ...base.filter((i) => i.id !== 'achievements'),
      { id: 'programs', label: 'Programs', icon: 'mdi-school-outline' },
    ]
  }
  return base
})

const activeSectionLabel = computed(
  () => sidebarItems.value.find((i) => i.id === activeSection.value)?.label || 'Records',
)
const activeSectionIcon = computed(
  () =>
    sidebarItems.value.find((i) => i.id === activeSection.value)?.icon || 'mdi-database-outline',
)

// ── Table ─────────────────────────────────────────────────────────────────────
const sidebarRail = ref(false)
const searchQuery = ref('')
const filterStatus = ref('all')
const tableLoading = ref(false)

const tableHeaders = computed(() => {
  if (activeSection.value === 'incubatees')
    return [
      { title: 'Startup Name', key: 'name', sortable: true },
      { title: 'Category', key: 'category', sortable: true },
      { title: 'Location', key: 'location', sortable: false },
      { title: 'Year', key: 'yearFounded', sortable: true },
      { title: 'Funding', key: 'funding', sortable: false },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  if (activeSection.value === 'news')
    return [
      { title: 'Title', key: 'title', sortable: true },
      { title: 'Category', key: 'category', sortable: true },
      { title: 'Location', key: 'location', sortable: false },
      { title: 'Date', key: 'date', sortable: true },
      { title: 'Author', key: 'author', sortable: false },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  if (activeSection.value === 'events')
    return [
      { title: 'Title', key: 'title', sortable: true },
      { title: 'Type', key: 'type', sortable: true },
      { title: 'Date', key: 'date', sortable: true },
      { title: 'Location', key: 'location', sortable: false },
      { title: 'Capacity', key: 'capacity', sortable: false },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  return [
    { title: 'Name / Title', key: 'title', sortable: true },
    { title: 'Description', key: 'description', sortable: false },
    { title: 'Date', key: 'date', sortable: true },
    { title: 'Status', key: 'status', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
  ]
})

// Sample records — replace with real Supabase fetch
const allRecords = ref([
  {
    id: 1,
    name: 'Ascribo AI',
    title: 'Ascribo AI',
    category: 'Artificial Intelligence',
    location: 'Bukidnon',
    yearFounded: '2022',
    funding: '₱4.2M',
    status: 'active',
    type: 'Workshop',
    date: 'April 18, 2025',
    time: '2PM',
    capacity: 100,
    description: 'Sample record',
  },
  {
    id: 2,
    name: 'BizNest',
    title: 'BizNest',
    category: 'Business Technology',
    location: 'Bukidnon',
    yearFounded: '2021',
    funding: '₱1.5M',
    status: 'active',
    type: 'Pitch Night',
    date: 'May 10, 2025',
    time: '3PM',
    capacity: 80,
    description: 'Sample record',
  },
  {
    id: 3,
    name: 'Care Guardian',
    title: 'Care Guardian',
    category: 'HealthTech',
    location: 'Bukidnon',
    yearFounded: '2023',
    funding: '₱0.8M',
    status: 'draft',
    type: 'Demo Day',
    date: 'June 5, 2025',
    time: '9AM',
    capacity: 200,
    description: 'Sample record',
  },
])

const filteredRecords = computed(() => {
  let list = allRecords.value
  if (filterStatus.value !== 'all') list = list.filter((r) => r.status === filterStatus.value)
  return list
})

// ── Form ──────────────────────────────────────────────────────────────────────
const formDialog = ref(false)
const deleteDialog = ref(false)
const logoutDialog = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const deleting = ref(false)
const formRef = ref(null)
const editTarget = ref(null)
const deleteTarget = ref(null)

const blankForm = () => ({
  name: '',
  title: '',
  category: '',
  tagline: '',
  description: '',
  fullDescription: '',
  yearFounded: '',
  location: '',
  website: '',
  contactEmail: '',
  funding: '',
  teamSize: '',
  logo: '',
  image: '',
  status: 'active',
  date: '',
  author: '',
  type: '',
  day: '',
  month: '',
  year: '',
  time: '',
  capacity: '',
  slots: '',
})
const form = reactive(blankForm())

function openAddDialog() {
  isEditing.value = false
  Object.assign(form, blankForm())
  formDialog.value = true
}
function openEditDialog(item) {
  isEditing.value = true
  editTarget.value = item
  Object.assign(form, { ...blankForm(), ...item })
  formDialog.value = true
}
function openViewDialog(item) {
  openEditDialog(item)
}
function openDeleteDialog(item) {
  deleteTarget.value = item
  deleteDialog.value = true
}

async function handleSubmit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  saving.value = true
  // TODO: replace with real Supabase insert/update
  await new Promise((r) => setTimeout(r, 800))
  if (isEditing.value) {
    const idx = allRecords.value.findIndex((r) => r.id === editTarget.value.id)
    if (idx !== -1) allRecords.value[idx] = { ...allRecords.value[idx], ...form }
  } else {
    allRecords.value.push({ id: Date.now(), ...form })
  }
  saving.value = false
  formDialog.value = false
}

async function confirmDelete() {
  deleting.value = true
  await new Promise((r) => setTimeout(r, 600))
  allRecords.value = allRecords.value.filter((r) => r.id !== deleteTarget.value.id)
  deleting.value = false
  deleteDialog.value = false
}

function handleLogout() {
  logoutDialog.value = true
}
async function confirmLogout() {
  try {
    await auth.signOut()
  } catch {
    /* silent */
  }
  logoutDialog.value = false
  router.push('/login')
}

// sync section from route
watch(
  () => route.params.section,
  (val) => {
    if (val) activeSection.value = val
  },
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.admin-app {
  font-family: 'DM Sans', sans-serif !important;
}
.admin-sidebar {
  background: linear-gradient(180deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%) !important;
}
.admin-sidebar :deep(.v-navigation-drawer__content) {
  display: flex;
  flex-direction: column;
}
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 16px;
}
.sidebar-brand--rail {
  justify-content: center;
  padding: 20px 0 16px;
}
.sb-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sb-name {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
}
.sb-sub {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.5);
}
.sidebar-nav :deep(.v-list-item-title) {
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 0.75) !important;
}
.sidebar-nav :deep(.v-list-item__prepend .v-icon) {
  color: rgba(255, 255, 255, 0.55) !important;
  font-size: 18px !important;
}
.sidebar-nav :deep(.v-list-item--active .v-list-item-title) {
  color: #fff !important;
  font-weight: 700 !important;
}
.sidebar-nav :deep(.v-list-item--active .v-icon) {
  color: #fff !important;
}
.sidebar-nav :deep(.v-list-item--active) {
  background: rgba(255, 255, 255, 0.15) !important;
}
.sidebar-nav :deep(.v-list-item:hover:not(.v-list-item--active)) {
  background: rgba(255, 255, 255, 0.08) !important;
}
.nav-subheader {
  font-size: 0.62rem !important;
  color: rgba(255, 255, 255, 0.35) !important;
  font-weight: 700 !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
}
.nav-item--logout :deep(.v-list-item-title) {
  color: rgba(255, 160, 160, 0.8) !important;
}
.nav-item--logout :deep(.v-icon) {
  color: rgba(255, 160, 160, 0.7) !important;
}
.sidebar-toggle-wrap {
  padding: 12px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.portal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.appbar-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}
.admin-main {
  background: #f5f7fb;
}
.content-area {
  padding: 32px 36px;
  max-width: 1200px;
}
@media (max-width: 600px) {
  .content-area {
    padding: 20px 16px;
  }
}
.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.section-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
.add-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}
.list-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
/*
.records-card {
}
*/
.records-table :deep(thead th) {
  font-size: 0.72rem !important;
  font-weight: 700 !important;
  color: #888 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.8px !important;
  background: #f8f9fc !important;
}
.records-table :deep(tbody td) {
  font-size: 0.82rem !important;
  color: #333 !important;
}
.records-table :deep(tr:hover td) {
  background: #f5f8ff !important;
}
.empty-table-state {
  text-align: center;
  padding: 48px 0;
}
.empty-table-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #bbb;
  margin: 0;
}
.empty-table-sub {
  font-size: 0.8rem;
  color: #ccc;
  margin: 4px 0 0;
}
.form-dialog-card {
  overflow: hidden;
}
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
}
.dialog-eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.dialog-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 4px 0 0;
}
.form-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 6px;
  letter-spacing: 0.2px;
}
.form-field :deep(.v-field) {
  border-radius: 10px !important;
  font-size: 0.88rem;
}
.form-field :deep(.v-field__outline) {
  border-color: #dde3f0 !important;
}
.form-field :deep(.v-field--focused .v-field__outline) {
  border-color: #1565c0 !important;
  border-width: 2px !important;
}
.save-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}
.delete-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
.delete-sub {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}
</style>
