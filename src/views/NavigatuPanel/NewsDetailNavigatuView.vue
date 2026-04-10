<template>
  <v-app>
    <v-app-bar flat color="white" border="b" height="64" style="transition: box-shadow 0.3s">
      <v-container class="d-flex align-center pa-0" fluid>
        <div class="d-flex align-center ml-4 ml-md-8">
          <v-img src="/images/NaviLogo.jpg" width="55" height="55" class="mr-3" cover />
          <div>
            <div class="nav-brand">NAVIGATÚ</div>
            <div class="nav-sub">Technology Business Incubator</div>
          </div>
        </div>

        <v-spacer />

        <div class="d-none d-md-flex align-center mr-6" style="gap: 4px">
          <v-btn variant="text" class="nav-link" to="/about-navigatu">About</v-btn>
          <v-btn variant="text" class="nav-link" to="/services-navigatu">Services</v-btn>
          <v-btn variant="text" class="nav-link" to="/coworking-navigatu">Coworking</v-btn>
          <v-btn variant="text" class="nav-link nav-link--active" to="/news-navigatu">News</v-btn>
          <v-btn variant="text" class="nav-link" to="/events-navigatu">Events</v-btn>
          <v-btn variant="text" icon size="small">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <button class="nav-apply-btn ml-2">Apply Now</button>
        </div>

        <v-app-bar-nav-icon class="d-flex d-md-none mr-2" @click="drawer = !drawer" />
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="right" width="260">
      <v-list nav class="pt-4">
        <v-list-item title="About" prepend-icon="mdi-information-outline" to="/about-navigatu" />
        <v-list-item
          title="Services"
          prepend-icon="mdi-briefcase-outline"
          rounded="lg"
          class="mb-1"
          to="/services-navigatu"
        />
        <v-list-item
          title="Coworking"
          prepend-icon="mdi-office-building-outline"
          rounded="lg"
          class="mb-1"
          to="/coworking-navigatu"
        />
        <v-list-item
          title="News"
          prepend-icon="mdi-newspaper-variant-outline"
          rounded="lg"
          class="mb-1"
          to="/news-navigatu"
          active
        />
        <v-list-item
          title="Events"
          prepend-icon="mdi-calendar-outline"
          rounded="lg"
          class="mb-1"
          to="/events-navigatu"
        />
      </v-list>
      <template #append>
        <div class="pa-4">
          <button class="nav-apply-btn" style="width: 100%">Apply Now</button>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <section class="detail-hero">
        <v-container class="py-10 py-md-14">
          <v-btn
            variant="text"
            color="white"
            prepend-icon="mdi-arrow-left"
            class="back-btn mb-6"
            @click="router.push('/news-navigatu')"
          >
            Back to News
          </v-btn>

          <template v-if="loading">
            <v-skeleton-loader type="heading, paragraph, paragraph" class="hero-skeleton" />
          </template>

          <template v-else-if="article">
            <v-chip size="small" class="mb-4" color="white" text-color="#1565C0" variant="flat">
              {{ article.category }}
            </v-chip>
            <h1 class="detail-title">{{ article.title }}</h1>
            <div class="meta-row mt-4">
              <span class="meta-item">
                <v-icon icon="mdi-calendar-outline" size="16" class="mr-1" />
                {{ article.date }}
              </span>
              <span class="meta-dot">•</span>
              <span class="meta-item">
                <v-icon icon="mdi-account-circle-outline" size="16" class="mr-1" />
                {{ article.author }}
              </span>
              <span class="meta-dot">•</span>
              <span class="meta-item">
                <v-icon icon="mdi-map-marker-outline" size="16" class="mr-1" />
                {{ article.location }}
              </span>
            </div>
          </template>
        </v-container>
      </section>

      <v-container class="py-8 py-md-12">
        <template v-if="loading">
          <v-skeleton-loader type="image" class="mb-8" />
          <v-skeleton-loader type="paragraph, paragraph, paragraph, paragraph" />
        </template>

        <v-alert v-else-if="error" type="error" variant="tonal" rounded="lg" class="mb-6">
          {{ error }}
        </v-alert>

        <v-alert v-else-if="!article" type="warning" variant="tonal" rounded="lg" class="mb-6">
          This news article could not be found.
        </v-alert>

        <template v-else>
          <v-card rounded="xl" elevation="0" class="cover-card mb-8">
            <v-img :src="article.image" cover height="460" class="detail-image" />
          </v-card>

          <v-row>
            <v-col cols="12" md="8">
              <article class="article-body">
                <p class="lead-text">{{ article.description }}</p>
                <div class="body-text" style="white-space: pre-line">
                  {{ article.fullDescription || article.description }}
                </div>

                <section v-if="galleryGroups.length" class="gallery-section mt-8">
                  <div
                    v-for="(group, index) in galleryGroups"
                    :key="`news-gallery-group-${index}`"
                    class="detail-extra-block"
                  >
                    <div
                      class="inline-gallery-grid mb-4"
                      :style="{ '--gallery-columns': getGalleryGridColumns(group.images.length) }"
                    >
                      <v-img
                        v-for="(imageItem, ii) in group.images"
                        :key="`news-gallery-group-${index}-image-${ii}`"
                        :src="imageItem.image"
                        cover
                        class="inline-gallery-image"
                      />
                    </div>
                    <p v-if="group.short_description" class="gallery-lead-text mb-3">
                      {{ group.short_description }}
                    </p>
                    <div
                      v-if="group.long_description"
                      class="body-text"
                      style="white-space: pre-line"
                    >
                      {{ group.long_description }}
                    </div>
                  </div>
                </section>
              </article>
            </v-col>

            <v-col cols="12" md="4">
              <v-card rounded="xl" class="meta-card pa-5" elevation="0">
                <h3 class="meta-card-title mb-4">Article Info</h3>
                <div class="meta-list-item">
                  <v-icon icon="mdi-shape-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ article.category }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon icon="mdi-calendar-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ article.date }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon
                    icon="mdi-account-circle-outline"
                    size="16"
                    color="#1565C0"
                    class="mr-2"
                  />
                  <span>{{ article.author }}</span>
                </div>
                <div class="meta-list-item">
                  <v-icon icon="mdi-map-marker-outline" size="16" color="#1565C0" class="mr-2" />
                  <span>{{ article.location }}</span>
                </div>

                <v-divider class="my-4" />

                <div class="d-flex flex-wrap" style="gap: 8px">
                  <v-chip
                    v-for="tag in article.tags"
                    :key="tag"
                    size="small"
                    variant="tonal"
                    color="primary"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <footer class="footer-section">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" md="4" class="mb-8">
            <div class="footer-brand mb-1">NAVIGATÚ</div>
            <p class="footer-tag mb-4">Technology Business Incubator</p>
            <p class="footer-desc">
              Empowering the next generation of Filipino tech founders through mentorship,
              innovation, and community.
            </p>
            <div class="d-flex" style="gap: 12px">
              <button class="social-btn"><v-icon size="15">mdi-facebook</v-icon></button>
              <button class="social-btn"><v-icon size="15">mdi-linkedin</v-icon></button>
              <button class="social-btn"><v-icon size="15">mdi-twitter</v-icon></button>
            </div>
          </v-col>
          <v-col cols="6" md="2" class="mb-8">
            <div class="footer-col-title mb-4">Programs</div>
            <div class="footer-link mb-3">Incubation</div>
            <div class="footer-link mb-3">Mentorship</div>
            <div class="footer-link mb-3">Funding Access</div>
          </v-col>
          <v-col cols="6" md="2" class="mb-8">
            <div class="footer-col-title mb-4">Company</div>
            <div class="footer-link mb-3">About</div>
            <div class="footer-link mb-3">Services</div>
            <div class="footer-link mb-3">Events</div>
          </v-col>
          <v-col cols="12" md="4" class="mb-8">
            <div class="footer-col-title mb-4">Newsletter</div>
            <p class="footer-desc mb-4">Stay updated on events, funding, and startup news.</p>
            <div class="newsletter">
              <input class="nl-input" placeholder="your@email.com" />
              <button class="nl-btn">
                <v-icon size="17">mdi-send</v-icon>
              </button>
            </div>
          </v-col>
        </v-row>
        <div class="footer-hr" />
        <div class="d-flex flex-wrap justify-space-between align-center pt-6" style="gap: 8px">
          <p class="footer-copy">© 2024 Navigatú TBI. All Rights Reserved.</p>
          <p class="footer-copy">Empowering startups. Building futures.</p>
        </div>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const drawer = ref(false)
