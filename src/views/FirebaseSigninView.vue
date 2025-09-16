<script setup>
import { ref, computed } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import isAuthenticated from '@/authenticate'
import router from '@/router'
import authenticateRole from '@/role'
const formData = ref({
  username: '',
  password: '',
})

const submittedCards = ref([])

const errors = ref({
  username: null,
  password: null,
  authentication: null
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    if (formData.value.username === 'Admin' && formData.value.password === 'Aa123456@')
    {
        isAuthenticated.value = true
        authenticateRole.value = "Admin"
        router.push('AdminPage')
    }
        else if (formData.value.username != 'Admin'){
            signInWithEmailAndPassword(getAuth(), formData.value.username, formData.value.password)
                .then((data) => {
                    console.log('Login Succeed data', data)
                    console.log('Login Succeed', getAuth().currentUser)
                    isAuthenticated.value = true
                    authenticateRole.value = 'Customer'
                    router.push('CustomerPage')
                })
                .catch((error) => {
                    console.log(error.code)
                    errors.value.authentication = error.code
                })               
        } else {
            router.push('access-denied')
        }
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Firebase Login</h1>
        
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
          <div v-if="errors.authentication" class="text-danger">{{ errors.authentication }}</div>
        </form>
      </div>
    </div>
  </div>
  
</template>
  

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

#username:focus,
#password:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>