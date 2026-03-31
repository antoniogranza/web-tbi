<template>
  <v-app class="admin-app">
    <!-- ===== SIDEBAR ===== -->
    <v-navigation-drawer
      v-model="sidebarOpen"
      :rail="sidebarRail"
      permanent
      class="admin-sidebar"
      width="260"
    >
      <!-- Brand -->
      <div class="sidebar-brand" :class="{ 'sidebar-brand--rail': sidebarRail }">
        <div class="sb-logo">
          <v-icon icon="mdi-shield-crown-outline" size="22" color="white" />
        </div>
        <transition name="fade-label">
          <div v-if="!sidebarRail" class="sb-brand-text">
            <div class="sb-name">TBI Admin</div>
            <div class="sb-sub">Control Panel</div>
          </div>
        </transition>
      </div>

      <v-divider color="rgba(255,255,255,0.1)" />

      <!-- User -->
      <div class="sidebar-user" :class="{ 'sidebar-user--rail': sidebarRail }">
        <v-avatar size="34" color="rgba(255,255,255,0.15)">
          <v-icon icon="mdi-account" size="20" color="white" />
        </v-avatar>
        <transition name="fade-label">
          <div v-if="!sidebarRail" class="sb-user-text">
            <div class="sb-user-email">{{ currentUser?.email || 'Administrator' }}</div>
            <div class="sb-user-role">Super Admin</div>
          </div>
        </transition>
      </div>

      <v-divider color="rgba(255,255,255,0.1)" />

      <!-- Nav -->
      <v-list nav density="compact" class="sidebar-nav mt-2">
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          value="home"
          :active="activeSection === 'home'"
          active-color="white"
          class="nav-item"
          rounded="lg"
          @click="setSection('home')"
        />

        <v-list-subheader v-if="!sidebarRail" class="nav-subheader mt-3">
          Content Management
        </v-list-subheader>

        <v-list-item
          v-for="cat in categories"
          :key="cat.id"
          :prepend-icon="cat.icon"
          :title="cat.name"
          :value="cat.id"
          :active="activeSection === cat.id"
          active-color="white"
          class="nav-item"
          rounded="lg"
          @click="setSection(cat.id)"
        />

        <v-divider color="rgba(255,255,255,0.1)" class="my-3" />

        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
          active-color="white"
          class="nav-item nav-item--logout"
          rounded="lg"
          @click="logoutDialog = true"
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

    <!-- ===== APP BAR ===== -->
    <v-app-bar flat color="white" border="b" height="60" class="admin-appbar">
      <v-app-bar-title>
        <div class="d-flex align-center" style="gap: 8px">
          <div
            v-if="activeSection !== 'home'"
            class="appbar-dot"
            :style="{ background: activeCategoryColor }"
          />
          <span class="appbar-page-label">{{ appBarTitle }}</span>
        </div>
      </v-app-bar-title>
      <template #append>
        <div class="d-flex align-center mr-3" style="gap: 8px">
          <v-btn icon="mdi-bell-outline" variant="text" size="small" color="#555" />
          <v-avatar size="32" color="#EEF4FF" style="cursor: pointer" @click="logoutDialog = true">
            <v-icon icon="mdi-account" size="18" color="#1565C0" />
          </v-avatar>
        </div>
      </template>
    </v-app-bar>

    <!-- ===== MAIN CONTENT ===== -->
    <v-main class="admin-main">
      <div class="content-area">
        <!-- HOME SECTION -->
        <div v-if="activeSection === 'home'">
          <div class="welcome-strip mb-8">
            <div>
              <div class="welcome-greeting">Good day, Administrator 👋</div>
              <div class="welcome-sub">Manage all content across TBI portals from here.</div>
            </div>
            <div class="welcome-date">{{ todayLabel }}</div>
          </div>

          <!-- Stats -->
          <v-row class="mb-8">
            <v-col v-for="stat in dashStats" :key="stat.label" cols="6" md="3">
              <div class="stat-card" @click="stat.section && setSection(stat.section)">
                <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
                  <v-icon :icon="stat.icon" :color="stat.color" size="22" />
                </div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>

          <!-- Category cards -->
          <div class="section-eyebrow mb-5">
            <v-icon icon="mdi-lightning-bolt" size="13" class="mr-1" />
            Content Categories — Click to Manage
          </div>

          <v-row>
            <v-col v-for="cat in categories" :key="cat.id" cols="12" md="4">
              <div class="cat-card" :class="`cat-card--${cat.id}`" @click="setSection(cat.id)">
                <div class="cat-card-pattern" />
                <div class="cat-card-body">
                  <div class="cat-card-icon-wrap mb-5">
                    <v-icon :icon="cat.icon" size="32" color="white" />
                  </div>
                  <div class="cat-card-eyebrow">Content Type</div>
                  <h3 class="cat-card-name">{{ cat.name }}</h3>
                  <p class="cat-card-desc">{{ cat.desc }}</p>
                  <div class="cat-chips mt-5">
                    <v-chip
                      v-for="tbi in tbiOptions"
                      :key="tbi.id"
                      size="x-small"
                      variant="tonal"
                      color="white"
                      class="cat-chip mr-1 mb-1"
                      >{{ tbi.shortName }}</v-chip
                    >
                  </div>
                  <div class="cat-card-cta mt-5">
                    Manage {{ cat.name }}
                    <v-icon icon="mdi-arrow-right" size="14" class="ml-1" />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- TBI glance -->
          <div class="section-eyebrow mb-4 mt-10">
            <v-icon icon="mdi-office-building-outline" size="13" class="mr-1" />
            TBI Portals at a Glance
          </div>
          <v-row>
            <v-col v-for="tbi in tbiOptions" :key="tbi.id" cols="12" md="4">
              <div class="tbi-glance-card">
                <div class="tbi-glance-dot" :style="{ background: tbi.color }" />
                <div class="tbi-glance-info">
                  <div class="tbi-glance-name">{{ tbi.name }}</div>
                  <div class="tbi-glance-sub">{{ tbi.sub }}</div>
                </div>
                <div class="tbi-glance-actions">
                  <v-btn
                    v-for="cat in categories"
                    :key="cat.id"
                    size="x-small"
                    variant="tonal"
                    :color="cat.btnColor"
                    class="tbi-glance-btn"
                    :prepend-icon="cat.icon"
                    @click="setSection(cat.id, tbi.id)"
                    >{{ cat.name }}</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- CONTENT SECTION -->
        <div v-else>
          <div class="page-header mb-6">
            <div>
              <div class="page-eyebrow" :style="{ color: activeCategoryColor }">
                <v-icon :icon="activeCategoryIcon" size="13" class="mr-1" />
                All TBI Portals
              </div>
              <h2 class="page-title">{{ activeCategoryName }}</h2>
            </div>
            <v-btn
              :color="activeCategoryBtnColor"
              rounded="lg"
              prepend-icon="mdi-plus"
              elevation="0"
              class="add-btn"
              @click="openAddDialog"
            >
              Add {{ activeSingular }}
            </v-btn>
          </div>

          <v-alert
            v-if="activeTable.apiError.value"
            type="error"
            variant="tonal"
            rounded="lg"
            density="compact"
            closable
            class="mb-5"
            @click:close="activeTable.apiError.value = ''"
            >{{ activeTable.apiError.value }}</v-alert
          >

          <!-- Filters -->
          <div class="filters-row mb-5">
            <v-text-field
              v-model="searchQuery"
              placeholder="Search..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              rounded="lg"
              hide-details
              bg-color="white"
              style="max-width: 260px"
            />
            <v-select
              v-model="tbiFilter"
              :items="[{ id: '', name: 'All TBIs' }, ...tbiOptions]"
              item-title="name"
              item-value="id"
              variant="outlined"
              density="compact"
              rounded="lg"
              hide-details
              bg-color="white"
              style="max-width: 170px"
              @update:model-value="onTbiFilterChange"
            />
            <v-select
              v-model="statusFilter"
              :items="activeStatusItems"
              variant="outlined"
              density="compact"
              rounded="lg"
              hide-details
              bg-color="white"
              style="max-width: 150px"
            />
          </div>

          <!-- Data table -->
          <v-card rounded="xl" elevation="0" border>
            <v-data-table
              :headers="activeHeaders"
              :items="filteredRecords"
              :loading="activeTable.loading.value"
              :search="searchQuery"
              hover
              class="records-table"
            >
              <template #[`item.tbi_id`]="{ item }">
                <v-chip
                  :color="tbiChipColor(item.tbi_id)"
                  size="x-small"
                  variant="tonal"
                  class="font-weight-bold"
                  >{{ tbiShortName(item.tbi_id) }}</v-chip
                >
              </template>

              <template #[`item.status`]="{ item }">
                <v-chip
                  :color="statusChipColor(item.status)"
                  size="x-small"
                  variant="tonal"
                  class="font-weight-bold"
                  >{{ item.status }}</v-chip
                >
              </template>

              <template #[`item.thumb`]="{ item }">
                <v-avatar size="34" rounded="lg" color="#f5f7fb">
                  <v-img v-if="item.logo || item.image" :src="item.logo || item.image" cover />
                  <v-icon v-else icon="mdi-image-outline" size="16" color="#ccc" />
                </v-avatar>
              </template>

              <template #[`item.event_date`]="{ item }">
                {{ item.day }} {{ item.month }} {{ item.year }}
              </template>

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
                    icon="mdi-trash-can-outline"
                    size="x-small"
                    variant="text"
                    color="#C62828"
                    @click="openDeleteDialog(item)"
                  />
                </div>
              </template>

              <template #no-data>
                <div class="empty-state">
                  <v-icon :icon="activeCategoryIcon" size="52" color="#ddd" />
                  <p class="empty-title mt-3">No {{ activeCategoryName.toLowerCase() }} yet</p>
                  <p class="empty-sub">Click "Add {{ activeSingular }}" to get started.</p>
                  <v-btn
                    :color="activeCategoryBtnColor"
                    rounded="lg"
                    prepend-icon="mdi-plus"
                    elevation="0"
                    class="mt-4 add-btn"
                    @click="openAddDialog"
                    >Add {{ activeSingular }}</v-btn
                  >
                </div>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </div>
    </v-main>

    <!-- ══════════════════════════════════════════════════════════════════════ -->
    <!-- FORM DIALOG                                                           -->
    <!-- ══════════════════════════════════════════════════════════════════════ -->
    <v-dialog
      v-model="formDialog"
      :max-width="activeSection === 'incubatees' ? 780 : 720"
      :persistent="activeSection === 'incubatees'"
      scrollable
    >
      <v-card rounded="xl" elevation="0" class="form-card">
        <!-- ════════════ INCUBATEE WIZARD HEADER ════════════ -->
        <div v-if="activeSection === 'incubatees'" class="wizard-header">
          <div class="wizard-header-top">
            <div>
              <div class="fh-eyebrow">{{ isEditing ? 'Edit Incubatee' : 'Add New Incubatee' }}</div>
              <h3 class="fh-title">{{ wizardSteps[wizardStep].label }}</h3>
            </div>
            <v-btn
              icon="mdi-close"
              variant="text"
              color="white"
              size="small"
              @click="formDialog = false"
            />
          </div>
          <div class="wizard-progress mt-3">
            <div
              v-for="(step, i) in wizardSteps"
              :key="i"
              class="wizard-pip"
              :class="{
                'wizard-pip--done': i < wizardStep,
                'wizard-pip--active': i === wizardStep,
              }"
            />
          </div>
          <div class="wizard-step-label">
            Step {{ wizardStep + 1 }} of {{ wizardSteps.length }} —
            {{ wizardSteps[wizardStep].label }}
          </div>
        </div>

        <!-- ════════════ NEWS / EVENTS HEADER ════════════ -->
        <div v-else class="form-dialog-header" :style="{ background: activeCategoryColor }">
          <div>
            <div class="fh-eyebrow">{{ isEditing ? 'Edit' : 'Add New' }}</div>
            <h3 class="fh-title">{{ activeSingular }}</h3>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            size="small"
            @click="formDialog = false"
          />
        </div>

        <div v-if="formError" class="px-7 pt-4">
          <v-alert type="error" variant="tonal" rounded="lg" density="compact">{{
            formError
          }}</v-alert>
        </div>

        <!-- ════════════ INCUBATEE WIZARD BODY ════════════ -->
        <v-card-text v-if="activeSection === 'incubatees'" class="px-7 pt-5 pb-2">
          <v-form ref="formRef" @submit.prevent>
            <!-- STEP 0: Identity -->
            <template v-if="wizardStep === 0">
              <v-row>
                <v-col cols="12" sm="8">
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
                <v-col cols="12" sm="4">
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
                      'Business Services',
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
                    placeholder="e.g. Context-aware AI translation for every critical field."
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>

                <v-col cols="12" sm="4">
                  <div class="form-label">Year Founded</div>
                  <v-text-field
                    v-model="form.yearFounded"
                    placeholder="e.g. 2022"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="4">
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
                <v-col cols="12" sm="4">
                  <div class="form-label">Status</div>
                  <v-select
                    v-model="form.status"
                    :items="['active', 'draft', 'graduated', 'scaling']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
              </v-row>
            </template>

            <!-- STEP 2: About -->
            <template v-else-if="wizardStep === 1">
              <v-row>
                <v-col cols="12">
                  <div class="form-label">
                    Long Description *
                    <span class="hint-text">(first paragraph on About section)</span>
                  </div>
                  <v-textarea
                    v-model="form.descriptionLong"
                    placeholder="Detailed description of the startup..."
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">
                    Extra Description <span class="hint-text">(second paragraph)</span>
                  </div>
                  <v-textarea
                    v-model="form.descriptionExtra"
                    placeholder="Additional context..."
                    variant="outlined"
                    rounded="lg"
                    rows="3"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">The Problem</div>
                  <v-textarea
                    v-model="form.problem"
                    placeholder="What problem does this startup solve?"
                    variant="outlined"
                    rounded="lg"
                    rows="3"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">Our Solution</div>
                  <v-textarea
                    v-model="form.solution"
                    placeholder="How does the startup solve it?"
                    variant="outlined"
                    rounded="lg"
                    rows="3"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="tab-section-header">
                    <v-icon
                      icon="mdi-card-text-outline"
                      size="14"
                      color="#1565C0"
                      class="mr-1"
                    />Sidebar Detail Rows
                  </div>
                  <div v-for="(detail, i) in form.details" :key="i" class="sub-card mb-3">
                    <div class="sub-card-header">
                      <span class="sub-card-label">Row {{ i + 1 }}</span>
                      <v-btn
                        icon="mdi-trash-can-outline"
                        size="x-small"
                        variant="text"
                        color="#C62828"
                        @click="form.details.splice(i, 1)"
                      />
                    </div>
                    <v-row dense>
                      <v-col cols="5"
                        ><v-text-field
                          v-model="detail.label"
                          label="Label"
                          placeholder="e.g. Industry"
                          variant="outlined"
                          density="compact"
                          rounded="lg"
                          class="form-field"
                      /></v-col>
                      <v-col cols="7"
                        ><v-text-field
                          v-model="detail.value"
                          label="Value"
                          placeholder="e.g. Artificial Intelligence"
                          variant="outlined"
                          density="compact"
                          rounded="lg"
                          class="form-field"
                      /></v-col>
                    </v-row>
                  </div>
                  <v-btn
                    prepend-icon="mdi-plus"
                    size="small"
                    variant="tonal"
                    color="primary"
                    class="mt-1"
                    @click="
                      form.details.push({
                        label: '',
                        value: '',
                        icon: 'mdi-information-outline',
                        color: '#1565C0',
                      })
                    "
                  >
                    Add Detail Row
                  </v-btn>
                </v-col>
              </v-row>
            </template>

            <!-- STEP 3: Media — Logo + Gallery with upload buttons -->
            <template v-else-if="wizardStep === 2">
              <!-- Hidden file inputs -->
              <input
                ref="logoFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="(e) => handleFileUpload(e, 'logo')"
              />
              <input
                ref="galleryFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="(e) => handleGalleryUpload(e, pendingGalleryIndex)"
              />

              <!-- Current Uploads Summary -->
              <div v-if="currentUploads.length > 0" class="mb-6">
                <div class="tab-section-header">
                  <v-icon
                    icon="mdi-image-multiple-outline"
                    size="14"
                    color="#1565C0"
                    class="mr-1"
                  />
                  Current Uploads
                </div>
                <div class="current-uploads-grid">
                  <div
                    v-for="upload in currentUploads"
                    :key="upload.key"
                    class="current-upload-item"
                  >
                    <v-img :src="upload.url" height="60" width="60" cover class="rounded" />
                    <div class="current-upload-info">
                      <div class="current-upload-label">{{ upload.label }}</div>
                      <v-btn
                        icon="mdi-delete-outline"
                        size="x-small"
                        variant="text"
                        color="#C62828"
                        @click="removeUpload(upload.key)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <v-row>
                <!-- Logo upload -->
                <v-col cols="12" sm="6">
                  <div class="form-label">Logo Image</div>
                  <div class="upload-box" @click="$refs.logoFileInput.click()">
                    <template v-if="form.logoPreview || form.logo">
                      <v-img
                        :src="form.logoPreview || form.logo"
                        height="100"
                        contain
                        class="rounded-lg"
                      />
                      <div class="upload-box-overlay">
                        <v-icon icon="mdi-camera" size="20" color="white" />
                        <span>Change Photo</span>
                      </div>
                    </template>
                    <template v-else>
                      <v-icon icon="mdi-image-plus-outline" size="36" color="#1565C0" />
                      <div class="upload-box-label">Click to upload logo</div>
                      <div class="upload-box-hint">PNG, JPG, WEBP — max 5MB</div>
                    </template>
                  </div>
                  <v-progress-linear
                    v-if="uploadProgress.logo"
                    :model-value="uploadProgress.logo"
                    color="primary"
                    rounded
                    height="4"
                    class="mt-2"
                  />
                </v-col>

                <!-- Gallery uploads -->
                <v-col cols="12">
                  <div class="tab-section-header mt-2">
                    <v-icon
                      icon="mdi-image-multiple-outline"
                      size="14"
                      color="#1565C0"
                      class="mr-1"
                    />Gallery — up to 5 images with captions
                  </div>
                </v-col>

                <v-col v-for="gi in 5" :key="gi" cols="12" sm="6">
                  <div class="sub-card">
                    <div class="sub-card-header">
                      <span class="sub-card-label">Gallery Image {{ gi }}</span>
                    </div>

                    <!-- Gallery upload box -->
                    <div class="upload-box upload-box--sm" @click="openGalleryUpload(gi - 1)">
                      <template v-if="form.galleryPreviews[gi - 1] || form.gallery[gi - 1]">
                        <v-img
                          :src="form.galleryPreviews[gi - 1] || form.gallery[gi - 1]"
                          height="80"
                          cover
                          class="rounded-lg"
                        />
                        <div class="upload-box-overlay">
                          <v-icon icon="mdi-camera" size="16" color="white" />
                          <span>Change</span>
                        </div>
                      </template>
                      <template v-else>
                        <v-icon icon="mdi-image-plus-outline" size="28" color="#aaa" />
                        <div class="upload-box-label upload-box-label--sm">Upload image</div>
                      </template>
                    </div>

                    <v-progress-linear
                      v-if="uploadProgress[`gallery_${gi - 1}`]"
                      :model-value="uploadProgress[`gallery_${gi - 1}`]"
                      color="primary"
                      rounded
                      height="3"
                      class="my-1"
                    />

                    <div class="form-label mt-2">Caption</div>
                    <v-text-field
                      v-model="form.galleryCaptions[gi - 1]"
                      :placeholder="`Caption for image ${gi}`"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </div>
                </v-col>
              </v-row>
            </template>

            <!-- STEP 4: Achievements — with upload button for photo -->
            <template v-else-if="wizardStep === 3">
              <!-- Hidden file input for achievement photos -->
              <input
                ref="achievementFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="(e) => handleAchievementPhotoUpload(e, pendingAchievementIndex)"
              />

              <!-- Achievement Photos Summary -->
              <div v-if="achievementPhotos.length > 0" class="mb-6">
                <div class="tab-section-header">
                  <v-icon icon="mdi-image-outline" size="14" color="#1565C0" class="mr-1" />
                  Achievement Photos
                </div>
                <div class="current-uploads-grid">
                  <div
                    v-for="photo in achievementPhotos"
                    :key="photo.key"
                    class="current-upload-item"
                  >
                    <v-img :src="photo.url" height="60" width="60" cover class="rounded" />
                    <div class="current-upload-info">
                      <div class="current-upload-label">{{ photo.label }}</div>
                      <v-btn
                        icon="mdi-delete-outline"
                        size="x-small"
                        variant="text"
                        color="#C62828"
                        @click="removeAchievementPhoto(photo.index)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="form.achievements.length === 0" class="empty-tab-state">
                <v-icon icon="mdi-flag-checkered" size="44" color="#ddd" />
                <p class="empty-tab-text">No achievements yet.</p>
              </div>
              <div v-for="(ach, i) in form.achievements" :key="i" class="sub-card mb-4">
                <div class="sub-card-header">
                  <span class="sub-card-label">Achievement {{ i + 1 }}</span>
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="x-small"
                    variant="text"
                    color="#C62828"
                    @click="form.achievements.splice(i, 1)"
                  />
                </div>
                <v-row dense>
                  <v-col cols="12" sm="8">
                    <div class="form-label">Title *</div>
                    <v-text-field
                      v-model="ach.title"
                      placeholder="e.g. DICT Startup Grant Recipient"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="form-label">Year</div>
                    <v-text-field
                      v-model="ach.year"
                      placeholder="e.g. 2023"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Category</div>
                    <v-select
                      v-model="ach.category"
                      :items="['Funding', 'Award', 'Partnership', 'Deployment', 'Other']"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <!-- Achievement Photo Upload -->
                  <v-col cols="12" sm="6">
                    <div class="form-label">Photo</div>
                    <div class="upload-box upload-box--xs" @click="openAchievementUpload(i)">
                      <template v-if="ach.photoPreview || ach.photo">
                        <v-img
                          :src="ach.photoPreview || ach.photo"
                          height="60"
                          cover
                          class="rounded-lg"
                        />
                        <div class="upload-box-overlay">
                          <v-icon icon="mdi-camera" size="14" color="white" />
                          <span>Change</span>
                        </div>
                      </template>
                      <template v-else>
                        <v-icon icon="mdi-image-plus-outline" size="22" color="#aaa" />
                        <div class="upload-box-label upload-box-label--sm">Upload photo</div>
                      </template>
                    </div>
                    <v-progress-linear
                      v-if="uploadProgress[`achievement_${i}`]"
                      :model-value="uploadProgress[`achievement_${i}`]"
                      color="primary"
                      rounded
                      height="3"
                      class="mt-1"
                    />
                  </v-col>
                  <v-col cols="12">
                    <div class="form-label">Description</div>
                    <v-textarea
                      v-model="ach.desc"
                      placeholder="Brief description..."
                      variant="outlined"
                      rounded="lg"
                      rows="2"
                      class="form-field"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-btn
                prepend-icon="mdi-plus"
                size="small"
                variant="tonal"
                color="primary"
                @click="
                  form.achievements.push({
                    title: '',
                    desc: '',
                    photo: '',
                    photoPreview: null,
                    year: '',
                    category: 'Milestone',
                    icon: 'mdi-flag-checkered',
                    color: '#2E7D32',
                  })
                "
                >Add Achievement</v-btn
              >
            </template>

            <!-- STEP 5: Partners (was step 7, now step 5 after removing Awards + Funding) -->
            <template v-else-if="wizardStep === 4">
              <div v-if="form.partners.length === 0" class="empty-tab-state">
                <v-icon icon="mdi-handshake-outline" size="44" color="#ddd" />
                <p class="empty-tab-text">No partners yet.</p>
              </div>
              <div v-for="(partner, i) in form.partners" :key="i" class="sub-card mb-4">
                <div class="sub-card-header">
                  <span class="sub-card-label">Partner {{ i + 1 }}</span>
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="x-small"
                    variant="text"
                    color="#C62828"
                    @click="form.partners.splice(i, 1)"
                  />
                </div>
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Partner Name *</div>
                    <v-text-field
                      v-model="partner.name"
                      placeholder="e.g. DICT Philippines"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Partner Type</div>
                    <v-select
                      v-model="partner.type"
                      :items="[
                        'Government Agency',
                        'Academic Institution',
                        'Industry Partner',
                        'Research & Technology',
                        'Local Government Unit',
                        'Startup Ecosystem',
                        'NGO',
                        'Other',
                      ]"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-btn
                prepend-icon="mdi-plus"
                size="small"
                variant="tonal"
                color="primary"
                @click="
                  form.partners.push({
                    name: '',
                    type: 'Government Agency',
                    icon: 'mdi-handshake-outline',
                    color: '#1565C0',
                    logoBg: '#E3F2FD',
                    chipLabel: '',
                    chipColor: 'primary',
                  })
                "
                >Add Partner</v-btn
              >
            </template>

            <!-- STEP 6: Team — with photo upload button -->
            <template v-else-if="wizardStep === 5">
              <!-- Hidden file input for team member photos -->
              <input
                ref="teamFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="(e) => handleTeamPhotoUpload(e, pendingTeamIndex)"
              />

              <div v-if="form.team.length === 0" class="empty-tab-state">
                <v-icon icon="mdi-account-group-outline" size="44" color="#ddd" />
                <p class="empty-tab-text">No team members yet.</p>
              </div>
              <div v-for="(member, i) in form.team" :key="i" class="sub-card mb-4">
                <div class="sub-card-header">
                  <span class="sub-card-label">Member {{ i + 1 }}</span>
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="x-small"
                    variant="text"
                    color="#C62828"
                    @click="form.team.splice(i, 1)"
                  />
                </div>
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Full Name *</div>
                    <v-text-field
                      v-model="member.name"
                      placeholder="e.g. Juan dela Cruz"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Role / Title</div>
                    <v-text-field
                      v-model="member.role"
                      placeholder="e.g. CEO & Co-Founder"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <!-- Team Photo Upload -->
                  <v-col cols="12" sm="4">
                    <div class="form-label">Photo</div>
                    <div class="upload-box upload-box--avatar" @click="openTeamUpload(i)">
                      <template v-if="member.photoPreview || member.photo">
                        <v-img
                          :src="member.photoPreview || member.photo"
                          height="80"
                          width="80"
                          cover
                          class="rounded-circle"
                          style="border-radius: 50% !important"
                        />
                        <div class="upload-box-overlay upload-box-overlay--circle">
                          <v-icon icon="mdi-camera" size="16" color="white" />
                        </div>
                      </template>
                      <template v-else>
                        <v-icon icon="mdi-account-plus-outline" size="28" color="#aaa" />
                        <div class="upload-box-label upload-box-label--sm">Upload photo</div>
                      </template>
                    </div>
                    <v-progress-linear
                      v-if="uploadProgress[`team_${i}`]"
                      :model-value="uploadProgress[`team_${i}`]"
                      color="primary"
                      rounded
                      height="3"
                      class="mt-1"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="form-label">LinkedIn URL</div>
                    <v-text-field
                      v-model="member.linkedin"
                      placeholder="https://linkedin.com/in/..."
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div class="form-label">Email</div>
                    <v-text-field
                      v-model="member.email"
                      placeholder="member@startup.com"
                      type="email"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-btn
                prepend-icon="mdi-plus"
                size="small"
                variant="tonal"
                color="teal"
                @click="
                  form.team.push({
                    name: '',
                    role: '',
                    photo: null,
                    photoPreview: null,
                    linkedin: '#',
                    email: null,
                  })
                "
                >Add Team Member</v-btn
              >
            </template>

            <!-- STEP 7: Testimonials — with photo upload button -->
            <template v-else-if="wizardStep === 6">
              <!-- Hidden file input for testimonial photos -->
              <input
                ref="testimonialFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="(e) => handleTestimonialPhotoUpload(e, pendingTestimonialIndex)"
              />

              <div v-if="form.testimonials.length === 0" class="empty-tab-state">
                <v-icon icon="mdi-comment-quote-outline" size="44" color="#ddd" />
                <p class="empty-tab-text">No testimonials yet.</p>
              </div>
              <div v-for="(t, i) in form.testimonials" :key="i" class="sub-card mb-4">
                <div class="sub-card-header">
                  <span class="sub-card-label">Testimonial {{ i + 1 }}</span>
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="x-small"
                    variant="text"
                    color="#C62828"
                    @click="form.testimonials.splice(i, 1)"
                  />
                </div>
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Name *</div>
                    <v-text-field
                      v-model="t.name"
                      placeholder="e.g. Juan dela Cruz"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="form-label">Role</div>
                    <v-text-field
                      v-model="t.role"
                      placeholder="e.g. CEO, Ascribo AI"
                      variant="outlined"
                      density="compact"
                      rounded="lg"
                      class="form-field"
                    />
                  </v-col>
                  <!-- Testimonial Photo Upload -->
                  <v-col cols="12" sm="4">
                    <div class="form-label">Photo</div>
                    <div class="upload-box upload-box--avatar" @click="openTestimonialUpload(i)">
                      <template v-if="t.photoPreview || t.photo">
                        <v-img
                          :src="t.photoPreview || t.photo"
                          height="80"
                          width="80"
                          cover
                          style="border-radius: 50% !important"
                        />
                        <div class="upload-box-overlay upload-box-overlay--circle">
                          <v-icon icon="mdi-camera" size="16" color="white" />
                        </div>
                      </template>
                      <template v-else>
                        <v-icon icon="mdi-account-plus-outline" size="28" color="#aaa" />
                        <div class="upload-box-label upload-box-label--sm">Upload photo</div>
                      </template>
                    </div>
                    <v-progress-linear
                      v-if="uploadProgress[`testimonial_${i}`]"
                      :model-value="uploadProgress[`testimonial_${i}`]"
                      color="secondary"
                      rounded
                      height="3"
                      class="mt-1"
                    />
                  </v-col>
                  <v-col cols="12">
                    <div class="form-label">Quote *</div>
                    <v-textarea
                      v-model="t.quote"
                      placeholder="Their success statement about the TBI..."
                      variant="outlined"
                      rounded="lg"
                      rows="3"
                      class="form-field"
                    />
                  </v-col>
                </v-row>
              </div>
              <v-btn
                prepend-icon="mdi-plus"
                size="small"
                variant="tonal"
                color="secondary"
                @click="
                  form.testimonials.push({
                    name: '',
                    role: '',
                    photo: null,
                    photoPreview: null,
                    quote: '',
                  })
                "
                >Add Testimonial</v-btn
              >
            </template>
          </v-form>
        </v-card-text>

        <!-- Wizard footer -->
        <template v-if="activeSection === 'incubatees'">
          <v-divider />
          <div class="wizard-footer">
            <v-btn
              v-if="wizardStep > 0"
              variant="outlined"
              rounded="lg"
              prepend-icon="mdi-arrow-left"
              @click="wizardStep--"
              >Back</v-btn
            >
            <v-btn v-else variant="outlined" rounded="lg" @click="formDialog = false">Cancel</v-btn>
            <div class="d-flex align-center" style="gap: 8px">
              <span class="wizard-count">{{ wizardStep + 1 }} / {{ wizardSteps.length }}</span>
              <v-btn
                v-if="wizardStep < wizardSteps.length - 1"
                color="primary"
                rounded="lg"
                append-icon="mdi-arrow-right"
                elevation="0"
                @click="wizardNext"
                >Next</v-btn
              >
              <v-btn
                v-else
                color="primary"
                rounded="lg"
                :loading="activeTable.saving.value"
                elevation="0"
                class="save-btn"
                @click="handleSubmit"
              >
                <v-icon icon="mdi-content-save-outline" size="16" class="mr-2" />
                {{ isEditing ? 'Save Changes' : 'Add Incubatee' }}
              </v-btn>
            </div>
          </div>
        </template>

        <!-- ════════════ NEWS / EVENTS FLAT BODY ════════════ -->
        <v-card-text v-else class="pa-7">
          <v-form ref="formRef" @submit.prevent="handleSubmit">
            <!-- NEWS FIELDS -->
            <template v-if="activeSection === 'news'">
              <input
                ref="newsImageFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleNewsImageUpload"
              />
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
                  <div class="form-label">Author</div>
                  <v-text-field
                    v-model="form.author"
                    placeholder="e.g. TBI Communications Team"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
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

                <v-col cols="12">
                  <div class="form-label">
                    Short Description * <span class="hint-text">(shown on card)</span>
                  </div>
                  <v-textarea
                    v-model="form.description"
                    placeholder="Brief summary..."
                    variant="outlined"
                    rounded="lg"
                    rows="2"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">
                    Full Article Body <span class="hint-text">(shown in detail view)</span>
                  </div>
                  <v-textarea
                    v-model="form.full_description"
                    placeholder="Full article content..."
                    variant="outlined"
                    rounded="lg"
                    rows="5"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">
                    Tags <span class="hint-text">(comma-separated)</span>
                  </div>
                  <v-text-field
                    v-model="form.tags_raw_news"
                    placeholder="e.g. Funding, DICT"
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
                    :items="['active', 'draft']"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6" class="d-flex align-center">
                  <v-switch
                    v-model="form.featured"
                    label="Mark as Featured Story"
                    color="success"
                    hide-details
                    density="compact"
                  />
                </v-col>

                <v-col cols="12">
                  <div class="form-label d-flex align-center mb-2" style="gap: 8px">
                    <v-icon icon="mdi-image-outline" size="14" color="#1565C0" class="mr-1" />
                    News Cover Image
                  </div>
                  <div
                    class="upload-box upload-box--event-banner"
                    @click="$refs.newsImageFileInput.click()"
                  >
                    <template v-if="form.newsImagePreview || form.image">
                      <v-img
                        :src="form.newsImagePreview || form.image"
                        cover
                        class="upload-box-preview"
                        height="190"
                      />
                      <div class="upload-box-overlay">
                        <v-icon icon="mdi-camera-flip-outline" size="20" color="white" />
                      </div>
                    </template>
                    <template v-else>
                      <v-icon icon="mdi-image-plus-outline" size="40" color="#1565C0" />
                      <div class="upload-box-label">Click to upload cover image</div>
                      <div class="upload-box-hint">
                        PNG, JPG, WEBP — max 5MB · Recommended: 1200x630
                      </div>
                    </template>
                  </div>
                  <v-progress-linear
                    v-if="uploadProgress.news_image"
                    :model-value="uploadProgress.news_image"
                    color="primary"
                    rounded
                    height="4"
                    class="mt-2"
                  />
                  <v-btn
                    v-if="form.newsImagePreview || form.image"
                    size="x-small"
                    variant="tonal"
                    color="error"
                    class="mt-2"
                    prepend-icon="mdi-trash-can-outline"
                    @click="clearNewsImage"
                  >
                    Remove Image
                  </v-btn>
                </v-col>
              </v-row>
            </template>

            <!-- EVENTS FIELDS -->
            <template v-else-if="activeSection === 'events'">
              <!-- Hidden file input for event banner image -->
              <input
                ref="eventImageFileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="handleEventImageUpload"
              />
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
                  <div class="form-label">Venue / Location *</div>
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
                <v-col cols="12" sm="4">
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
                <v-col cols="12" sm="4">
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
                <v-col cols="12" sm="4">
                  <div class="form-label">Registered Count</div>
                  <v-text-field
                    v-model="form.registered"
                    placeholder="e.g. 60"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">
                    Short Description * <span class="hint-text">(shown on card)</span>
                  </div>
                  <v-textarea
                    v-model="form.description_event"
                    placeholder="Brief summary..."
                    variant="outlined"
                    rounded="lg"
                    rows="2"
                    :rules="[(r) => !!r || 'Required']"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12">
                  <div class="form-label">
                    Full Event Details <span class="hint-text">(shown in detail dialog)</span>
                  </div>
                  <v-textarea
                    v-model="form.full_description_event"
                    placeholder="Complete event information..."
                    variant="outlined"
                    rounded="lg"
                    rows="4"
                    class="form-field"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="form-label">
                    Tags <span class="hint-text">(comma-separated)</span>
                  </div>
                  <v-text-field
                    v-model="form.tags_raw_event"
                    placeholder="e.g. Workshop, DOST"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    class="form-field"
                  />
                </v-col>

                <!-- ── EVENT BANNER IMAGE UPLOAD ── -->
                <v-col cols="12">
                  <div class="tab-section-header">
                    <v-icon icon="mdi-image-outline" size="14" color="#E65100" class="mr-1" />
                    Event Banner Image
                    <span class="hint-text ml-2"
                      >— displayed on the events page card and spotlight</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" sm="8">
                  <div
                    class="upload-box upload-box--event-banner"
                    @click="$refs.eventImageFileInput.click()"
                  >
                    <template v-if="form.eventImagePreview || form.image_event">
                      <v-img
                        :src="form.eventImagePreview || form.image_event"
                        height="160"
                        cover
                        class="rounded-lg"
                      />
                      <div class="upload-box-overlay">
                        <v-icon icon="mdi-camera" size="22" color="white" />
                        <span>Change Banner</span>
                      </div>
                    </template>
                    <template v-else>
                      <v-icon icon="mdi-image-plus-outline" size="40" color="#E65100" />
                      <div class="upload-box-label" style="color: #e65100">
                        Click to upload event banner
                      </div>
                      <div class="upload-box-hint">
                        PNG, JPG, WEBP — max 5MB · Recommended: 1200×630
                      </div>
                    </template>
                  </div>
                  <v-progress-linear
                    v-if="uploadProgress.event_image"
                    :model-value="uploadProgress.event_image"
                    color="warning"
                    rounded
                    height="4"
                    class="mt-2"
                  />
                  <v-btn
                    v-if="form.eventImagePreview || form.image_event"
                    size="x-small"
                    variant="tonal"
                    color="error"
                    class="mt-2"
                    prepend-icon="mdi-trash-can-outline"
                    @click="clearEventImage"
                    >Remove Image</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="4" class="d-flex align-center">
                  <div class="event-image-tip">
                    <v-icon icon="mdi-information-outline" size="16" color="#888" class="mb-1" />
                    <p class="tip-text">
                      This image appears as the card background on the Events page and in the Next
                      Event spotlight banner.
                    </p>
                  </div>
                </v-col>
              </v-row>
            </template>

            <v-divider class="my-5" />
            <div class="d-flex justify-end" style="gap: 10px">
              <v-btn variant="outlined" rounded="lg" @click="formDialog = false">Cancel</v-btn>
              <v-btn
                type="submit"
                :color="activeCategoryBtnColor"
                rounded="lg"
                :loading="activeTable.saving.value"
                elevation="0"
                class="save-btn"
              >
                <v-icon icon="mdi-content-save-outline" size="16" class="mr-2" />
                {{ isEditing ? 'Save Changes' : `Add ${activeSingular}` }}
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- PUBLISH DESTINATION CONFIRM -->
    <v-dialog v-model="publishDialog" max-width="520">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="d-flex align-start" style="gap: 12px">
          <v-avatar size="42" :color="activeCategoryColor + '20'">
            <v-icon :icon="activeCategoryIcon" :color="activeCategoryColor" />
          </v-avatar>
          <div>
            <h3 class="dialog-title">Confirm Publish Destination</h3>
            <p class="dialog-sub mt-1">
              Choose where this {{ activeSingular.toLowerCase() }} will be published before saving.
            </p>
          </div>
        </div>

        <div class="mt-5">
          <div class="form-label mb-2">Content Type</div>
          <v-text-field
            :model-value="activeCategoryName"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            readonly
            hide-details
            class="form-field mb-4"
          />

          <div class="form-label mb-2">Publish To TBI Portal *</div>
          <v-select
            v-model="publishDestination"
            :items="tbiOptions"
            item-title="name"
            item-value="id"
            placeholder="Select destination portal"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            :error="!!publishError"
            :error-messages="publishError"
            class="form-field"
          />
        </div>

        <v-row dense class="mt-2">
          <v-col cols="6">
            <v-btn block variant="outlined" rounded="lg" @click="publishDialog = false"
              >Cancel</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              :color="activeCategoryBtnColor"
              rounded="lg"
              elevation="0"
              :loading="activeTable.saving.value"
              @click="confirmPublishSubmit"
            >
              Confirm & Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <!-- DELETE CONFIRM -->
    <v-dialog v-model="deleteDialog" max-width="380">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="text-center mb-5">
          <v-icon icon="mdi-trash-can-outline" size="40" color="#C62828" />
          <h3 class="dialog-title mt-3">Delete {{ activeSingular }}?</h3>
          <p class="dialog-sub mt-2">
            <strong>{{ deleteTarget?.name || deleteTarget?.title }}</strong> will be permanently
            removed.
          </p>
        </div>
        <v-row dense>
          <v-col cols="6">
            <v-btn block variant="outlined" rounded="lg" @click="deleteDialog = false"
              >Cancel</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="error"
              rounded="lg"
              :loading="activeTable.deleting.value"
              @click="confirmDelete"
              >Delete</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <!-- LOGOUT CONFIRM -->
    <v-dialog v-model="logoutDialog" max-width="360">
      <v-card rounded="xl" class="pa-6" elevation="0" border>
        <div class="text-center mb-5">
          <v-icon icon="mdi-logout" size="40" color="#C62828" />
          <h3 class="dialog-title mt-3">Sign Out?</h3>
          <p class="dialog-sub mt-2">You will be returned to the login page.</p>
        </div>
        <v-row dense>
          <v-col cols="6">
            <v-btn block variant="outlined" rounded="lg" @click="logoutDialog = false"
              >Cancel</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn block color="error" rounded="lg" @click="confirmLogout">Sign Out</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, supabase } from '@/utils/supabase'
