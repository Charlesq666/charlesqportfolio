<template>
    <UIButton variant="secondary"> {{ props.content }} - {{ props.order }} </UIButton>
</template>

<script setup lang="ts">
const props = defineProps<{
    content: string;
    header: string;
    order: number;
    slug: string;
}>();

const hi = "i";
</script>
