import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import PaketView from '../views/paket/View.vue'
import PaketAdd from '../views/paket/Add.vue'
import PaketEdit from '../views/paket/Edit.vue'

import ProfilView from '../views/profil/View.vue'
import ProfilAdd from '../views/profil/Add.vue'
import ProfilRCView from '../views/profil/ViewRC.vue'
import ProfilRRView from '../views/profil/ViewRR.vue'

import VoucherView from '../views/voucher/View.vue'
import VoucherAdd from '../views/voucher/Add.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/paket',
      name: 'paket',
      component: PaketView
    },
    {
      path: '/paket/buat',
      name: 'buatPaket',
      component: PaketAdd
    },
    {
      path: '/paket/:id/ubah',
      name: 'ubahPaket',
      component: PaketEdit
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView
    },
    {
      path: '/profil/buat',
      name: 'buatProfil',
      component: ProfilAdd
    },
    {
      path: '/profil/radcheck/:groupname',
      name: 'profilRC',
      component: ProfilRCView
    },
    {
      path: '/profil/radreply/:groupname',
      name: 'profilRR',
      component: ProfilRRView
    },
    {
      path: '/voucher',
      name: 'voucher',
      component: VoucherView
    },
    {
      path: '/voucher/buat',
      name: 'buatVoucher',
      component: VoucherAdd
    }
  ]
})

export default router
