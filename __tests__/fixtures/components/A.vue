<script setup lang="ts">
import { defineProps } from "vue";
type Prop = {
  title: string;
};
const { title = "default" } = defineProps<Prop>();
</script>
<template>A{{ title }}</template>
