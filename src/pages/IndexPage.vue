<template>
  <q-page class="row items-center justify-evenly">
    <canvas ref="bjsCanvas" width="500" height="500" />
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted } from "@vue/runtime-core";
import { createScene } from "../scenes/FirstScene";

export default {
  name: "BabylonScene",
  setup() {
    const bjsCanvas = ref(null);

    onMounted(() => {
      if (bjsCanvas.value) {
        createScene(bjsCanvas.value);
      }
    });

    return {
      bjsCanvas,
    };
  },
};
</script>
