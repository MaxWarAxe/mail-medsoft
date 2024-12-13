<template lang="pug">
    q-list
      div(style="display: flex; padding: 10px; gap: 20px")
        q-btn(@click="newLetter" icon="edit" color="primary" round)
          q-tooltip Написать новое письмо
        q-btn(@click="letterStore.addRandomInboxLetters()" icon="refresh" color="primary" round)
          q-tooltip Получить входящие письма
      q-table(title="Черновики",
        :columns="columns" 
        :rows="letterStore.draftLetters.filter((letter) => letterStore.filterFunc(letter))"
        row-key="name"
        @row-click="onRowClick"
        :pagination="initialPagination")
      q-dialog(v-model="newLetterDialogOpened")
        NewLetterCard
      q-dialog(v-model="existingLetterDialogOpened")
        ChangeDraftCard(:id="editingLetter.id" 
        :reciever="editingLetter.reciever"
        :body="editingLetter.body" 
        :topic="editingLetter.topic"
        @deleteClicked="existingLetterDialogOpened = false")
  </template>

<script setup>
import { ref } from 'vue';
import NewLetterCard from 'src/components/NewLetterCard.vue';
import ChangeDraftCard from 'src/components/ChangeDraftCard.vue';
import ExistingLetterCard from 'src/components/ExistingLetterCard.vue';
import { useLetterStore } from 'src/stores/letterStore';

const letterStore = useLetterStore()

const columns = [
  { name: "reciever", field: "reciever", label: "Получатель", align: "left", sortable: true },
  { name: "topic", field: "topic", label: "Тема письма", sortable: true },
  { name: "body", field: "body", label: "Содержимое письма", sortable: true },
  { name: "date", field: "date", label: "Дата создания черновика", sortable: true }
]
const initialPagination = {
  page: 1,
  rowsPerPage: 50
}
const newLetterDialogOpened = ref(false)

const editingLetter = ref({
  id: -1,
  sender: '',
  reciever: '',
  topic: '',
  body: '',
  date: '',
})

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