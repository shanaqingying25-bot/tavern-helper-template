<template>
  <div class="stage-bar">
    <div class="stages">
      <div v-for="s in stages" :key="s.full" class="stage-item" :class="{ on: store.data.世界.剧情阶段 === s.full }">
        <span class="dot"></span>
        <span class="label">{{ s.short }}</span>
      </div>
    </div>
    <div class="seed-row">
      <span class="seed-label">圣石之种</span>
      <div class="seed-track">
        <div class="seed-fill" :style="{ width: seed_pct + '%' }"></div>
      </div>
      <span class="seed-count">{{ store.data.世界.圣石之种已封印数 }} / 21</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../../store';

const store = useDataStore();

const stages = [
  { full: '卷入·开端', short: '卷入' },
  { full: '相争·结缘', short: '相争' },
  { full: '交织·真相', short: '真相' },
  { full: '终幕·庭园', short: '终幕' },
];

const seed_pct = computed(() =>
  Math.min(100, Math.round((store.data.世界.圣石之种已封印数 / 21) * 100)),
);
</script>

<style lang="scss" scoped>
.stage-bar {
  padding: 10px 14px;
  border-bottom: 1px solid var(--c-border);
}

.stages {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stage-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--c-text-muted);
  font-size: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-border);
  border: 1.5px solid var(--c-text-muted);
}

.stage-item.on {
  color: var(--c-primary);
  font-weight: bold;
}

.stage-item.on .dot {
  background: var(--c-primary);
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px var(--c-primary-soft);
}

.seed-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.seed-label {
  font-size: 12px;
  color: var(--c-accent);
  font-weight: bold;
  white-space: nowrap;
}

.seed-track {
  flex: 1;
  height: 12px;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 999px;
  overflow: hidden;
}

.seed-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-accent), #e8b84a);
  transition: width 0.5s ease;
}

.seed-count {
  font-size: 12px;
  color: var(--c-text-muted);
  white-space: nowrap;
}
</style>
