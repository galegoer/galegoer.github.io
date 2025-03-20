<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Here I'll share a little bit about myself and what I've been working on. I'm a software developer from Canada that loves to automate things I do in my day to day life. As you may have seen from my Github
      there are many projects that I've done to simplify the processes of some daily tasks. I'm currently learning Vue and working on a few different projects. You will see these under the WIP section in the Projects tab.
      I've also been inspired to write some blog posts, so you'll see some soon!
      Feel free to reach out through the Contact page!
      <br/>
      Thanks for stopping by!
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
