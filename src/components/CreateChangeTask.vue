<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import useGeneralStore from '~/stores/general'
import { isTouchDevice } from '~/utils'
const generalStore = useGeneralStore()

const state = reactive({
  title: '',
  description: ''
})

const rules = {
  title: {
    required: helpers.withMessage('Title is required', required),
    minLength: helpers.withMessage('Title minimum 3 characters', minLength(3))
  },
  description: {
    required: helpers.withMessage('Description is required', required),
    minLength: helpers.withMessage('Description minimum 3 characters', minLength(3))
  }
}

const changeModal = computed(() => generalStore.changeModal)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') manageTodo()
}

onMounted(() => {
  if (!isTouchDevice.value) window.addEventListener('keydown', handleKeydown)
  if (changeModal.value) {
    state.title = changeModal.value.currentTitle
    state.description = changeModal.value.currentDescription
  }
})

onUnmounted(() => {
  if (!isTouchDevice.value) window.removeEventListener('keydown', handleKeydown)
  generalStore.modalChangeUpdateState(null)
})

const v$ = useVuelidate(rules, state)
const createTodo = () => {
  v$.value.$touch()
  if (!v$.value?.$invalid) {
    const todo = {
      id: String(Date.now()),
      title: state.title,
      description: state.description
    }

    generalStore.createTaskForBacklog(todo)
    generalStore.changeModalState(false)
  }
}

const changeTodo = () => {
  if (!v$.value?.$invalid && changeModal.value?.id && changeModal.value?.columnName) {
    const todo = {
      id: changeModal.value?.id,
      name: changeModal.value?.columnName,
      newTitle: state.title,
      newDescription: state.description
    }

    generalStore.editTask(todo)
    generalStore.changeModalState(false)
  }


}

const manageTodo = () => {
  if (changeModal.value) {
    changeTodo()
  } else {
    createTodo()
  }
}

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div :class="{ error: v$.title.$errors.length }">
      <div
        v-if="changeModal"
        class="mb-2 flex flex-col gap-y-2"
      >
        <div class="text-lg font-bold">
          Change task
        </div>
        <div>
          #: {{ changeModal.id }} from: {{ changeModal.columnName }}
        </div>
      </div>
      <div
        v-else
        class="text-lg font-bold mb-2"
      >
        Create new task
      </div>
      <input
        v-model="state.title"
        class="border rounded-md border-gray-400 p-2 w-full"
        type="text"
        placeholder="Add title..."
        @input="v$.title.$touch()"
      >
      <div
        v-for="error of v$.title.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div :class="{ error: v$.description.$errors.length }">
      <input
        v-model="state.description"
        class="border rounded-md border-gray-400 p-2 w-full"
        type="text"
        placeholder="Add description..."
        @input="v$.description.$touch()"
      >
      <div
        v-for="error of v$.description.$errors"
        :key="error.$uid"
        class="input-errors"
      >
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-2">
      <button
        :disabled="v$.title.$invalid && v$.title.$dirty || v$.description.$invalid && v$.description.$dirty"
        class="w-full"
        :class="{'disabled': v$.$invalid}"
        tabindex="0"
        @click="manageTodo"
      >
        {{ changeModal ? 'Change task' : 'Create task' }}
      </button>
    </div>
  </div>
</template>
