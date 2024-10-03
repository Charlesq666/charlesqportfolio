<template>
    <div class="w-full flex items-center">
        <div class="w-32">
            <slot name="title" />
        </div>

        <div class="ml-4 grow">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>