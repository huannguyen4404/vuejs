var vueInstance = new Vue({
  el: '#app',
  data: {
    title: 'PULSEBOOST HD SHOES',
    url: 'https://www.adidas.com.vn/vi/giay-pulseboost-hd/EG9970.html',
    target: '_blank',
    price: 3500000,
    sale: 0.3,
    selectedProduct: 2,
    bagCount: 1,
    productColors: [
      {
        image: './images/gray.jpg',
        quantity: 10,
        textColor: 'Gray',
      },
      {
        image: './images/white.jpg',
        quantity: 8,
        textColor: 'White',
      },
      {
        image: './images/black.jpg',
        quantity: 0,
        textColor: 'Black',
      },
      {
        image: './images/blue.jpg',
        quantity: 5,
        textColor: 'Blue',
      },
    ],
    listDesc: [
      'Regular fit',
      'Lace closure',
      'Textile upper',
      'Responsive running shoes',
      'Boost HD midsole cushioning',
      'Rubber outsole',
    ],
    description:
      "<p>The city has an energy. It crackles in the air and throbs under the street. Tap into the vibe in these adidas running shoes. The responsive cushioning returns energy to your stride with a firm feel that keeps you connected to the ground. Because there's nowhere you'd rather be than here, now.</p>",
  },
  methods: {
    handleClickColor(index) {
      this.selectedProduct = index;
    },
    classActive(index) {
      return {
        active: this.selectedProduct === index,
      };
    },
    handleAddToBag(e) {
      if (this.bagCount + 1 > this.getProduct.quantity) {
        alert('This product is out of stock');
      } else {
        this.bagCount++;
      }
      console.log(e.target);
    },
  },
  computed: {
    formatOriginalPrice() {
      var number = this.price;
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
      }).format(number);
    },
    formatFinalPrice() {
      var number = this.price - this.sale * this.price;
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
      }).format(number);
    },
    getProduct() {
      let index = this.selectedProduct;
      return this.productColors[index];
    },
  },
});
