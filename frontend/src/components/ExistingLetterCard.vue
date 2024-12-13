<template lang="pug">
  q-card(style="padding: 20px; min-width: 400px")
    q-card-section(style="font-size: 35px") Письмо
    q-card-section
      q-field(outlined stack-label label="Отправитель") 
        template(v-slot:control) {{ sender }}
    q-card-section
      q-field(outlined stack-label label="Тема")
        template(v-slot:control) {{ topic }}
    q-card-section
      q-field(outlined stack-label label="Текст письма") 
        template(v-slot:control) {{ body }}
    q-card-section
      q-field(outlined stack-label label="Дата")
        template(v-slot:control) {{ date }}
    q-card-actions(align="center")
      q-btn(@click="deleteLetter" icon="delete" color="primary" rounded push) Удалить письмо
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLetterStore } from 'src/stores/letterStore';
import { useQuasar } from 'quasar';
const letterStore = useLetterStore()
const props = defineProps({
  id: Number,
  sender: String,
  topic: String,
  body: String,
  date: String,
})
const quasar = useQuasar()
const sender = ref(props.sender)
const topic = ref(props.topic)
const body = ref(props.body)
const date = ref(props.date)
watch(() => props, () => {
  sender.value = props.sender
  topic.value = props.topic
  body.value = props.body
  date.value = props.date
}, { deep: true })

const emits = defineEmits('deleteClicked')

async function deleteLetter() {
  try {
    await letterStore.deleteLetter(props.id)
  } catch (error) {
    quasar.notify({ type: 'negative', message: 'Произошла ошибка' })
    console.log(error)
    return
  }
  quasar.notify({ type: 'positive', message: 'Удаление письма успешно' })
  emits('deleteClicked')
}

</script>

<style lang="scss" scoped></style>