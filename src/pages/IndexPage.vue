<template>
  <q-page class="q-pa-md">
    <div class="flex flex-center">
      <canvas ref="bjsCanvas" width="500" height="500" />
    </div>

    <div class="q-gutter-sm flex flex-center q-mt-sm">
      <q-radio dense v-model="shape" val="cursor" label="Курсор" />
      <q-radio dense v-model="shape" val="offset" label="Смещение" />
      <q-radio dense v-model="shape" val="rotate" label="Вращение" />
      <q-radio dense v-model="shape" val="scale" label="Маштабирование" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "@vue/runtime-core";
import { watch } from "vue";
import { myScene } from "../scenes/FirstScene";

const bjsCanvas = ref(null);
const shape = ref("cursor");

onMounted(() => {
  if (bjsCanvas.value) {
    myScene.createScene(bjsCanvas.value);
  }
});

watch(shape, () => {
  myScene.ChangeGizmo(shape.value);
});
</script>
