<template>
    <UIDialog>
        <UIDialogTrigger>
            <button>
                <Icon name="i-ion-logo-wechat" size="30" />
            </button>
        </UIDialogTrigger>

        <UIDialogContent class="bg-white" @interact-outside="(e) => e.preventDefault()">
            <NuxtImg src="/wechat.jpg" />
            <UIDialogFooter>
                <UIDialogClose as-child>
                    <UIButton type="button" variant="secondary" class="w-full"> Close </UIButton>
                </UIDialogClose>
            </UIDialogFooter>
        </UIDialogContent>
    </UIDialog>
</template>