import { useAdminTable } from '@/composables/useAdminTable'

const router = useRouter()

// ── UI state ──────────────────────────────────────────────────────────────────
const sidebarOpen = ref(true)
const sidebarRail = ref(false)
const activeSection = ref('home')
const currentUser = ref(null)
const logoutDialog = ref(false)

// ── Supabase tables ───────────────────────────────────────────────────────────
const incubateesTable = useAdminTable('incubatees')
const newsTable = useAdminTable('news')
const eventsTable = useAdminTable('events')

const tableMap = {
  incubatees: incubateesTable,
  news: newsTable,
  events: eventsTable,
}
const activeTable = computed(() => tableMap[activeSection.value] || incubateesTable)

// ── Static config ─────────────────────────────────────────────────────────────
const tbiOptions = [
  {
    id: 'navigatu',
    name: 'Navigatú TBI',
    shortName: 'NAV',
    color: '#1565C0',
    sub: 'Technology Business Incubator',
  },
  {
    id: 'tara',
    name: 'TARA ATBI',
    shortName: 'TARA',
    color: '#2E7D32',
    sub: 'Agri Technology Business Incubator',
  },
  {
    id: 'csutbi',
    name: 'CSU TBI',
    shortName: 'CSU',
    color: '#B71C1C',
    sub: 'Caraga State University TBI',
  },
]

