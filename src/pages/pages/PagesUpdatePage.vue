<template>
  <page-form :id="id" />
</template>

<script>
import PageForm from '@/pages/pages/PageForm.vue';

export default {
  components: {
    PageForm,
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
  },
};
</script>
