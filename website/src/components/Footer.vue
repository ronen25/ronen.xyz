<template>
  <footer>
    <hr />
    <p class="text-center">
        Website version <code>v.{{version}}</code>.
        <br />
      Copyright (c) Ronen Lapushner, 2019. Code available
      <a
        href="https://github.com/ronen25/ronen.xyz"
      >here</a>
      under the AGPL 3+ license.
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
      return {
          version: process.env.VUE_APP_VERSION
      }
  }
};
</script>