const categories = [
  {
    id: 'incubatees',
    name: 'Incubatees',
    singular: 'Incubatee',
    icon: 'mdi-rocket-launch-outline',
    color: '#1565C0',
    btnColor: 'primary',
    desc: 'Add, edit, and manage startup incubatees. Assign each to the TBI where it belongs.',
  },
  {
    id: 'news',
    name: 'News',
    singular: 'News Article',
    icon: 'mdi-newspaper-variant-outline',
    color: '#2E7D32',
    btnColor: 'success',
    desc: 'Publish news and announcements. Choose which TBI portal shows the article.',
  },
  {
    id: 'events',
    name: 'Events',
    singular: 'Event',
    icon: 'mdi-calendar-star-outline',
    color: '#E65100',
    btnColor: 'warning',
    desc: 'Create events and assign them to the correct TBI portal for display.',
  },
]

// ── Computed active category meta ─────────────────────────────────────────────
const activeCategory = computed(() => categories.find((c) => c.id === activeSection.value))
const activeCategoryName = computed(() => activeCategory.value?.name || 'Dashboard')
const activeSingular = computed(() => activeCategory.value?.singular || '')
const activeCategoryIcon = computed(
  () => activeCategory.value?.icon || 'mdi-view-dashboard-outline',
)
const activeCategoryColor = computed(() => activeCategory.value?.color || '#1565C0')
const activeCategoryBtnColor = computed(() => activeCategory.value?.btnColor || 'primary')
const appBarTitle = computed(() =>
  activeSection.value === 'home' ? 'Dashboard' : activeCategoryName.value,
)

