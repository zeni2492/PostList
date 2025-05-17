<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <button :class="{ active }">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background: none;
  outline: none;
  cursor: pointer;
  border: 1px solid #2C3E50;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
}

button:hover {
  background: #E67E22;
  color: white;
  border-color: #E67E22;
}

button.active {
  background: #2C3E50;
  color: white;
  border-color: #2C3E50;
}
</style>