<template>
  <div class="picker">
    <!-- 视图一：开局卡片菜单 -->
    <template v-if="view === 'menu'">
      <header class="picker-head">
        <span class="badge">魔法少女奈叶 · 第一季</span>
        <h1 class="picker-title">圣石之种事件</h1>
        <p class="picker-sub">选择一个你被卷入这个黄昏的方式</p>
      </header>

      <div class="opening-grid">
        <button
          v-for="op in openings"
          :key="op.id"
          class="opening-card"
          :style="{ '--accent': op.accent }"
          :disabled="launching"
          @click="pick(op)"
        >
          <span class="op-group">{{ op.group }}</span>
          <i class="op-icon fa-solid" :class="op.icon"></i>
          <h2 class="op-title">{{ op.title }}</h2>
          <p class="op-sub">{{ op.subtitle }}</p>
        </button>
      </div>

      <div class="custom-area">
        <span class="divider"><i class="fa-solid fa-user-pen"></i> 或者，自定义你的身份</span>
        <button class="custom-btn" :disabled="launching" @click="view = 'form'">自定义身份 & 卷入方式</button>
      </div>

      <footer class="picker-foot">选择后将立即为你展开开局</footer>
    </template>

    <!-- 视图二：自定义身份表单 -->
    <template v-else>
      <div class="form-card">
        <h2 class="form-title">自定义身份</h2>
        <p class="form-sub">海鸣市的黄昏，你被卷进了一场不寻常的事。在追上去之前，先告诉我：你是谁？</p>

        <div class="field">
          <label>你的身份</label>
          <select v-model="identity">
            <option value="海鸣市居民">海鸣市居民</option>
            <option value="外来访客">外来访客（旅人）</option>
            <option value="被圣石之种波及的异能者">被圣石之种波及的异能者</option>
          </select>
        </div>

        <div class="field">
          <label>卷入方式</label>
          <select v-model="involvement">
            <option value="偶然目击">偶然目击</option>
            <option value="主动介入">主动介入</option>
            <option value="被迫卷入">被迫卷入</option>
          </select>
        </div>

        <div class="field">
          <label>立场倾向</label>
          <select v-model="stance">
            <option value="想帮忙">想帮忙</option>
            <option value="先观望">先观望</option>
            <option value="保持距离">保持距离</option>
          </select>
        </div>

        <div class="form-actions">
          <button class="back-btn" :disabled="launching" @click="view = 'menu'">返回</button>
          <button class="submit" :disabled="launching" @click="submitCustom">
            {{ launching ? '正在开始……' : '以这个身份开始' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { createChatMessages } from '@types/function/chat_message';
import { triggerSlash } from '@types/function/slash';
import { useDataStore } from '../store';
import { openings, type Opening } from './openings';

const store = useDataStore();
const view = ref<'menu' | 'form'>('menu');
const launching = ref(false);

// 自定义表单
const identity = ref('海鸣市居民');
const involvement = ref('偶然目击');
const stance = ref('想帮忙');

function applyPatch(patch: Record<string, unknown>) {
  for (const [path, value] of Object.entries(patch)) {
    const segs = path.split('.');
    let cursor: any = store.data;
    for (let i = 0; i < segs.length - 1; i++) {
      cursor = cursor?.[segs[i]];
    }
    if (cursor !== undefined) {
      cursor[segs[segs.length - 1]] = value;
    }
  }
}

function pick(op: Opening) {
  if (launching.value) return;
  launching.value = true;
  applyPatch(op.patch);
  createChatMessages([{ role: 'assistant', message: op.text }]).then(() => {
    createChatMessages([{ role: 'user', message: op.prompt }]).then(() => {
      triggerSlash('/trigger');
    });
  });
}

function submitCustom() {
  if (launching.value) return;
  launching.value = true;
  store.data.主角.身份设定 = identity.value;
  store.data.主角.立场 = stance.value;
  store.data.世界.当前地点 = '海鸣市';
  const message = `我是${identity.value}，${involvement.value}了海鸣市黄昏时的异象。我选择${stance.value}。请根据我的身份、卷入方式和立场，展开我的开场。`;
  createChatMessages([{ role: 'user', message }]).then(() => {
    triggerSlash('/trigger');
  });
}
</script>

<style lang="scss" scoped>
.picker {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  background: linear-gradient(160deg, #fdf7f2, #fbe4ee 130%);
  border: 2px solid #ecd7e1;
  border-radius: 16px;
  padding: 18px 20px 16px;
  font-family: "Sarasa Mono SC", "Sarasa Gothic SC", "Microsoft YaHei", sans-serif;
  color: #4a3b45;
  box-shadow: 0 4px 18px rgba(232, 126, 164, 0.15);
  text-align: center;
}

.picker-head {
  margin-bottom: 14px;
}

.badge {
  display: inline-block;
  background: #e87ea4;
  color: #fff;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.picker-title {
  margin: 0;
  font-size: 22px;
  color: #e87ea4;
  letter-spacing: 2px;
}

.picker-sub {
  margin: 6px 0 0;
  font-size: 13px;
  color: #9a8a94;
}

.opening-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.opening-card {
  position: relative;
  border: 2px solid var(--accent);
  border-radius: 14px;
  padding: 14px 12px 12px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  font-family: inherit;
}

.opening-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.opening-card:disabled {
  opacity: 0.6;
  cursor: default;
}

.op-group {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 10px;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 1px 7px;
  border-radius: 999px;
}

.op-icon {
  color: var(--accent);
  font-size: 22px;
  margin-bottom: 6px;
}

.op-title {
  margin: 0;
  font-size: 16px;
  color: #4a3b45;
}

.op-sub {
  margin: 5px 0 0;
  font-size: 12px;
  color: #9a8a94;
  line-height: 1.4;
}

.custom-area {
  border-top: 1px dashed #ecd7e1;
  padding-top: 12px;
  margin-bottom: 10px;
}

.divider {
  display: block;
  font-size: 12px;
  color: #9a8a94;
  margin-bottom: 10px;
}

.custom-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #e87ea4, #d4a017);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}

.custom-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.picker-foot {
  font-size: 11px;
  color: #cbb5bf;
  margin-top: 4px;
}

/* 自定义表单样式 */
.form-card {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  text-align: left;
}

.form-title {
  margin: 0 0 4px;
  color: #e87ea4;
  font-size: 20px;
}

.form-sub {
  margin: 0 0 16px;
  font-size: 13px;
  color: #9a8a94;
}

.field {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 12px;
  font-weight: bold;
  color: #4a3b45;
}

.field select {
  padding: 8px 10px;
  border: 1.5px solid #ecd7e1;
  border-radius: 8px;
  background: #fdf7f2;
  font-size: 14px;
  color: #4a3b45;
  font-family: inherit;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.back-btn,
.submit {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
}

.back-btn {
  background: #fbe4ee;
  color: #e87ea4;
}

.submit {
  background: linear-gradient(135deg, #e87ea4, #d4a017);
  color: #fff;
}

.back-btn:disabled,
.submit:disabled {
  opacity: 0.6;
  cursor: default;
}

@media (max-width: 520px) {
  .opening-grid {
    grid-template-columns: 1fr;
  }
}
</style>
