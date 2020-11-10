<template>
  <div class="wrapper-popup" v-bind:class="getClassPopup">
    <div class="rule">
      <h3>Rules</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quos
        nostrum nam neque maxime, enim ad repellat praesentium consequatur ipsa
        possimus itaque doloribus, explicabo tempore labore nobis magni iure
        temporibus.
      </p>
      <button v-on:click="handleConfirm" class="confirm">OK, I got it.</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RulesModal',
  props: {
    isOpenPopup: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  methods: {
    handleConfirm() {
      this.$emit('init-new-game')
    }
  },
  computed: {
    getClassPopup() {
      return {
        'open-popup': this.isOpenPopup
      }
    }
  }
}
</script>

<style>
.wrapper-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.wrapper-popup.open-popup {
  opacity: 1;
  visibility: visible;
}
.rule {
  width: 350px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  background-color: #fff;
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  transition: all 0.3s ease;
}
.open-popup .rule {
  transform: translate(-50%, -50%) scale(1);
}

.rule h3 {
  margin-bottom: 10px;
}
.rule .confirm {
  cursor: pointer;
  margin-top: 20px;
  padding: 8px 15px;
  border: 2px solid #333;
  background-color: #fff;
  transition: all 0.3s ease;
}
.rule .confirm:hover {
  color: #fff;
  background-color: #333;
}
</style>
