<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Paket
            <RouterLink to="/profil/buat" class="btn btn-primary float-end">
              Tambah Paket
            </RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Profil</th>
                <th>Prioritas</th>
                <th>Radcheck</th>
                <th>Radreply</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(profil, index) in this.profiles" :key="index">
                <td>{{ profil.groupname }}</td>
                <td>{{ profil.priority }}</td>
                <td>
                    <RouterLink :to="{ path: `/profil/radcheck/${profil.groupname}`}" class="btn btn-warning mx-2">Konfigurasi</RouterLink>
                </td>
                <td>
                    <RouterLink :to="{ path: `/profil/radreply/${profil.groupname}`}" class="btn btn-warning mx-2">Konfigurasi</RouterLink>
                </td>
                <td>
                    <button @click="deleteProfil(profil.groupname)" class="btn btn-danger mx-2" type="button">Hapus</button>
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
      name: 'profiles',
      data() {
          return {
              profiles: [],
          };
      },
      mounted() {
          this.getProfiles();
      },
      methods: {
          getProfiles() {
            axios.get('http://127.0.0.1:4211/api/v1/profile').then(res => {
              this.profiles = res.data.data;
            });
          },
          deletePaket(id) {
            // if (confirm('Apakah anda ingin menghapus data ini..?')) {
            //   axios.delete(`http://127.0.0.1:4211/api/v1/product/${id}`).then(res => {
            //     alert(res.data.message);
            //   });
            // }
          }
      },
      components: { RouterLink }
  }
  </script>
  