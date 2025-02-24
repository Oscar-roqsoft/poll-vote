<!-- Poll.vue -->
<template>
    <!-- Main container for the poll, centered on the page -->
    <div class="poll-container">
      <!-- Poll question displayed at the top -->
      <h1 class="poll-question">What's your favorite programming language?</h1>
      
      <!-- Voting options section, shown only if user hasn't voted -->
      <div v-if="!hasVoted" class="options">
        <!-- Loop through options array to create voting buttons -->
        <button 
          v-for="(option, index) in options" 
          :key="index"
          @click="vote(index)"
          class="option-button"
        >
          {{ option.name }}
        </button>
      </div>
  
      <!-- Results section, shown only after user has voted -->
      <div v-else class="results" :class="{ 'animate-results': animate }">
        <!-- Results title -->
        <h2>Results</h2>
        <!-- Loop through options to display result bars -->
        <div 
          v-for="(option, index) in options" 
          :key="index" 
          class="result-bar"
        >
          <!-- Option name above the progress bar -->
          <span class="option-name">{{ option.name }}</span>
          <!-- Container for the progress bar -->
          <div class="bar-container">
            <!-- Filled portion of the progress bar, width based on percentage -->
            <div 
              class="bar-fill" 
              :style="{ width: `${calculatePercentage(option.votes)}%` }"
            ></div>
          </div>
          <!-- Display percentage and vote count -->
          <span class="percentage">
            {{ calculatePercentage(option.votes) }}% ({{ option.votes }} votes)
          </span>
        </div>
        <!-- Container for navigation buttons -->
        <div class="button-group">
          <!-- Button to return to voting without resetting -->
          <button @click="goBack" class="back-button">Back to Voting</button>
          <!-- Button to reset all votes and return to voting -->
          <button @click="resetVotes" class="reset-button">Reset Voting</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'Poll',
    setup() {
      // Reactive reference to track if user has voted
      const hasVoted = ref(false)
      // Reactive reference to control results animation
      const animate = ref(false)
      // Reactive array of poll options with names and vote counts
      const options = ref([
        { name: 'JavaScript', votes: 0 },
        { name: 'Python', votes: 0 },
        { name: 'Java', votes: 0 },
        { name: 'Rust', votes: 0 }
      ])
  
      // Computed property to calculate total votes
      const totalVotes = computed(() => {
        return options.value.reduce((sum, option) => sum + option.votes, 0)
      })
  
      // Function to calculate percentage for a given number of votes
      const calculatePercentage = (votes) => {
        if (totalVotes.value === 0) return 0
        return Math.round((votes / totalVotes.value) * 100)
      }
  
      // Function to handle voting for an option
      const vote = (index) => {
        options.value[index].votes++  // Increment votes for selected option
        hasVoted.value = true         // Show results view
        animate.value = true          // Trigger animation
        // Reset animation flag after 1 second
        setTimeout(() => {
          animate.value = false
        }, 1000)
      }
  
      // Function to return to voting view without resetting votes
      const goBack = () => {
        hasVoted.value = false
      }
  
      // Function to reset all votes and return to voting view
      const resetVotes = () => {
        options.value.forEach(option => {
          option.votes = 0  // Reset each option's vote count
        })
        hasVoted.value = false  // Return to voting view
      }
  
      // Return reactive data and functions to template
      return {
        hasVoted,
        animate,
        options,
        calculatePercentage,
        vote,
        goBack,
        resetVotes
      }
    }
  }
  </script>
  
  <style scoped>
  /* Center the poll container vertically and horizontally */
  .poll-container {
    max-width: 600px;
    margin: 0px auto;  /* Center horizontally with top/bottom margin */
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  /* Style the poll question */
  .poll-question {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  /* Container for voting buttons */
  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  /* Style for individual voting buttons */
  .option-button {
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  /* Hover effect for voting buttons */
  .option-button:hover {
    background-color: #0056b3;
  }
  
  /* Container for results section */
  .results {
    margin-top: 20px;
  }
  
  /* Individual result entry styling */
  .result-bar {
    margin: 15px 0;
  }
  
  /* Style for option names in results */
  .option-name {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #444;
  }
  
  /* Container for progress bars */
  .bar-container {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
  }
  
  /* Filled portion of progress bars */
  .bar-fill {
    height: 100%;
    background-color: #007bff;
    border-radius: 10px;
    transition: width 1s ease-in-out;
  }
  
  /* Style for percentage/vote count display */
  .percentage {
    display: block;
    margin-top: 5px;
    color: #666;
    font-size: 14px;
  }
  
  /* Animation class for result bars */
  .animate-results .bar-fill {
    width: 0;
    animation: growBar 1s ease-in-out forwards;
  }
  
  /* Container for navigation buttons */
  .button-group {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  
  /* Style for back button */
  .back-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #6c757d;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  /* Hover effect for back button */
  .back-button:hover {
    background-color: #5a6268;
  }
  
  /* Style for reset button */
  .reset-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  /* Hover effect for reset button */
  .reset-button:hover {
    background-color: #c82333;
  }
  
  /* Keyframe animation for growing progress bars */
  @keyframes growBar {
    from { width: 0; }
  }
  </style>