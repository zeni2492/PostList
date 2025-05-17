<script setup lang="ts">
import PostComponent from "./Components/PostComponent.vue";
import { getAllPosts } from "../../API/API.ts";
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink } from 'vue-router'
import Button from "../../components/Button.vue";

import type { IPost } from "../../helpers/Types.ts";

const data = ref<IPost[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(10);
const visiblePagesLimit = 10;
const paginationStart = ref<number>(1);
const searchQuery = ref<string>("");

const filteredPosts = computed<IPost[]>(() => {
  if (!searchQuery.value) return data.value;
  return data.value.filter((post: IPost) => {
    return (
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (post.body && post.body.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });
});

const PaginatedPosts = computed<IPost[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPosts.value.slice(start, end);
});

const totalPages  = computed<number>(() => {
  return Math.ceil(filteredPosts.value.length / itemsPerPage.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, paginationStart.value);
  const end = Math.min(start + visiblePagesLimit - 1, totalPages.value);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    updatePaginationStart();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    updatePaginationStart();
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  updatePaginationStart();
};

const updatePaginationStart = () => {
  const halfLimit = Math.floor(visiblePagesLimit / 2);
  if (currentPage.value <= halfLimit) {
    paginationStart.value = 1;
  } else if (currentPage.value >= totalPages.value - halfLimit) {
    paginationStart.value = Math.max(1, totalPages.value - visiblePagesLimit + 1);
  } else {
    paginationStart.value = currentPage.value - halfLimit;
  }
};

const nextPagesGroup = () => {
  paginationStart.value = Math.min(
      paginationStart.value + visiblePagesLimit,
      totalPages.value - visiblePagesLimit + 1
  );
};

const prevPagesGroup = () => {
  paginationStart.value = Math.max(1, paginationStart.value - visiblePagesLimit);
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

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
  updatePaginationStart();
});

const SelectOptions = [
  { name: 1, value: 1 },
  { name: 5, value: 5 },
  { name: 10, value: 10 },
];
</script>

<template>
  <div class="header_container">
    <h1>MainPage</h1>
    <div class="header_inputs">
      <p>Posts Per Page</p>
      <select v-model="itemsPerPage">
        <option v-for="item in SelectOptions" :value="item.value">
          {{ item.name }}
        </option>
      </select>
      <input
          v-model="searchQuery"
          placeholder="Search posts"
          class="header_input"
          type="text"
      >
    </div>
  </div>
  <div v-if="loading">Loading posts...</div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-else>
    <div v-for="post in PaginatedPosts" :key="post.id">
      <RouterLink :to="`/post/${post.id}`" class="Post_Link">
        <PostComponent class="Post_component" :post="post" />
      </RouterLink>
    </div>
  </div>
  <div class="pagination__container">
    <div class="pagination">
      <Button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="page-button"
      >
        Previous
      </Button>

      <Button
          v-if="paginationStart > 1"
          @click="prevPagesGroup"
          class="page-button-ellipsis"
      >
        ...
      </Button>

      <Button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :active="currentPage === page"
          class="page-button-number"
      >
        {{ page }}
      </Button>

      <Button
          v-if="paginationStart + visiblePagesLimit <= totalPages"
          @click="nextPagesGroup"
          class="page-button-ellipsis"
      >
        ...
      </Button>

      <Button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="page-button"
      >
        Next
      </Button>
    </div>
  </div>
</template>

<style scoped>
.pagination__container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
.pagination {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.error {
  color: red;
  font-weight: bold;
}

.Post_component{
  transition:  0.3s ease;

}

.Post_component:hover{
  background: #E67E22;
  color: white !important;
  border-color: #E67E22;
}

.page-button {
  margin: 0 4px;
  padding: 6px 12px;
}
.page-button-number {
  margin: 0 2px;
  min-width: 32px;
}
.page-button-ellipsis {
  margin: 0 2px;
  background: none;
  cursor: pointer;
  border: none;
}
.header_inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header_input {
  height: 30px;
  font-size: 18px;
  outline: none;
  border-radius: 4px;
  border: 1px solid black;
  transition: 0.3s ease;
}
.header_input:focus {

  border: 1px solid #E67E22;
}
select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>