const loading = ref(false)
const error = ref('')
const article = ref(null)

function normalizeNewsItem(item) {
  return {
    ...item,
    fullDescription: item.fullDescription || item.full_description || item.description || '',
    tags:
      item.tags ||
      (item.tags_raw
        ? item.tags_raw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : []) ||
      [],
    image: item.image || item.image_event || '/images/news/news1.jpg',
    category: item.category || 'Other',
    date: item.date || '',
    location: item.location || 'Navigatu TBI',
    author: item.author || 'Navigatu',
    gallery_items: Array.isArray(item.gallery_items)
      ? item.gallery_items.map((galleryItem) => ({
          image: galleryItem?.image || '',
          short_description: galleryItem?.short_description || galleryItem?.short || '',
          long_description: galleryItem?.long_description || galleryItem?.long || '',
        }))
      : [],
  }
}

const galleryItems = computed(() => {
  if (!article.value) return []
  return (article.value.gallery_items || []).filter((item) => item.image)
})

const galleryGroups = computed(() => {
  if (!galleryItems.value.length) return []

  const grouped = new Map()
  const fallback = []

  galleryItems.value.forEach((item) => {
    const groupIndex = Number.isInteger(item.group_index) ? item.group_index : null
    if (groupIndex === null) {
      fallback.push(item)
      return
    }
    if (!grouped.has(groupIndex)) {
      grouped.set(groupIndex, {
        images: [],
        short_description: item.short_description || '',
        long_description: item.long_description || '',
      })
    }
    grouped.get(groupIndex).images.push(item)
  })

  if (fallback.length) {
    for (let i = 0; i < fallback.length; i += 3) {
      const chunk = fallback.slice(i, i + 3)
      grouped.set(grouped.size, {
        images: chunk,
        short_description: chunk[0]?.short_description || '',
        long_description: chunk[0]?.long_description || '',
      })
    }
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
    .map(([, group]) => group)
})

function getGalleryGridColumns(imagesCount) {
  return Math.min(Math.max(imagesCount || 1, 1), 3)
}

async function fetchArticle() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: fetchError } = await supabase
      .from('news')
      .select('*')
      .eq('id', route.params.id)
      .eq('tbi_id', 'navigatu')
      .eq('status', 'active')
      .single()

    if (fetchError) throw fetchError

    article.value = data ? normalizeNewsItem(data) : null
  } catch (err) {
    article.value = null
    error.value = err?.message || 'Failed to load article.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchArticle)
watch(() => route.params.id, fetchArticle)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap');

.v-application {
  font-family: 'DM Sans', sans-serif !important;
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #1565c0;
  line-height: 1.1;
}

.nav-sub {
  font-size: 0.6rem;
  color: #9e9e9e;
  letter-spacing: 0.5px;
}

.nav-link {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #333 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
}

.nav-link--active {
  color: #1565c0 !important;
  font-weight: 700 !important;
}

.nav-apply-btn {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  padding: 9px 22px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(21, 101, 192, 0.35);
  transition: all 0.2s;
}

.nav-apply-btn:hover {
  box-shadow: 0 6px 22px rgba(21, 101, 192, 0.5);
  transform: translateY(-1px);
}

.detail-hero {
  color: #fff;
  background:
    radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.16), transparent 40%),
    radial-gradient(circle at 90% 5%, rgba(255, 255, 255, 0.14), transparent 35%),
    linear-gradient(135deg, #0d47a1 0%, #1565c0 58%, #2e7d32 100%);
}

