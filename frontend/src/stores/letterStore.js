import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLetterStore = defineStore('letters', () => {

    const inboxLetters = ref([])

    const draftLetters = ref([])

    const sendedLetters = ref([])

    async function getLettersInbox() {
        return axios
        .get(process.env.API + '/api/letters/inbox')
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function getLettersDraft() {
        return axios
        .get(process.env.API + '/api/letters/draft')
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function getLettersSended() {
        return axios
        .get(process.env.API + '/api/letters/sended')
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function addLetterToDraft(sender,reciever,topic,body){
        return axios
        .post(process.env.API + '/api/letters',
            {
                sender: sender,
                reciever: reciever,
                topic: topic,
                body: body,
                place: "draft",
                date: new Date().toLocaleString('ru')
            }
        )
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function updateLetter(id,sender,reciever,topic,body){
        return axios
        .put(process.env.API + '/api/letters/'+id,
            {
                sender: sender,
                reciever: reciever,
                topic: topic,
                body: body,
                place: "draft",
                date: new Date().toLocaleString('ru')
            }
        )
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function sendLetter(sender,reciever,topic,body){
        return axios
        .post(process.env.API + '/api/letters',
            {
                sender: sender,
                reciever: reciever,
                topic: topic,
                body: body,
                place: "sended",
                date: new Date().toLocaleString('ru')
            }
        )
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function deleteLetter(id){
        return axios
        .delete(process.env.API + '/api/letters/'+id,
        )
        .then((response) => {
            console.log(response.data)
            return response.data
        })
    }

    async function addRandomInboxLetters(){
        await axios.post(process.env.API + '/api/letters/addRandomMail')
        return inboxLetters.value = await getLettersInbox()
    }

    return {
        getLettersInbox, 
        getLettersDraft, 
        getLettersSended,
        inboxLetters, 
        draftLetters, 
        sendedLetters,
        addLetterToDraft,
        sendLetter,
        updateLetter,
        deleteLetter,
        addRandomInboxLetters,
    }
})
