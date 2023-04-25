<template>
  <q-page class="q-pa-md">
    <canvas ref="bjsCanvas" width="500" height="500" />

    <div class="q-gutter-sm flex flex-center block">
      <q-radio dense v-model="shape" val="cursor" label="Курсор" />
      <q-radio dense v-model="shape" val="offset" label="Смещение" />
      <q-radio dense v-model="shape" val="rotate" label="Вращение" />
      <q-radio dense v-model="shape" val="scale" label="Маштабирование" />
    </div>

    <div class="q-px-sm q-pt-sm">
      Выбрано: <strong>{{ shape }}</strong>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from "@vue/runtime-core";
import { createScene } from "../scenes/FirstScene";

export default {
  name: "BabylonScene",
  setup() {
    const bjsCanvas = ref(null);
    const shape = ref("cursor")

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value);
      }
    });

    return {
      shape,
      bjsCanvas,
    };
  },
};
</script>
