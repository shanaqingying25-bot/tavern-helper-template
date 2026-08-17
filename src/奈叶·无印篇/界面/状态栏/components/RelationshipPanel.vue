<template>
  <div class="rel-list">
    <div v-for="r in rels" :key="r.name" class="rel-row">
      <span class="rel-name">{{ r.name }}</span>
      <span class="rel-type">{{ r.type }}</span>
      <div class="rel-track">
        <div class="rel-fill" :style="{ width: r.value + '%', background: r.color }"></div>
      </div>
      <span class="rel-value">{{ r.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const rels = computed(() => [
  { name: '奈叶', type: '好感', value: store.data.关系.奈叶.好感, color: '#e87ea4' },
  { name: '尤诺', type: '信任', value: store.data.关系.尤诺.信任, color: '#6fb87f' },
  { name: '菲特', type: '好感', value: store.data.关系.菲特.好感, color: '#e0a03c' },
  { name: '艾尔芙', type: '好感', value: store.data.关系.艾尔芙.好感, color: '#e8893a' },
  { name: '克洛诺', type: '信任', value: store.data.关系.克洛诺.信任, color: '#6fa8c9' },
  { name: '琳蒂', type: '信任', value: store.data.关系.琳蒂.信任, color: '#8fbfa0' },
]);
</script>

<style lang="scss" scoped>
.rel-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rel-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rel-name {
  width: 52px;
  font-weight: bold;
  color: var(--c-text);
}

.rel-type {
  width: 26px;
  font-size: 11px;
  color: var(--c-text-muted);
}

.rel-track {
  flex: 1;
  height: 10px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 999px;
  overflow: hidden;
}

.rel-fill {
  height: 100%;
  transition: width 0.4s ease;
}

.rel-value {
  width: 30px;
  text-align: right;
  font-size: 12px;
  color: var(--c-text-muted);
}
</style>
