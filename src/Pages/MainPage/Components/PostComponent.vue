<script setup lang="ts">
defineProps<{
  post: {
    title: string;
    body: string;
    userId: number;
    id: number;
  };
}>();
</script>

<template>
  <div class="post">
    <div class="post_item">
      <h1 class="post_title">{{ post.title }}</h1>
    </div>
  </div>
</template>

<style scoped>
h1{
  font-size: 1.5rem;
  color: black;
  text-decoration: none;
}
h2{
  font-size: 1.25rem;
}
.post{
  border: 1px #ccc solid;
  padding: 12px;
  margin-top: 12px;
  border-radius: 12px;
  box-shadow: 5px 5px 5px #ddd;
}
</style>