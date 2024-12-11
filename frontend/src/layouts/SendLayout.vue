<template lang="pug">
  q-list
    div(style="display: flex; padding: 10px; gap: 20px")
      q-btn(@click="newLetter" icon="edit" color="primary" round)
        q-tooltip Написать новое письмо
      q-btn(@click="letterStore.addRandomInboxLetters()" icon="refresh" color="primary" round)
        q-tooltip Получить входящие письма
    q-table(title="Отправленные",
      :columns="columns" 
      :rows="letterStore.sendedLetters.filter((letter) => letter.body.includes(letterStore.searchText))"
      row-key="name"
      @row-click="onRowClick")
    q-dialog(v-model="newLetterDialogOpened")
      NewLetterCard
    q-dialog(v-model="existingLetterDialogOpened")
      ExistingLetterCard(:sender="editingLetter.sender" 
      :topic="editingLetter.topic" 
      :body="editingLetter.body" 
      :date="editingLetter.date"
      :id="editingLetter.id"
      @deleteClicked="deleteCicked")
</template>

<script setup>
import { ref } from 'vue';
import NewLetterCard from 'src/components/NewLetterCard.vue';
import ExistingLetterCard from 'src/components/ExistingLetterCard.vue';
import { useLetterStore } from 'src/stores/letterStore';

const letterStore = useLetterStore()

const columns = [
  { name: "reciever", field: "reciever", label: "Получатель", align: "left", sortable: true },
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

function newLetter() {
  newLetterDialogOpened.value = true
}

async function deleteCicked() {
  existingLetterDialogOpened.value = false
  letterStore.sendedLetters = await letterStore.getLettersSended()
}

const existingLetterDialogOpened = ref(false)
function onRowClick(event, row, index) {
  existingLetterDialogOpened.value = true
  console.log(row, index)
  editingLetter.value = row
}
</script>

<style lang="scss" scoped></style>