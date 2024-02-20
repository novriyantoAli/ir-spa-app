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
                <th>Groupname</th>
                <th>Attribute</th>
                <th>OP</th>
                <th>Value</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(radcheck, index) in this.radchecks" :key="index">
                <td>{{ radcheck.groupname }}</td>
                <td>{{ radcheck.attribute }}</td>
                <td>{{ radcheck.op }}</td>
                <td>{{ radcheck.value }}</td>
                <td>
                    <button @click="deleteRadcheck(radcheck.id)" class="btn btn-danger mx-2" type="button">Hapus</button>
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
      name: 'radchecks',
      data() {
          return {
              radchecks: [],
          };
      },
      mounted() {
          this.getRadchecks();
      },
      methods: {
        getRadchecks() {
            axios.get(`http://127.0.0.1:4211/api/v1/profile/radcheck/${this.$route.params.groupname}`).then(res => {
              this.radchecks = res.data.data;
            });
          },
          deleteRadcheck(id) {
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
  