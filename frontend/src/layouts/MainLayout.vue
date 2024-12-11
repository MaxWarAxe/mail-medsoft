<template lang="pug">
  q-layout(view='lHh LpR lFf')
    q-header.bg-primary.text-white(elevated='')
      q-toolbar
        q-btn(dense='' flat='' round='' icon='menu' @click='toggleLeftDrawer')
        q-toolbar-title Почта
        q-input(rounded bg-color="white" outlined v-model="searchText" @change="console.log(searchText)" label="Поиск письма" clearable dense)
          template(v-slot:prepend)
            q-icon(name="search")
    q-drawer(show-if-above='' v-model='leftDrawerOpen' side='left' bordered='') 
      q-list
        q-item(style="background-color: var(--q-primary)")
            q-item-section.text-white.text-bold Меню почты
        q-item(v-for="option in optionsList" clickable :active="currentScreen === option.id" @click="changeScreen(option.id)")
          q-item-section(avatar)
            q-icon(:name="option.iconName")
          q-item-section {{ option.title }}
          q-item-section(side)
            div.mail-counter(v-if="option.id === 'inbox'") {{letterStore.inboxLetters.length || 0}}
              q-tooltip Количество писем
            div.mail-counter(v-if="option.id === 'draft'") {{letterStore.draftLetters.length || 0}}
              q-tooltip Количество писем
            div.mail-counter(v-if="option.id === 'send'") {{letterStore.sendedLetters.length || 0}}
              q-tooltip Количество писем  
    q-page-container
      router-view
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useLetterStore } from 'src/stores/letterStore';

const letterStore = useLetterStore()

const currentScreen = ref('inbox')

const searchText = ref('')

const router = useRouter()

const optionsList = ref([
  {
    id: 'inbox',
    title: 'Входящие',
    iconName: 'inbox'
  },
  {
    id: 'draft',
    title: 'Черновики',
    iconName: 'save'
  },
  {
    id: 'send',
    title: 'Отправленные',
    iconName: 'send'
  },
])

function changeScreen(optionId) {
  router.push(optionId)
  currentScreen.value = optionId
}

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped>
.mail-counter {
  border: solid 1px black;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-size: 12px;
  color: black;
}
</style>