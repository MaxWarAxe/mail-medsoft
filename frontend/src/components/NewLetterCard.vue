<template lang="pug">
    q-card(style="padding: 20px; ")
        q-card-section(style="font-size: 35px") Новое письмо
        q-card-section
          q-input(outlined label="Получатель")
        q-card-section
          q-input(outlined label="Тема")
        q-card-section
          q-input(outlined label="Текст письма")
        q-card-actions(align="right")
          q-btn(icon="save" color="primary" rounded push) Сохранить в черновик
          q-btn(icon="send" color="primary" rounded push) Отправить
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>