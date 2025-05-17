<script setup lang="ts">
import {getOnePost} from "../../API/API.ts";
import {onMounted,ref} from "vue";
import type {IPost} from "../../helpers/Types.ts";
import {useRoute,RouterLink} from "vue-router";
import Button from "../../components/Button.vue";

const post = ref<IPost | null>(null);
const route = useRoute();
const loading = ref<boolean>(false);
const error = ref<string>('');

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
  <div class="header_container">
    <RouterLink :to="'/'"><Button class="header_back-button">Back to All Posts</Button></RouterLink>
    <h1 class="header_title">PostPage</h1>
  </div>
  <div v-if="loading"></div>
  <div  v-if="post" class="Post_container">
    <h1 class="Post_Title">{{post.title}}</h1>
    <h2 class="Post_body">{{post.body}}</h2>
  </div>
</template>

<style scoped>

.header_container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 54%;
}

.header_back-button{
  display: flex;
  white-space: nowrap;
}

.Post_container{
  padding: 0 12px;
  text-align: center;
}

.Post_Title{
  border-bottom: 1px solid #E67E22;
  padding-bottom: 8px;
}
</style>