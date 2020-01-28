<template>
  <div class="home">
    <Header />
    <Body />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Body from '@/components/Body';

export default {
  name: 'home',
  components: {
    Header,
    Body,
  }
}
</script>