// ── Dashboard stats ───────────────────────────────────────────────────────────
const dashStats = computed(() => [
  {
    label: 'Total Incubatees',
    value: incubateesTable.records.value.length || '—',
    icon: 'mdi-rocket-launch-outline',
    color: '#1565C0',
    iconBg: '#E3F2FD',
    section: 'incubatees',
  },
  {
    label: 'Published News',
    value: newsTable.records.value.filter((n) => n.status === 'active').length || '—',
    icon: 'mdi-newspaper-variant-outline',
    color: '#2E7D32',
    iconBg: '#E8F5E9',
    section: 'news',
  },
  {
    label: 'Upcoming Events',
    value: eventsTable.records.value.filter((e) => e.status === 'upcoming').length || '—',
    icon: 'mdi-calendar-star-outline',
    color: '#E65100',
    iconBg: '#FFF3E0',
    section: 'events',
  },
  {
    label: 'TBI Portals',
    value: tbiOptions.length,
    icon: 'mdi-office-building-outline',
    color: '#6A1B9A',
    iconBg: '#EDE7F6',
    section: null,
  },
])

const todayLabel = computed(() =>
  new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

// ── Filters ───────────────────────────────────────────────────────────────────
const searchQuery = ref('')
const tbiFilter = ref('')
const statusFilter = ref('All')

const activeStatusItems = computed(() => {
  if (activeSection.value === 'events') return ['All', 'upcoming', 'past', 'draft']
  if (activeSection.value === 'incubatees') return ['All', 'active', 'draft', 'graduated']
  return ['All', 'active', 'draft']
})

const filteredRecords = computed(() => {
  let list = activeTable.value.records.value
  if (statusFilter.value !== 'All') list = list.filter((r) => r.status === statusFilter.value)
  return list
})

// ── Table headers ─────────────────────────────────────────────────────────────
const activeHeaders = computed(() => {
  if (activeSection.value === 'incubatees')
    return [
      { title: '', key: 'thumb', sortable: false, width: '52px' },
      { title: 'Startup Name', key: 'name', sortable: true },
      { title: 'TBI', key: 'tbi_id', sortable: true },
      { title: 'Category', key: 'category', sortable: true },
      { title: 'Location', key: 'location', sortable: false },
      { title: 'Year', key: 'year_founded', sortable: true },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  if (activeSection.value === 'news')
    return [
      { title: '', key: 'thumb', sortable: false, width: '52px' },
      { title: 'Title', key: 'title', sortable: true },
      { title: 'TBI', key: 'tbi_id', sortable: true },
      { title: 'Category', key: 'category', sortable: true },
      { title: 'Date', key: 'date', sortable: true },
      { title: 'Author', key: 'author', sortable: false },
      { title: 'Status', key: 'status', sortable: true },
      { title: 'Actions', key: 'actions', sortable: false },
    ]
  return [
    { title: '', key: 'thumb', sortable: false, width: '52px' },
    { title: 'Title', key: 'title', sortable: true },
    { title: 'TBI', key: 'tbi_id', sortable: true },
    { title: 'Type', key: 'type', sortable: true },
    { title: 'Date', key: 'event_date', sortable: false },
    { title: 'Location', key: 'location', sortable: false },
    { title: 'Status', key: 'status', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
  ]
})

// ── Current uploads summary for Media step ──────────────────────────────────
const currentUploads = computed(() => {
  const uploads = []
  if (form.logo) {
    uploads.push({ key: 'logo', url: form.logo, label: 'Logo' })
  }
  form.gallery.forEach((url, index) => {
    if (url) {
      uploads.push({ key: `gallery_${index}`, url, label: `Gallery ${index + 1}` })
    }
  })
  return uploads
})

function removeUpload(key) {
  if (key === 'logo') {
    form.logo = ''
    form.logoPreview = null
  } else if (key.startsWith('gallery_')) {
    const index = parseInt(key.split('_')[1])
    form.gallery[index] = ''
    form.galleryPreviews[index] = null
  }
}

// ── Achievement photos summary ───────────────────────────────────────────────
const achievementPhotos = computed(() => {
  return form.achievements
    .map((ach, index) => {
      if (ach.photo) {
        return {
          key: `achievement_${index}`,
          url: ach.photo,
          label: ach.title || `Achievement ${index + 1}`,
          index,
        }
      }
      return null
    })
    .filter(Boolean)
})

function removeAchievementPhoto(index) {
  form.achievements[index].photo = ''
  form.achievements[index].photoPreview = null
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const tbiShortName = (id) => tbiOptions.find((t) => t.id === id)?.shortName || id
const tbiChipColor = (id) =>
  ({ navigatu: 'primary', tara: 'success', csutbi: 'error' })[id] || 'default'
const statusChipColor = (s) =>
  ({
    active: 'success',
    draft: 'warning',
    graduated: 'info',
    upcoming: 'success',
    past: 'secondary',
  })[s] || 'default'

// ── Section switching ─────────────────────────────────────────────────────────
function setSection(sectionId, preselectedTbi = '') {
  activeSection.value = sectionId
  searchQuery.value = ''
  statusFilter.value = 'All'
  tbiFilter.value = preselectedTbi
  if (sectionId !== 'home') {
    const table = tableMap[sectionId]
    if (table && table.records.value.length === 0) {
      table.fetchAll(preselectedTbi || null)
    } else if (preselectedTbi) {
      table?.fetchAll(preselectedTbi)
    }
  }
}

function onTbiFilterChange(val) {
  activeTable.value.fetchAll(val || null)
}

// ── Upload state ──────────────────────────────────────────────────────────────
const uploadProgress = reactive({})
const pendingGalleryIndex = ref(0)
const pendingAchievementIndex = ref(0)
const pendingTeamIndex = ref(0)
const pendingTestimonialIndex = ref(0)

// File input refs
const logoFileInput = ref(null)
const galleryFileInput = ref(null)
const achievementFileInput = ref(null)
const teamFileInput = ref(null)
const testimonialFileInput = ref(null)
const eventImageFileInput = ref(null)
const newsImageFileInput = ref(null)

/**
 * Upload a file to Supabase Storage and return its public URL.
 * @param {File} file - The File object from the input
 * @param {string} bucket - The Supabase storage bucket name (e.g. 'incubatees')
 * @param {string} folder - Sub-folder path (e.g. 'logos', 'gallery', 'team')
 * @param {string} progressKey - Key to track upload progress in uploadProgress reactive object
 * @returns {Promise<string|null>} Public URL of uploaded file, or null on error
 */
async function uploadToSupabase(file, bucket, folder, progressKey) {
  if (!file) return null

  // Validate file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    formError.value = `File "${file.name}" exceeds 5MB limit.`
    return null
  }

  // Build a unique file path: folder/timestamp_originalname
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
  const filePath = `${folder}/${fileName}`

  // Simulate progress (Supabase JS v2 doesn't expose upload progress natively)
  uploadProgress[progressKey] = 10

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (error) {
    console.error('Supabase upload error:', error)
    const policyHint =
      error.message?.toLowerCase().includes('row-level security') ||
      error.message?.toLowerCase().includes('not allowed')
        ? ' Check your Supabase Storage bucket policies for INSERT access.'
        : ''
    formError.value = `Upload failed: ${error.message}${policyHint}`
    uploadProgress[progressKey] = 0
    return null
  }

  uploadProgress[progressKey] = 90

  // Get the public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

  uploadProgress[progressKey] = 100
  setTimeout(() => {
    uploadProgress[progressKey] = 0
  }, 1200)

  return urlData?.publicUrl || null
}

// ── Logo upload handler ───────────────────────────────────────────────────────
async function handleFileUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  // Show local preview immediately
  form.logoPreview = URL.createObjectURL(file)
  // Upload to Supabase Storage
  const url = await uploadToSupabase(file, 'incubatees', 'logos', 'logo')
  if (url) form.logo = url
  event.target.value = ''
}

// ── Gallery upload handlers ───────────────────────────────────────────────────
function openGalleryUpload(index) {
  pendingGalleryIndex.value = index
  galleryFileInput.value?.click()
}

async function handleGalleryUpload(event, index) {
  const file = event.target.files?.[0]
  if (!file) return
  // Local preview
  form.galleryPreviews[index] = URL.createObjectURL(file)
  // Upload
  const key = `gallery_${index}`
  const url = await uploadToSupabase(file, 'incubatees', 'gallery', key)
  if (url) form.gallery[index] = url
  event.target.value = ''
}

// ── Achievement photo upload handlers ─────────────────────────────────────────
function openAchievementUpload(index) {
  pendingAchievementIndex.value = index
  achievementFileInput.value?.click()
}

async function handleAchievementPhotoUpload(event, index) {
  const file = event.target.files?.[0]
  if (!file) return
  form.achievements[index].photoPreview = URL.createObjectURL(file)
  const key = `achievement_${index}`
  const url = await uploadToSupabase(file, 'incubatees', 'achievements', key)
  if (url) form.achievements[index].photo = url
  event.target.value = ''
}

// ── Team photo upload handlers ────────────────────────────────────────────────
function openTeamUpload(index) {
  pendingTeamIndex.value = index
  teamFileInput.value?.click()
}

async function handleTeamPhotoUpload(event, index) {
  const file = event.target.files?.[0]
  if (!file) return
  form.team[index].photoPreview = URL.createObjectURL(file)
  const key = `team_${index}`
  const url = await uploadToSupabase(file, 'incubatees', 'team', key)
  if (url) form.team[index].photo = url
  event.target.value = ''
}

// ── Testimonial photo upload handlers ────────────────────────────────────────
function openTestimonialUpload(index) {
  pendingTestimonialIndex.value = index
  testimonialFileInput.value?.click()
}

async function handleTestimonialPhotoUpload(event, index) {
  const file = event.target.files?.[0]
  if (!file) return
  form.testimonials[index].photoPreview = URL.createObjectURL(file)
  const key = `testimonial_${index}`
  const url = await uploadToSupabase(file, 'incubatees', 'testimonials', key)
  if (url) form.testimonials[index].photo = url
  event.target.value = ''
}

// ── Event banner upload handler ────────────────────────────────────────────
async function handleEventImageUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  form.eventImagePreview = URL.createObjectURL(file)
  const url = await uploadToSupabase(file, 'events', 'banners', 'event_image')
  if (url) form.image_event = url
  event.target.value = ''
}

// ── News cover image upload handler ──────────────────────────────────────────
async function handleNewsImageUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  form.newsImagePreview = URL.createObjectURL(file)
  const url = await uploadToSupabase(file, 'news', 'covers', 'news_image')
  if (url) form.image = url
  event.target.value = ''
}

