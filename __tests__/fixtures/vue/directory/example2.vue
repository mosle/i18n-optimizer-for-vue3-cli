<template>
  <div>{{ tt("__EXAMPLE2__1") }}</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  props: {
    collectionName: String,
  },
  setup(props) {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });
    t("__EXAMPLE2__0");
    // expose to template
    return {
      readersNumber,
      book,
    };
  },
};
</script>
