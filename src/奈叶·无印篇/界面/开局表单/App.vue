<template>
  <div class="form-card">
    <h2 class="form-title">圣石之种事件</h2>
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

    <button class="submit" :disabled="submitting" @click="submit">
      {{ submitting ? '正在开始……' : '以这个身份开始' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { createChatMessages } from '@types/function/chat_message';
import { triggerSlash } from '@types/function/slash';
import { useDataStore } from '../store';

const store = useDataStore();
const identity = ref('海鸣市居民');
const involvement = ref('偶然目击');
const stance = ref('想帮忙');
const submitting = ref(false);

function submit() {
  if (submitting.value) return;
  submitting.value = true;
  store.data.主角.身份设定 = identity.value;
  store.data.主角.立场 = stance.value;
  const message = `我是${identity.value}，${involvement.value}了海鸣市黄昏时的异象。我选择${stance.value}。请根据我的身份、卷入方式和立场，展开我的开场。`;
  createChatMessages([{ role: 'user', message }]).then(() => {
    triggerSlash('/trigger');
  });
}
</script>

<style lang="scss" scoped>
.form-card {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  background: var(--c-surface, #fff);
  border: 2px solid var(--c-border, #ecd7e1);
  border-radius: 12px;
  padding: 18px 20px;
  font-family: var(--font-ui, sans-serif);
  color: var(--c-text, #4a3b45);
}

.form-title {
  margin: 0 0 4px;
  color: var(--c-primary, #e87ea4);
  font-size: 18px;
}

.form-sub {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--c-text-muted, #9a8a94);
}

.field {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label {
  font-size: 12px;
  font-weight: bold;
  color: var(--c-text, #4a3b45);
}

.field select {
  padding: 8px 10px;
  border: 1.5px solid var(--c-border, #ecd7e1);
  border-radius: 8px;
  background: var(--c-bg, #fdf7f2);
  font-size: 14px;
  color: var(--c-text, #4a3b45);
  font-family: var(--font-ui, sans-serif);
}

.submit {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--c-primary, #e87ea4), var(--c-accent, #d4a017));
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  font-family: var(--font-ui, sans-serif);
}

.submit:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