function clearNewsImage() {
  form.newsImagePreview = null
  form.image = ''
}

function clearEventImage() {
  form.eventImagePreview = null
  form.image_event = ''
}

// ── Form state ────────────────────────────────────────────────────────────────
const formDialog = ref(false)
const deleteDialog = ref(false)
const formRef = ref(null)
const isEditing = ref(false)
const editId = ref(null)
const deleteTarget = ref(null)
const formError = ref('')
const publishDialog = ref(false)
const publishDestination = ref('')
const publishError = ref('')

// ── Wizard state — 8 steps now (Awards + Funding removed) ────────────────────
const wizardStep = ref(0)
const wizardSteps = [
  { label: 'Identity', icon: 'mdi-card-account-details-outline' },
  { label: 'About', icon: 'mdi-text-box-outline' },
  { label: 'Media', icon: 'mdi-image-multiple-outline' },
  { label: 'Achievements', icon: 'mdi-flag-checkered' },
  { label: 'Partners', icon: 'mdi-handshake-outline' },
  { label: 'Team', icon: 'mdi-account-group-outline' },
  { label: 'Testimonials', icon: 'mdi-comment-quote-outline' },
]

async function wizardNext() {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    if (!valid) return
  }
  wizardStep.value++
}

const blankForm = () => ({
  // shared
  tbi_id: '',
  status: 'active',
  location: '',

  // incubatee: identity
  name: '',
  tagline: '',
  category: '',
  slug: '',
  yearFounded: '',
  teamSize: '',
  contactEmail: '',
  website: '',
  statusLabel: 'Active Incubatee',
  statusIcon: 'mdi-check-circle-outline',
  tags_raw: '',

  // incubatee: about
  descriptionLong: '',
  descriptionExtra: '',
  problem: '',
  solution: '',
  details: [
    { label: 'Industry', value: '', icon: 'mdi-brain', color: '#1565C0' },
    { label: 'Stage', value: '', icon: 'mdi-sprout-outline', color: '#2E7D32' },
    { label: 'Year Founded', value: '', icon: 'mdi-calendar-outline', color: '#E65100' },
    { label: 'Headquarters', value: '', icon: 'mdi-map-marker-outline', color: '#6A1B9A' },
    { label: 'Team Size', value: '', icon: 'mdi-account-group-outline', color: '#00695C' },
    { label: 'Total Funding', value: '', icon: 'mdi-cash-multiple', color: '#C62828' },
  ],

  // incubatee: media — paths stored after upload
  logo: '',
  logoPreview: null, // local blob preview before upload completes
  heroBg: '',
  gallery: ['', '', '', '', ''],
  galleryPreviews: [null, null, null, null, null], // local blob previews
  galleryCaptions: ['', '', '', '', ''],

  // incubatee: achievements
  achievements: [],

  // incubatee: partners
  partners: [],

  // incubatee: team
  team: [],

  // incubatee: testimonials
  testimonials: [],

  // news
  title: '',
  date: '',
  author: '',
  description: '',
  full_description: '',
  image: '',
  newsImagePreview: null,
  tags_raw_news: '',
  featured: false,

  // events
  type: '',
  day: '',
  month: '',
  year: '',
  time: '',
  capacity: '',
  slots: '',
  registered: '',
  description_event: '',
  full_description_event: '',
  image_event: '',
  eventImagePreview: null,
  tags_raw_event: '',
})

