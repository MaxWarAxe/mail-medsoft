<template lang="pug">
  q-list
    div(style="display: flex; padding: 10px; gap: 20px")
      q-btn(@click="newLetter" icon="edit" color="primary" round)
        q-tooltip Написать новое письмо
      q-btn(@click="letterStore.addRandomInboxLetters()" icon="refresh" color="primary" round)
        q-tooltip Получить входящие письма
    q-table(title="Входящие",
      :columns="columns" 
      :rows="letterStore.inboxLetters.filter((letter) => letter.body.includes(letterStore.searchText))"
      row-key="name"
      @row-click="onRowClick")
    q-dialog(v-model="newLetterDialogOpened")
      NewLetterCard
    q-dialog(v-model="existingLetterDialogOpened")
      ExistingLetterCard(@deleteClicked="deleteClicked" :id="editingLetter.id" :sender="editingLetter.sender" :topic="editingLetter.topic" :body="editingLetter.body" :date="editingLetter.date")
</template>

<script setup>
import { ref } from 'vue';
import NewLetterCard from 'src/components/NewLetterCard.vue';
import { useLetterStore } from 'src/stores/letterStore';
import ExistingLetterCard from 'src/components/ExistingLetterCard.vue';
const letterStore = useLetterStore()

const columns = [
  { name: "sender", field: "sender", label: "Отправитель", align: "left", sortable: true },
  { name: "topic", field: "topic", label: "Тема письма", sortable: true },
  { name: "body", field: "body", label: "Содержимое письма", sortable: true },
  { name: "date", field: "date", label: "Дата отправления", sortable: true }
]

const newLetterDialogOpened = ref(false)

const editingLetter = ref({
  id: -1,
  sender: '',
  topic: '',
  body: '',
  date: '',
})

async function deleteClicked() {
  letterStore.inboxLetters = await letterStore.getLettersInbox()
  existingLetterDialogOpened.value = false
}

function newLetter() {
  newLetterDialogOpened.value = true
}

const existingLetterDialogOpened = ref(false)
function onRowClick(event, row, index) {
  existingLetterDialogOpened.value = true
  console.log(row, index)
  editingLetter.value = row
}
</script>

<style lang="scss" scoped></style>