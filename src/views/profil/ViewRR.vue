<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Radreply
            <RouterLink to="/profil/buat" class="btn btn-primary float-end">
              Tambah Attribut
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
              <tr v-for="(radreply, index) in this.radreplys" :key="index">
                <td>{{ radreply.groupname }}</td>
                <td>{{ radreply.attribute }}</td>
                <td>{{ radreply.op }}</td>
                <td>{{ radreply.value }}</td>
                <td>
                    <button @click="deleteRadreply(radreply.id)" class="btn btn-danger mx-2" type="button">Hapus</button>
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
      name: 'radreplys',
      data() {
          return {
              radreplys: [],
          };
      },
      mounted() {
          this.getRadreplys();
      },
      methods: {
        getRadreplys() {
            axios.get(`http://127.0.0.1:4211/api/v1/profile/radreply/${this.$route.params.groupname}`).then(res => {
              this.radreplys = res.data.data;
            });
          },
          deleteRadreply(id) {
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
  