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
import { useQuasar } from 'quasar';
const letterStore = useLetterStore()
const reciever = ref('')
const topic = ref('')
const body = ref('')
const quasar = useQuasar()

async function addLetterToDraft() {
  try {
    await letterStore.addLetterToDraft("me@mail.ru", reciever.value, topic.value, body.value)
  } catch {
    quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
    return
  }
  letterStore.draftLetters = await letterStore.getLettersDraft()
  quasar.notify({ type: 'positive', message: 'Добавление письма в черновик успешно' })
}

async function sendLetter() {
  try {
    await letterStore.sendLetter("me@mail.ru", reciever.value, topic.value, body.value)
  } catch {
    quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
    return
  }
  letterStore.sendedLetters = await letterStore.getLettersSended()
  quasar.notify({ type: 'positive', message: 'Отправка письма успешна' })
}

</script>

<style lang="scss" scoped></style>