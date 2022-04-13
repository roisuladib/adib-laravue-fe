<template>
   <!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" :margin="20" :dots="false" :responsive="{0:{items:2,nav:false},600:{items:3,nav:false},900:{items:4,nav:false}}">
                        <div class="product-item" v-for="product in products" :key="product.id">
                            <div class="pi-pic">
                                <img :src="product.gallery[0].photo" alt="" />
                                <ul> 
                                    <li class="w-icon active">
                                        <a @click="simpanKeranjang(product.id, product.name, product.price, product.gallery[0].photo)"><i class="icon_bag_alt"></i></a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link v-bind:to="'/product/' + product.id">+ Quick View</router-link>
                                    </li>
                                </ul>
                            </div> 
                            <div class="pi-text">
                                <div class="catagory-name">{{ product.type }}</div>
                                <a href="#">
                                    <h5>{{ product.name }}</h5>
                                </a>
                                <div class="product-price">
                                    {{ vueNumberFormat(product.price, {}) }}
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-12 text-center pt-5" v-else >
                    <span class="badge badge-danger py-3 px-5" style="border-radius: 20px; font-size: 24px;">
                        Product Not Found...
                    </span>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>

<script>
import Carousel from 'vue-owl-carousel';
import axios from 'axios';
export default {
    name: 'ProdukApp',
    components: {
        Carousel
    },
    data() {
        return {
            products: [],
            keranjang: []
        }
    },
    mounted() {
        if (localStorage.getItem('keranjang')) {
            try {
                this.keranjang = JSON.parse(localStorage.getItem('keranjang'));
            }
            catch(e) {
                localStorage.removeItem('keranjang');
            }
        } 
        axios
            .get('http://127.0.0.1:8000/api/products')
            .then(response => (this.products = response.data.data.data))
            .catch(error => console.log(error));
    },
    methods: {
        simpanKeranjang(idProduk, nameProduk, price, photo) {
            let productStored = {
                id: idProduk, 
                name: nameProduk,
                price: price,
                photo: photo
            }
            this.keranjang.push(productStored);
            const parsed = JSON.stringify(this.keranjang);
            localStorage.setItem('keranjang', parsed);
            console.log(idProduk, nameProduk, price, photo);
            this.$router.go({name: 'Home'})
        }
    }
}
</script>

<style scoped>
   .owl-dots .owl-dot.active span {
      display: none !important;
   }
   .owl-dots .owl-dot span {
      margin-bottom: -2px !important;
   }
</style>