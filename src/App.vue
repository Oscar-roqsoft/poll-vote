<!-- App.vue -->
<template>
  <div class="app-container">
    <h1>Welcome  to the Voting App</h1>
    <!-- Use the Poll component -->
    <Poll />
  </div>
</template>

<!-- Start of Selection -->
<script>
// Import the Poll component
import Poll from '@/components/Poll.vue' // Fixed casing issue

export default {
  name: 'App',
  components: {
    // Register the Poll component locally
    Poll
  }
}
  

</script>

<style scoped>
/* Style the app container */
#app{
  background: #2c3e50;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* background-color: #f5f5f5; */
  padding: 20px;
  width: 100%;
}

/* Style the welcome heading */
h1 {
  margin-bottom: 60px;
  font-size: 2.8em;
  text-align: center;
  font-weight: 700;
  line-height: normal;
  background: linear-gradient(90deg, #007bff, #00c4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* Fallback for non-Webkit browsers */
}
</style>