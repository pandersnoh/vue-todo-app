<template>
  <h1>Hello</h1>
  <div :class="{ 'active': isActive }">
    sdsdsds
  </div>
  <img
    src="~/assets/nohemi_chara.png"
    alt="nohemi"
    width="150" />
  <a
    href="#"
    :class="{ active: isActive }"
    @click="isActive = !isActive">Click me</a>
  <div>
    <input
      type="radio"
      id="one"
      value="One"
      name="aaa"
      v-model="picked" />
    <label for="one">One</label>
    <br />
    <input
      type="radio"
      id="two"
      value="Two"
      name="aaa"
      v-model="picked" />
    <label for="two">Two</label>
    <br />
    <span>선택: {{ picked }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picked: ''
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  background: #f00;
  color: #fff;
  font-size: 30px;
}
</style>