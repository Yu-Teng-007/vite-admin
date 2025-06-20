<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "currentColor",
    },
    size: {
        type: [Number, String],
        default: 16,
    },
});

const iconName = computed(() => `#icon-${props.name}`);
const iconSize = computed(() => {
    return typeof props.size === "number" ? `${props.size}px` : props.size;
});
</script>

<template>
    <svg class="svg-icon" :width="iconSize" :height="iconSize" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color" />
    </svg>
</template>

<style scoped>
.svg-icon {
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>
