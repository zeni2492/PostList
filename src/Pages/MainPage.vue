<script setup lang="ts">
import PostComponent from "../components/PostComponent.vue";
import {getAllPosts} from "../API/API.ts";
import {onMounted, ref} from "vue";

interface IPost {
  title: string;
  body: string;
  userId:number;
  id: number;
}

const data = ref<IPost[]>([]);

onMounted(async () =>{
  data.value = (await getAllPosts()).data;
})
</script>

<template>
<h1>MainPage</h1>
  <div v-for="post in data" :key="post.id">
  <PostComponent :post="post"></PostComponent>
  </div>
</template>

<style scoped>

</style>