const form = reactive(blankForm())

// ── Auto-generate slug from startup name ──────────────────────────────────────
// Only fires when adding a new incubatee (isEditing = false).
// Never overwrites the slug when editing — changing a live slug would
// break any existing links to that startup's profile page.
watch(
  () => form.name,
  (newName) => {
    if (isEditing.value) return
    if (activeSection.value !== 'incubatees') return
    form.slug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars except spaces/hyphens
      .replace(/\s+/g, '-') // spaces → hyphens
      .replace(/-+/g, '-') // collapse multiple hyphens into one
      .replace(/^-|-$/g, '') // trim leading/trailing hyphens
  },
)

function openAddDialog() {
  isEditing.value = false
  editId.value = null
  formError.value = ''
  publishDialog.value = false
  publishDestination.value = ''
  publishError.value = ''
  wizardStep.value = 0
  Object.assign(form, blankForm())
  if (tbiFilter.value) form.tbi_id = tbiFilter.value
  if (activeSection.value === 'events') form.status = 'upcoming'
  formDialog.value = true
}

function openEditDialog(item) {
  isEditing.value = true
  editId.value = item.id
  formError.value = ''
  publishDialog.value = false
  publishDestination.value = item.tbi_id || ''
  publishError.value = ''
  wizardStep.value = 0
  const base = blankForm()
  Object.assign(form, {
    ...base,
    ...item,
    // Explicitly map database field names to form field names
    image_event: activeSection.value === 'events' ? item.image || '' : item.image || '',
    newsImagePreview: null,
    eventImagePreview: null,
    descriptionLong: item.description_long || '',
    descriptionExtra: item.description_extra || '',
    yearFounded: item.year_founded || '',
    teamSize: item.team_size || '',
    contactEmail: item.contact_email || '',
    statusLabel: item.status_label || '',
    statusIcon: item.status_icon || '',
    heroBg: item.hero_bg || '',
    tags_raw: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags_raw || '',
    tags_raw_news: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    tags_raw_event: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    details: item.details || base.details,
    gallery: item.gallery ? [...item.gallery, ...['', '', '', '', '']].slice(0, 5) : base.gallery,
    galleryPreviews: [null, null, null, null, null],
    galleryCaptions: item.gallery_captions
      ? [...item.gallery_captions, ...['', '', '', '', '']].slice(0, 5)
      : base.galleryCaptions,
    achievements: (item.achievements || []).map((a) => ({ ...a, photoPreview: null })),
    partners: item.partners || [],
    team: (item.team || []).map((m) => ({ ...m, photoPreview: null })),
    testimonials: (item.testimonials || []).map((t) => ({ ...t, photoPreview: null })),
    logoPreview: null,
  })
  formDialog.value = true
}

