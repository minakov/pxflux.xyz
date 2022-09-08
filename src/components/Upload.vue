<template>
  <div class="card">
    <input type="file" @click="upload" />
  </div>
</template>

<script>
import backblaze from '../lib/backblaze';

export default {
  methods: {
    upload(event) {
      console.log(event)
      backblaze();
    },
  },
};
</script>