.back-btn {
  text-transform: none !important;
  font-weight: 600 !important;
}

.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.7rem, 4.4vw, 2.8rem);
  line-height: 1.2;
  margin: 0;
  max-width: 920px;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.92);
}

.meta-dot {
  color: rgba(255, 255, 255, 0.65);
}

.cover-card {
  overflow: hidden;
  border: 1px solid #e7eef8;
}

.article-body {
  color: #2f3b4b;
}

.lead-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e3f66;
  line-height: 1.8;
}

.gallery-lead-text {
  font-size: 1.05rem;
  font-weight: 400;
  color: #1e3f66;
  line-height: 1.8;
}

.body-text {
  font-size: 0.95rem;
  line-height: 1.95;
  color: #4e5f74;
}

.gallery-section {
  border-top: 1px solid #e8edf6;
  padding-top: 18px;
}

.detail-extra-block + .detail-extra-block {
  margin-top: 28px;
}

.inline-gallery-grid {
  display: grid;
  grid-template-columns: repeat(var(--gallery-columns, 3), minmax(0, 1fr));
  gap: 12px;
}

.inline-gallery-image {
  border-radius: 14px;
  border: 1px solid #e7eef8;
  aspect-ratio: 4 / 3;
}

.meta-card {
  position: sticky;
  top: 90px;
  border: 1px solid #e8edf6;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
}

.meta-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #123f73;
}

.meta-list-item {
  display: flex;
  align-items: center;
  font-size: 0.88rem;
  color: #4e5f74;
  margin-bottom: 10px;
}

/* ── FOOTER ── */
.footer-section {
  background: #06080f;
}

.footer-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  font-style: italic;
}

.footer-tag {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0;
}

.footer-desc {
  font-size: 0.77rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.8;
}

.footer-col-title {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.32);
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.footer-link {
  font-size: 0.79rem;
  color: rgba(255, 255, 255, 0.48);
  cursor: pointer;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #fff;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.11);
  color: rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.18s;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.13);
  color: #fff;
}

.footer-hr {
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  margin-top: 32px;
}

.footer-copy {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.22);
  margin: 0;
}

.newsletter {
  display: flex;
  gap: 8px;
}

.nl-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 0.8rem;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  outline: none;
}

.nl-input::placeholder {
  color: rgba(255, 255, 255, 0.28);
}

.nl-input:focus {
  border-color: rgba(255, 255, 255, 0.28);
}

.nl-btn {
  background: linear-gradient(135deg, #1565c0, #2563eb);
  color: #fff;
  border: none;
  border-radius: 12px;
  width: 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 960px) {
  .meta-card {
    position: static;
  }

  .detail-image {
    height: 280px !important;
  }
}
</style>
