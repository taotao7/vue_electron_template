<script setup lang="ts">
import {checkConnect} from '#preload';
import {OMessage as message,OButton} from 'onu-ui';
import {useDark, useToggle} from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="mt-20vh flex justify-center items-center flex-col">
    <div class="i-logos-apple text-8xl" />
    <div class="text-3xl mt-10px">Hello</div>
    <o-button
      class="mt-10px"
      @click="
        async () => {
          const res = await checkConnect();
          message.success(res.msg);
        }
      "
    >
      ipc测试
    </o-button>

    <o-button
      class="mt-10px"
      @click="toggleDark()"
    >
      {{ isDark ? '浅色模式' : '深色模式' }}
    </o-button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}

html.dark {
  background-color: #333;
}
</style>
