<template>
   <!-- Header Section Begin -->
      <header class="header-section">
         <div class="header-top">
               <div class="container">
                  <div class="ht-left">
                     <div class="mail-service">
                        <i class=" fa fa-envelope"></i>
                        riskyamalia@gmail.com
                     </div>
                     <div class="phone-service">
                        <i class=" fa fa-phone"></i>
                        0895704447596
                     </div>
                  </div>
               </div>
         </div>
         <div class="container">
            <div class="inner-header">
               <div class="row">
                  <div class="col-lg-2 col-md-2">
                        <div class="logo">
                           <a href="./index.html">
                              <img src="img/logo_website_shayna.png" alt="" />
                           </a>
                        </div>
                  </div>
                  <div class="col-lg-7 col-md-7"></div>
                  <div class="col-lg-3 text-right col-md-3">
                        <ul class="nav-right">
                           <li class="cart-icon">
                              Keranjang Belanja &nbsp;
                              <a href="#">
                                 <i class="icon_bag_alt"></i>
                                 <span>{{ keranjang.length }}</span>
                              </a>
                              <div class="cart-hover">
                                    <div class="select-items">
                                       <table>
                                          <tbody v-if="keranjang.length > 0">
                                                <tr v-for="cart in keranjang" :key="cart.id">
                                                   <td class="si-pic">
                                                      <img :src="cart.photo" width="60" alt="" />
                                                   </td>
                                                   <td class="si-text">
                                                      <div class="product-selected">
                                                         <p>{{ vueNumberFormat(cart.price, {}) }}</p>
                                                         <h6>{{ cart.name }}</h6>
                                                      </div>
                                                   </td>
                                                   <td @click="removeItem(keranjang.index)" class="si-close">
                                                      <i class="ti-close"></i>
                                                   </td>
                                                </tr>
                                          </tbody>
                                          <tbody v-else>
                                             <tr><td>Keranjang Kosong</td></tr>
                                          </tbody>
                                       </table>
                                    </div>
                                    <div class="select-total">
                                       <span>total:</span>
                                       <h5>{{ totalHarga | formatCurrency }}</h5>
                                       <!-- <h5>{{ vueNumberFormat(totalHarga, {}) }}</h5> -->
                                    </div>
                                    <div class="select-button">
                                       <router-link to="/cart" class="primary-btn view-card">VIEW CARD</router-link>
                                       <router-link to="/checkout" class="primary-btn checkout-btn">CHECK OUT</router-link>
                                    </div>
                              </div>
                           </li>
                        </ul>
                  </div>
               </div>
            </div>
         </div>
      </header>
      <!-- Header End -->
</template>

<script>
export default {
   name: 'HeaderApp',
   data() {
      return {
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
            console.log(e);
         }
      } 
   },
   methods: {
      removeItem(index) {
         this.keranjang.splice(index, 1);
         const parsed = JSON.stringify(this.keranjang);
         localStorage.setItem('keranjang', parsed);
         // alert(removeItem(keranjang.index))
      }
   },
   computed: {
      totalHarga() {
         return this.keranjang.reduce((item, data) => {
            return item + data.price ;
         }, 0);
      }
   }
}
</script>