function openDeleteDialog(item) {
  deleteTarget.value = item
  deleteDialog.value = true
}

// ── Build Supabase payload ────────────────────────────────────────────────────
function buildPayload() {
  if (activeSection.value === 'incubatees') {
    const tags = form.tags_raw
      ? form.tags_raw
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : []
    return {
      tbi_id: form.tbi_id,
      name: form.name,
      tagline: form.tagline || null,
      category: form.category,
      slug: form.slug || null,
      year_founded: form.yearFounded || null,
      location: form.location || null,
      team_size: form.teamSize || null,
      contact_email: form.contactEmail || null,
      website: form.website || null,
      status: form.status,
      status_label: form.statusLabel || null,
      status_icon: form.statusIcon || null,
      tags,
      description_long: form.descriptionLong || null,
      description_extra: form.descriptionExtra || null,
      problem: form.problem || null,
      solution: form.solution || null,
      details: form.details,
      // URLs are already the Supabase public URLs after upload
      logo: form.logo || null,
      hero_bg: form.heroBg || null,
      gallery: form.gallery.filter(Boolean),
      gallery_captions: form.galleryCaptions.filter(Boolean),
      achievements: form.achievements.map(({ photoPreview: _photoPreview, ...a }) => a),
      partners: form.partners,
      team: form.team.map(({ photoPreview: _photoPreview, ...m }) => m),
      testimonials: form.testimonials.map(({ photoPreview: _photoPreview, ...t }) => t),
    }
  }

  if (activeSection.value === 'news') {
    const tags = form.tags_raw_news
      ? form.tags_raw_news
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : []
    return {
      tbi_id: form.tbi_id,
      title: form.title,
      category: form.category,
      date: form.date,
      location: form.location || null,
      author: form.author || null,
      description: form.description,
      full_description: form.full_description || null,
      image: form.image || null,
      tags,
      status: form.status,
      featured: form.featured,
    }
  }

  // events
  const eventTags = form.tags_raw_event
    ? form.tags_raw_event
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []
  return {
    tbi_id: form.tbi_id,
    title: form.title,
    type: form.type,
    status: form.status,
    day: form.day,
    month: form.month,
    year: form.year,
    time: form.time,
    location: form.location,
    capacity: form.capacity ? parseInt(form.capacity) : null,
    slots: form.slots ? parseInt(form.slots) : null,
    registered: form.registered ? parseInt(form.registered) : null,
    description: form.description_event,
    full_description: form.full_description_event || null,
    image: form.image_event || null,
    tags: eventTags,
  }
}

