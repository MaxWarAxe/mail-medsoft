<template lang="pug">
    q-card(style="padding: 20px; ")
        q-card-section(style="font-size: 35px") Изменить черновик
        q-card-section
          q-input(outlined label="Получатель" v-model="reciever")
        q-card-section
          q-input(outlined label="Тема", v-model="topic")
        q-card-section
          q-input(outlined label="Текст письма" v-model="body")
        q-card-actions(align="center")
          q-btn(@click="updateLetterDraft" icon="save" color="primary" rounded push) Обновить
          q-btn(@click="sendLetter" icon="send" color="primary" rounded push) Отправить
          q-btn(@click="deleteLetter" icon="delete" color="primary" rounded push) Удалить
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useLetterStore } from 'src/stores/letterStore';

const props = defineProps({
    id: Number,
    reciever: String,
    topic: String,
    body: String,
})

const letterStore = useLetterStore()
const reciever = ref(props.reciever)
const topic = ref(props.topic)
const body = ref(props.body)
const emits = defineEmits('deleteCicked')
const quasar = useQuasar()

async function updateLetterDraft() {
    try {
        await letterStore.updateLetter(props.id, "me@mail.ru", reciever.value, topic.value, body.value)
    } catch (error) {
        quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
        console.log(error)
        return
    }
    letterStore.draftLetters = await letterStore.getLettersDraft()
    quasar.notify({ type: 'positive', message: 'Обновлено успешно' })
}

async function sendLetter() {
    try {
        await letterStore.sendLetter("me@mail.ru", reciever.value, topic.value, body.value)
    } catch (error) {
        quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
        console.log(error)
        return
    }
    letterStore.sendedLetters = await letterStore.getLettersSended()
    quasar.notify({ type: 'positive', message: 'Отправка письма успешна' })
}

async function deleteLetter() {
    try {
        await letterStore.deleteLetter(props.id)
    } catch (error) {
        quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
        console.log(error)
        return
    }
    letterStore.draftLetters = await letterStore.getLettersDraft()
    quasar.notify({ type: 'positive', message: 'Удаление письма успешно' })
    emits('deleteClicked')
}

</script>

<style lang="scss" scoped></style>