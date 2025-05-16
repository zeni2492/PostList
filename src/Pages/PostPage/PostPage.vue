<script setup lang="ts">
import {getOnePost} from "../../API/API.ts";
import {onMounted,ref} from "vue";
import type {IPost} from "../../helpers/Types.ts";
import {useRoute,RouterLink} from "vue-router";

const post = ref<IPost | null>(null);
const route = useRoute();
const loading = ref(false);
const error = ref('');

onMounted(async () =>{
  try {
    loading.value = true;
    const postId = Array.isArray(route.params.postId)
        ? route.params.postId[0]
        : route.params.postId;
    post.value  = await getOnePost(postId);
    loading.value = false;
  }
  catch (err) {
    error.value = "Failed to load post";
    console.error("Error fetching posts:", err);
  }
  finally {
    loading.value = false;
  }
})
</script>

<template>
<h1><RouterLink :to="'/'">PostPage</RouterLink></h1>
  <div v-if="loading"></div>
  <div  v-if="post">
    <h1>{{post.title}}</h1>
    <h2>{{post.body}}</h2>
  </div>
</template>

<style scoped>

</style>