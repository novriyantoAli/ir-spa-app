<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Voucher
            <RouterLink to="/voucher/buat" class="btn btn-primary float-end">
              Buat Voucher
            </RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Voucher</th>
                <th>Batch</th>
                <th>Waktu Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(voucher, index) in this.vouchers" :key="index">
                <td>{{ voucher.username }}</td>
                <td>{{ voucher.batch }}</td>
                <td>{{ voucher.created_at }}</td>
                <td>
                  <RouterLink :to="{ path: '/paket/ubah'}" class="btn btn-success mx-2">Ubah</RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  export default {
      name: 'vouchers',
      data() {
          return {
              vouchers: [],
          };
      },
      mounted() {
          this.getVouchers();
      },
      methods: {
          getVouchers() {
            axios.get('http://127.0.0.1:4211/api/v1/voucher').then(res => {
              this.vouchers = res.data.data;
            });
          },
      },
      components: { RouterLink }
  }
  </script>
  