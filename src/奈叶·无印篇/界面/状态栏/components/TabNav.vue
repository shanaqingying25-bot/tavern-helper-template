<template>
  <nav class="tab-nav">
    <button
      v-for="t in tabs"
      :key="t.id"
      class="tab"
      :class="{ active: modelValue === t.id }"
      @click="$emit('update:modelValue', t.id)"
    >
      {{ t.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{ tabs: { id: string; label: string }[] }>();
defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

<style lang="scss" scoped>
.tab-nav {
  display: flex;
  gap: 6px;
  padding: 8px 14px 0;
}

.tab {
  border: 1.5px solid var(--c-border);
  background: var(--c-bg);
  color: var(--c-text-muted);
  padding: 5px 16px;
  border-radius: 8px 8px 0 0;
  font-size: 12px;
  cursor: pointer;
  font-family: var(--font-ui);
}

.tab.active {
  background: var(--c-primary);
  border-color: var(--c-primary);
  color: #fff;
  font-weight: bold;
}
</style>
