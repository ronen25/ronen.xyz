<template>
  <footer id="footer">
    <hr />
    <p class="text-center">
      Copyright &copy; Ronen Lapushner, 2019 - 2020.
      <br />Code available
      <a
        href="https://github.com/ronen25/ronen.xyz"
      >here</a>
      under the AGPL 3+ license.
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
#footer {
  min-width: 100%;
  background-color: #35393d;
  color: rgb(252, 252, 252);
  margin-bottom: 0px;
  margin-top: 0px;
  padding-bottom: 10px;
}

a {
  color: lightblue;
}

</style>