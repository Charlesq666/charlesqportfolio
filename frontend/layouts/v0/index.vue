<template>
    <div :class="cn('w-screen h-screen flex flex-col', props.innerClass ?? '')">
        <Navbar />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';

const props = defineProps<{
    innerClass?: string;
}>();
</script>
