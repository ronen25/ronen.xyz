<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="1" :order="this.colorOrder" v-bind:style="{ 'background-color': this.color }"></b-col>
      <b-col md="11" :order="this.colorOrder - 1">
        <b-card-body :title="this.title">
          <slot></slot>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "SkillCard",
  props: ["title", "color", "colorOrder"]
};
</script>

<style scoped>
</style>