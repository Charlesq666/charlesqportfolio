<template>
    <div class="p-3 flex items-center justify-between">
        <div class="flex items-center">
            <NuxtLink to="/about">
                <UIAvatar class="font-kalam text-xl"> YQ </UIAvatar>
            </NuxtLink>
        </div>

        <div class="flex items-center gap-1.5">
            <ClientOnly>
                <NavbarWechatButton />
            </ClientOnly>
            <a href="https://github.com/charlesq666" target="_blank">
                <Icon name="i-ion-logo-github" size="30" />
            </a>
            <a href="https://www.linkedin.com/in/youlin-qu-2517a6131/" target="_blank">
                <Icon name="i-ion-logo-linkedin" size="30" />
            </a>
        </div>
    </div>
</template>
