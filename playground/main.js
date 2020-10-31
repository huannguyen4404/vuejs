var vm = new Vue({
  el: '#app',
  data: {
    title: 'Dien thoai Samsung',
    url: 'https://vuejs.org/v2/guide/',
    price: 10000,
  },
  methods: {
    say: (text) => `Hello ${text}`,
    formatPrice() {
      console.log(this.price);

      return Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
      }).format(this.price);
    },
  },
});

console.log(vm);