async function handleSubmit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  formError.value = ''

  publishError.value = ''
  publishDestination.value = form.tbi_id || tbiFilter.value || ''
  publishDialog.value = true
}

async function confirmPublishSubmit() {
  if (!publishDestination.value) {
    publishError.value = 'Please select a TBI portal before saving.'
    return
  }

  form.tbi_id = publishDestination.value
  publishError.value = ''

  const payload = buildPayload()
  const table = activeTable.value
  const result = isEditing.value
    ? await table.updateRecord(editId.value, payload)
    : await table.insertRecord(payload)

  if (result.success) {
    publishDialog.value = false
    formDialog.value = false
  } else {
    formError.value = result.error?.message || 'Failed to save. Please try again.'
  }
}

async function confirmDelete() {
  const result = await activeTable.value.deleteRecord(deleteTarget.value.id)
  if (result.success) deleteDialog.value = false
}

// ── Logout ────────────────────────────────────────────────────────────────────
async function confirmLogout() {
  try {
    await auth.signOut()
  } catch {
    /* silent */
  }
  logoutDialog.value = false
  router.push('/login')
}

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(async () => {
  const {
    data: { user },
  } = await auth.getCurrentUser()
  currentUser.value = user
  await Promise.all([incubateesTable.fetchAll(), newsTable.fetchAll(), eventsTable.fetchAll()])
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.admin-app {
  font-family: 'DM Sans', sans-serif !important;
}

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
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
  letter-spacing: 0.5px;
}
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
}
.sidebar-user--rail {
  justify-content: center;
  padding: 12px 0;
}
.sb-user-email {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
.sb-user-role {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 1px;
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

/* ── App bar ────────────────────────────────────────────────────────────────── */
.admin-appbar :deep(.v-toolbar__content) {
  padding: 0 20px;
}
.appbar-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.appbar-page-label {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
}

/* ── Main ───────────────────────────────────────────────────────────────────── */
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

/* ── Welcome ────────────────────────────────────────────────────────────────── */
.welcome-strip {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.welcome-greeting {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}
.welcome-sub {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}
.welcome-date {
  font-size: 0.78rem;
  color: #aaa;
  font-weight: 500;
  padding-top: 6px;
}

/* ── Stat cards ─────────────────────────────────────────────────────────────── */
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #edf0f7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(21, 101, 192, 0.1);
}
.stat-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
}
.stat-label {
  font-size: 0.72rem;
  color: #888;
  font-weight: 600;
  margin-top: 4px;
}

/* ── Section eyebrow ────────────────────────────────────────────────────────── */
.section-eyebrow {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  color: #1565c0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ── Category cards ─────────────────────────────────────────────────────────── */
.cat-card {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  min-height: 300px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.cat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18) !important;
}
.cat-card--incubatees {
  background: linear-gradient(145deg, #1565c0, #0d47a1);
}
.cat-card--news {
  background: linear-gradient(145deg, #2e7d32, #1b5e20);
}
.cat-card--events {
  background: linear-gradient(145deg, #e65100, #bf360c);
}
.cat-card-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size:
    auto,
    32px 32px,
    32px 32px;
}
.cat-card-body {
  position: relative;
  z-index: 1;
  padding: 28px;
}
.cat-card-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cat-card-eyebrow {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.cat-card-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  margin: 4px 0 10px;
  line-height: 1.1;
}
.cat-card-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.7;
  margin: 0;
}
.cat-chip {
  background: rgba(255, 255, 255, 0.12) !important;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.62rem !important;
  font-weight: 600 !important;
}
.cat-card-cta {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 16px;
  transition: background 0.18s ease;
}
.cat-card:hover .cat-card-cta {
  background: rgba(255, 255, 255, 0.25);
}

/* ── TBI Glance cards ───────────────────────────────────────────────────────── */
.tbi-glance-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid #edf0f7;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.2s;
}
.tbi-glance-card:hover {
  box-shadow: 0 6px 20px rgba(21, 101, 192, 0.09);
}
.tbi-glance-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 2px;
}
.tbi-glance-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: #1a1a1a;
}
.tbi-glance-sub {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 1px;
}
.tbi-glance-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tbi-glance-btn {
  text-transform: none !important;
  font-size: 0.72rem !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}

/* ── Content section header ─────────────────────────────────────────────────── */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.page-eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.page-title {
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
.filters-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* ── Table ──────────────────────────────────────────────────────────────────── */
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
.empty-state {
  text-align: center;
  padding: 56px 0;
}
.empty-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #bbb;
  margin: 0;
}
.empty-sub {
  font-size: 0.8rem;
  color: #ccc;
  margin: 4px 0 0;
}

/* ── Form dialog ────────────────────────────────────────────────────────────── */
.form-card {
  overflow: hidden;
}
.form-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
}
.fh-eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2px;
}
.fh-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 4px 0 0;
}

/* TBI selector */
.form-section-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #444;
  display: flex;
  align-items: center;
}
.tbi-selector-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tbi-selector-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #e0e4ef;
  cursor: pointer;
  transition: all 0.18s ease;
}
.tbi-selector-item:hover {
  border-color: #b0c4ef;
  background: #f8f9fc;
}
.tsi-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tsi-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a1a1a;
}
.tsi-sub {
  font-size: 0.68rem;
  color: #aaa;
  margin-top: 1px;
}
.field-error {
  font-size: 0.75rem;
  color: #ef4444;
}

/* Form fields */
.form-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 6px;
}
.hint-text {
  font-size: 0.68rem;
  color: #aaa;
  font-weight: 400;
  margin-left: 4px;
}
.form-field :deep(.v-field) {
  border-radius: 10px !important;
  font-size: 0.88rem;
}
.form-field :deep(.v-field__outline) {
  border-color: #dde3f0 !important;
}
.form-field :deep(.v-field--focused .v-field__outline) {
  border-width: 2px !important;
}
.save-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}

/* ── Upload box ─────────────────────────────────────────────────────────────── */
.upload-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 120px;
  border: 2px dashed #c8d2e8;
  border-radius: 12px;
  background: #f8f9fc;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background 0.18s ease;
  overflow: hidden;
  padding: 12px;
  text-align: center;
}
.upload-box:hover {
  border-color: #1565c0;
  background: #eef4ff;
}
.upload-box--sm {
  min-height: 90px;
}
.upload-box--xs {
  min-height: 70px;
}
.upload-box--avatar {
  width: 90px;
  height: 90px;
  min-height: unset;
  border-radius: 50%;
  padding: 0;
}
.upload-box-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #1565c0;
}
.upload-box-label--sm {
  font-size: 0.68rem;
  color: #aaa;
}
.upload-box-hint {
  font-size: 0.65rem;
  color: #aaa;
}
.upload-box-overlay {
  position: absolute;
  inset: 0;
  background: rgba(21, 101, 192, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.18s ease;
  border-radius: 10px;
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
}
.upload-box-overlay--circle {
  border-radius: 50%;
}
.upload-box:hover .upload-box-overlay {
  opacity: 1;
}

/* ── Current uploads summary ───────────────────────────────────────────────── */
.current-uploads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.current-upload-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}
.current-upload-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.current-upload-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
}

/* ── Wizard ─────────────────────────────────────────────────────────────────── */
.wizard-header {
  background: #1565c0;
  padding: 22px 28px 14px;
}
.wizard-header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.wizard-progress {
  display: flex;
  gap: 5px;
  margin-bottom: 6px;
}
.wizard-pip {
  height: 4px;
  flex: 1;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.25);
  transition: background 0.2s;
}
.wizard-pip--done {
  background: rgba(255, 255, 255, 0.65);
}
.wizard-pip--active {
  background: #ffffff;
}
.wizard-step-label {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.3px;
}
.wizard-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  gap: 10px;
  background: #fafbff;
}
.wizard-count {
  font-size: 0.75rem;
  color: #aaa;
  font-weight: 600;
}

/* Large TBI selector cards */
.tbi-selector-item--lg {
  padding: 16px 18px;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}
.tsi-color-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  border-radius: 14px 0 0 14px;
}

/* Sub-cards */
.sub-card {
  background: #f8f9fc;
  border: 1px solid #e8ecf4;
  border-radius: 12px;
  padding: 14px 16px;
}
.sub-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.sub-card-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.tab-section-header {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #444;
  letter-spacing: 0.3px;
  padding: 8px 0 4px;
  border-bottom: 1px solid #edf0f7;
  margin-bottom: 12px;
}
.empty-tab-state {
  text-align: center;
  padding: 40px 0 20px;
}
.empty-tab-text {
  font-size: 0.82rem;
  color: #bbb;
  margin-top: 8px;
}

/* Dialogs */
.dialog-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
.dialog-sub {
  font-size: 0.82rem;
  color: #888;
  margin: 0;
}

/* Transitions */
.fade-label-enter-active,
.fade-label-leave-active {
  transition: opacity 0.18s ease;
}
.fade-label-enter-from,
.fade-label-leave-to {
  opacity: 0;
}
</style>
