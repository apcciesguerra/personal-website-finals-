<template>
    <div id="app3">
      <form @submit.prevent="addItem">
        <strong>Suggestion Box</strong>
        <p>
          Any suggestions for my website?
          <input type="text" required placeholder="Input here!" v-model="itemName">
        </p>
        <p>
          Confirm
          <label>
            <input type="checkbox" v-model="itemImportant">
          </label>
        </p>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SuggestionForm',
    data() {
      return {
        itemName: '',
        itemImportant: false
      }
    },
    methods: {
      addItem() {
        alert(`Suggestion submitted: ${this.itemName}, Important: ${this.itemImportant}`);
        this.itemName = '';
        this.itemImportant = false;
      }
    }
  }
  </script>