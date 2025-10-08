<template>
    <pre> {{ jsondata }}</pre>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        error: null,
        jsondata: null,
      };
    },
    mounted() {
        this.getBookCountAPI();
    },
    methods: {
        async getBookCountAPI() {
        try {
            const response = await axios.get('https://us-central1-fit5032-efolio-e5f9a.cloudfunctions.net/getAllBooks');
            this.jsondata = response.data;
            this.error = null;
        } catch (error) {
            console.error('Error getting book:', error);
            this.error = error;
            this.count = null;
        }
      },
    },
  };
  </script>