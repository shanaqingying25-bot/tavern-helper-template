<template>
  <div class="pro-list">
    <div class="pro-item">
      <span class="pro-key">身份</span>
      <span class="pro-val">{{ store.data.主角.身份设定 }}</span>
    </div>
    <div class="pro-item">
      <span class="pro-key">立场</span>
      <span class="pro-val">{{ store.data.主角.立场 }}</span>
    </div>
    <div class="pro-item">
      <span class="pro-key">状态</span>
      <span class="pro-val status" :class="status_class">{{ store.data.主角.状态 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const status_class = computed(() => {
  const s = store.data.主角.状态;
  if (s.includes('重伤') || s.includes('魔力受损')) return 'danger';
  if (s.includes('轻伤')) return 'warning';
  return 'ok';
});
</script>

<style lang="scss" scoped>
.pro-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pro-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.pro-key {
  width: 40px;
  font-weight: bold;
  color: var(--c-primary);
}

.pro-val {
  flex: 1;
  color: var(--c-text);
}

.status.ok {
  color: var(--c-success);
}

.status.warning {
  color: var(--c-warning);
}

.status.danger {
  color: var(--c-danger);
  font-weight: bold;
}
</style>
