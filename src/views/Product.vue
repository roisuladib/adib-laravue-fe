<template>
   <div class="product">
      <HeaderApp />
      
      <!-- Breadcrumb Section Begin -->
      <div class="breacrumb-section">
         <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="breadcrumb-text product-more text-left">
                           <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                           <span>Detail</span>
                     </div>
                  </div>
               </div>
         </div>
      </div>
      <!-- Breadcrumb Section Begin -->

      <!-- Product Shop Section Begin -->
      <section class="product-shop spad page-details">
         <div class="container">
               <div class="row">
                  <div class="col-lg-12">
                     <div class="row">
                           <div class="col-lg-6">
                              <div class="product-pic-zoom">
                                 <img class="product-big-img" :src="img_def" alt="" />
                              </div>
                              <div class="product-thumbs" v-if="productDetail.gallery.length > 0">
                                 <Carousel  :margin="10" :dots="false" :nav="false" class="product-thumbs-track ps-slider">
                                    <div v-for="photo in productDetail.gallery" :key="photo.id" class="pt" @click="changeImage(photo.photo)" :class="photo.photo == img_def ? 'active' : ''">
                                       <img :src="photo.photo" alt="" />
                                    </div>
                                 </Carousel>
                              </div>
                           </div>
                           <div class="col-lg-6">
                              <div class="product-details text-left">
                                 <div class="pd-title">
                                       <span>{{ productDetail.type }}</span>
                                       <h3>{{ productDetail.name }}</h3>
                                 </div>
                                 <div class="pd-desc">
                                       <p v-html="productDetail.description"></p>
                                       <h4>{{ vueNumberFormat(productDetail.price, {}) }}</h4>
                                 </div>
                                 <div class="quantity">
                                    <router-link to="/cart">
                                       <button @click="simpanKeranjang(productDetail.id, productDetail.name, productDetail.price, productDetail.gallery[0].photo)" class="btn   primary-btn pd-cart">
                                          Add To Cart
                                       </button>
                                    </router-link>
                                 </div>
                              </div>
                           </div>
                     </div>
                  </div>
               </div>
         </div>
      </section>
      <!-- Product Shop Section End -->

      <RelatedProduct />
      <Footer />
   </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue';
import RelatedProduct from '@/components/RelatedProduct.vue';
import Footer from '@/components/Footer.vue';
import Carousel from 'vue-owl-carousel';
import axios from 'axios';

export default {
   name: 'Product',
   components: {
     HeaderApp,
     RelatedProduct,
     Footer,
     Carousel,
   },
   data() {
      return {
         img_def : '',
         productDetail: [],
         keranjang: []
      }
   },
   methods: {
      changeImage(urlImg) {
         this.img_def = urlImg;
      },
      setDataPicture(data) {
         this.productDetail = data;
         this.img_def = data.gallery[0].photo;
      },
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
         .get('http://127.0.0.1:8000/api/products', {
            params: {
               id: this.$route.params.id
            }
         })
         .then(response => (this.setDataPicture(response.data.data)))
         .catch(error => console.log(error));
      console.log(this.data.$route.params.id);
   }
}
</script>