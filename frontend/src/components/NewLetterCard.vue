<template lang="pug">
    q-card(style="padding: 20px; ")
        q-card-section(style="font-size: 35px") Новое письмо
        q-card-section
          q-input(outlined label="Получатель" v-model="reciever")
        q-card-section
          q-input(outlined label="Тема", v-model="topic")
        q-card-section
          q-input(outlined label="Текст письма" v-model="body")
        q-card-actions(align="right")
          q-btn(@click="addLetterToDraft" icon="save" color="primary" rounded push) Сохранить в черновик
          q-btn(@click="sendLetter" icon="send" color="primary" rounded push) Отправить
</template>

<script setup>
import { ref } from 'vue';
import { useLetterStore } from 'src/stores/letterStore';
const letterStore = useLetterStore()
const reciever = ref('')
const topic = ref('')
const body = ref('')

async function addLetterToDraft() {
  try {
    await letterStore.addLetterToDraft("me@mail.ru", reciever.value, topic.value, body.value)
  } catch {
    return
  }
  letterStore.draftLetters = await letterStore.getLettersDraft()
}

async function sendLetter() {
  try {
    await letterStore.sendLetter("me@mail.ru", reciever.value, topic.value, body.value)
  } catch {
    return
  }
  letterStore.sendedLetters = await letterStore.getLettersSended()
}

</script>

<style lang="scss" scoped></style>