<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Paket
          <RouterLink to="/paket/buat" class="btn btn-primary float-end">
            Tambah Paket
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Satuan</th>
              <th>Nilai</th>
              <th>Harga</th>
              <th>Profil</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(paket, index) in this.pakets" :key="index">
              <td>{{ paket.Name }}</td>
              <td>{{ paket.ValUnit }}</td>
              <td>{{ paket.ValVal }}</td>
              <td>{{ paket.Price }}</td>
              <td>{{ paket.Profile }}</td>
              <td>
                <RouterLink :to="{ path: '/paket/' + paket.ID + '/ubah'}" class="btn btn-success mx-2">Ubah</RouterLink>
                <button @click="deletePaket(paket.ID)" class="btn btn-danger mx-2" type="button">Hapus</button>
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
    name: 'pakets',
    data() {
        return {
            pakets: [],
        };
    },
    mounted() {
        this.getPakets();
    },
    methods: {
        getPakets() {
          axios.get('http://127.0.0.1:4211/api/v1/product').then(res => {
            this.pakets = res.data.data;
          });
        },
        deletePaket(id) {
          if (confirm('Apakah anda ingin menghapus data ini..?')) {
            axios.delete(`http://127.0.0.1:4211/api/v1/product/${id}`).then(res => {
              alert(res.data.message);
              location.reload();
            });
          }
        }
    },
    components: { RouterLink }
}
</script>
