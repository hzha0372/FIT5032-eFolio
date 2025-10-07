<template>
    <div>
        <h1>Add Book API</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue';
import BookList from '../components/BookList.vue';
import router from '@/router'
import axios from 'axios';
export default {
    setup() {
        const isbn = ref('');
        const name = ref('');
        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                await axios.post('https://us-central1-fit5032-efolio-e5f9a.cloudfunctions.net/addBook', {
                isbn: isbnNumber,
                name: name.value
                })
                .then(function (response) {
                alert('Book added successfully!')
                router.push('BookList')
                console.log(response);
                })
                .catch(function (error) {
                alert('Book added error', error)
                console.log(error);
                });
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };
        return {
            isbn,
            name,
            addBook
        };
    },
    components: {
        BookList
    }
};
</script>