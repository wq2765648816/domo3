<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
#app,
html,
body {
  height: 100%;
  width: 100%;
  background-color: #edeff2;
}
.dialog-footer {
  text-align: center;
}
</style>
