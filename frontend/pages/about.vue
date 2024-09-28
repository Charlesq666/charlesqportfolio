<template>
    <NuxtLayout name="v0">
        <div class="min-w-[700px] mx-auto grow flex flex-col items-start gap-4 bg-white rounded shadow-sm px-10 py-8">
            <!-- NAME -->
            <div class="flex items-center justify-between border-b rounded-none border-gray-300 w-full pb-1">
                <p class="font-kalam text-3xl font-bold">Youlin Qu</p>
                <ul class="text-xs text-gray-600 leading-4">
                    <li>Pittsburgh, PA</li>
                    <li>(207)-286-7026</li>
                    <li>chalice.chu@gmail.com</li>
                </ul>
            </div>

            <!-- SKILLS -->

            <!-- EXPERIENCE -->
            <ResumeSection>
                <template #title>
                    <p class="font-medium text-lg">Experience</p>
                </template>

                <template #content>
                    <div class="flex flex-col">
                        <div>
                            <p class="text-xs font-medium">
                                <a
                                    class="hover:text-primary hover:underline hover:cursor-pointer"
                                    href="https://coldreach.ai"
                                    target="_blank"
                                >
                                    Coldreach Inc
                                </a>
                            </p>
                            <p class="text-2xs flex">
                                <span>YC 23 | Software Engineer | Sep-2023 ~ Present</span>
                                <span class="ml-auto"> Remote, US </span>
                            </p>
                        </div>

                        <ul class="list-disc ml-4 leading-3">
                            <li>
                                <p class="text-2xs">Working on a team of 4 people to build a new AI-powered data science platform.</p>
                            </li>
                            <li>
                                <p class="text-2xs">Developing a new AI-powered data science platform.</p>
                            </li>
                            <li>
                                <p class="text-2xs">Working on a team of 4 people to build a new AI-powered data science platform.</p>
                            </li>
                        </ul>
                    </div>
                </template>
            </ResumeSection>

            <!-- EDUCATION -->

            <!-- PROJECTS -->
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    title: "About",
});
</script>
