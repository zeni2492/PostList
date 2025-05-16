<script setup lang="ts">
import PostComponent from "./Components/PostComponent.vue";
import { getAllPosts } from "../../API/API.ts";
import {computed, onMounted, ref} from "vue";
import {RouterLink} from 'vue-router'

import type {IPost} from "../../helpers/Types.ts";

const data = ref<IPost[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const currentPage = ref<number>(1);
const itemsPerPage : number = 10;


const PaginatedPosts = computed(() =>{
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.value.slice(start, end);
})

const totalPages = computed(() => {
  return Math.ceil(data.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

onMounted(async () => {
  try {
    data.value = await getAllPosts();
  } catch (err) {
    error.value = "Failed to load posts";
    console.error("Error fetching posts:", err);
  } finally {
    loading.value = false;
  }
});


</script>

<template>
  <h1>MainPage</h1>

  <div v-if="loading">Loading posts...</div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-else>
    <div v-for="post in PaginatedPosts" :key="post.id">
      <RouterLink :to="`/post/${post.id}`" class="Post_Link">
        <PostComponent :post="post" />
      </RouterLink>
    </div>
  </div>

  <div class="pagination">
    <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="page-button"
    >
      Назад
    </button>

    <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
        class="page-button"
    >
      {{ page }}
    </button>

    <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="page-button"
    >
      Вперед
    </button>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>