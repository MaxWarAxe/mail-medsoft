<template lang="pug">
  router-view
</template>

<script setup>
import MainLayout from 'layouts/MainLayout.vue'
import { useLetterStore } from './stores/letterStore';
const letterStore = useLetterStore()

async function getLetters() {
  letterStore.inboxLetters = await letterStore.getLettersInbox()
  letterStore.draftLetters = await letterStore.getLettersDraft()
  letterStore.sendedLetters = await letterStore.getLettersSended()
}
getLetters()
</script>