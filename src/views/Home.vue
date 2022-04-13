<template>
   <div class="home">
      <HeaderApp />
      <CarouselApp />
      <ProdukApp />
      <InstaApp />
      <PartnerApp />
      <Footer />
   </div>
</template>

<script>
import HeaderApp from '@/components/HeaderApp.vue';
import CarouselApp from '@/components/CarouselApp.vue';
import ProdukApp from '@/components/ProdukApp.vue';
import InstaApp from '@/components/InstaApp.vue';
import PartnerApp from '@/components/PartnerApp.vue';
import Footer from '@/components/Footer.vue';
export default {
   name: 'Home',
   components: {
     HeaderApp,
     CarouselApp,
     ProdukApp,
     InstaApp,
     PartnerApp,
     Footer
   }
}
</script>