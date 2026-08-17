<template>
  <div class="card">
    <header class="card-head">
      <span class="title">圣石之种事件</span>
      <span class="stage-badge">{{ store.data.世界.剧情阶段 }}</span>
    </header>

    <StageBar />

    <div class="meta-row">
      <span>时间 · {{ store.data.世界.当前时间 }}</span>
      <span>地点 · {{ store.data.世界.当前地点 }}</span>
    </div>

    <TabNav v-model="active_tab" :tabs="tabs" />

    <div class="content-area">
      <div v-if="active_tab === '关系'" class="tab-pane active">
        <RelationshipPanel />
      </div>
      <div v-else-if="active_tab === '主角'" class="tab-pane active">
        <ProtagonistPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RelationshipPanel from './components/RelationshipPanel.vue';
import ProtagonistPanel from './components/ProtagonistPanel.vue';
import StageBar from './components/StageBar.vue';
import TabNav from './components/TabNav.vue';
import { useDataStore } from '../store';

const store = useDataStore();

const tabs = [
  { id: '关系', label: '羁绊' },
  { id: '主角', label: '自身' },
];

const active_tab = useLocalStorage<string | null>('nanoha:active_tab', '关系');
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background-color: var(--c-surface);
  border: 2px solid var(--c-border);
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--font-ui);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.35;
  box-shadow: 0 2px 10px rgba(232, 126, 164, 0.12);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: linear-gradient(135deg, var(--c-primary-soft), var(--c-accent-soft));
  border-bottom: 2px solid var(--c-border);
}

.title {
  font-weight: bold;
  font-size: 14px;
  color: var(--c-primary);
  letter-spacing: 1px;
}

.stage-badge {
  background: var(--c-primary);
  color: #fff;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 14px;
  font-size: 12px;
  color: var(--c-text-muted);
  border-bottom: 1px dashed var(--c-border);
}

.content-area {
  padding: 12px 14px;
}

.tab-pane {
  animation: fadeEffect 0.3s;
}

@keyframes fadeEffect {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .meta-row {
    flex-direction: column;
    gap: 3px;
  }
}
</style>
