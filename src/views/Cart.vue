<template>
   <div class="cart">
      <HeaderApp />
      
       <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                        <span>Shopping Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="keranjang.length > 0">
                                        <tr v-for="cart in keranjang" :key="cart.id">
                                            <td class="cart-pic first-row">
                                                <img :src="cart.photo" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{ cart.name }}</h5>
                                            </td>
                                            <td class="p-price first-row">{{ vueNumberFormat(cart.price, {}) }}</td>
                                            <td class="delete-item" @click="removeItem(cart.index)">
                                                <a href="#">
                                                    <i class="material-icons">
                                                        x
                                                    </i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr><td colspan="4">Keranjang Kosong</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <h4 class="mb-4">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input type="text" class="form-control" v-model="infoUser.name" />
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input type="email" class="form-control" v-model="infoUser.email" />
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input type="text" class="form-control" v-model="infoUser.tlpn" />
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea class="form-control" rows="3" v-model="infoUser.address"></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout">
                                <ul>
                                    <li class="subtotal">ID Transaction <span>#SH12000</span></li>
                                    <li class="subtotal mt-3">Subtotal <span>{{ vueNumberFormat(totalHarga, {}) }}</span></li>
                                    <li class="subtotal mt-3">Pajak <span>1.7%</span></li>
                                    <li class="subtotal mt-3">Total Biaya <span>{{ vueNumberFormat((totalHarga * (1.7/100)) + totalHarga, {}) }}</span></li>
                                    <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
                                    <li class="subtotal mt-3">No. Rekening <span>1799 0599 9905</span></li>
                                    <li class="subtotal mt-3">Nama Penerima <span>Mas Adib</span></li>
                                </ul>
                                <a @click="checkout()" class="proceed-btn">I ALREADY PAID</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->
      <Footer />
   </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios'

export default {
    name: 'Cart',
    components: {
        HeaderApp,
        Footer,
    },
    data() {
        return {
            keranjang: [],
            infoUser: {
                name: '',
                email: '',
                tlpn: '',
                address: '',
            }
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
    },
    methods: {
        removeItem(index) {
            this.keranjang.splice(index, 1);
            const parsed = JSON.stringify(this.keranjang);
            localStorage.setItem('keranjang', parsed);
            this.$router.go({name: this})
        },
        checkout() {
            let productId = this.keranjang.map(product => {
                return product.id;
            });
            let checkoutData = {
                name: this.infoUser.name,
                email: this.infoUser.email,
                tlpn: this.infoUser.tlpn,
                address: this.infoUser.address,
                transaction_total: this.totalHarga * (1.7/100) + this.totalHarga,
                transaction_status: 'PENDING',
                transaction_details : productId,
            }
            axios
                .post('http://127.0.0.1:8000/api/checkout', checkoutData)
                .then(() => this.$router.push({name: 'Success'}))
                .catch(error => console.log(error));
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