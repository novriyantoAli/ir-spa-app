<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Radreply
          </h4>
        </div>
        <div class="card-body">
            <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                    {{ error[0] }}
                </li>
            </ul>
            <div class="row">
                <div class="col-4">
                    <label for="">Groupname</label>
                    <input v-model="radreply.groupname" type="text" class="form-control" placeholder="Tulis..." readonly>
                </div>
                <div class="col">
                    <label for="">Attribute</label>
                    <input v-model="radreply.attribute" type="text" class="form-control" placeholder="Tulis...">
                </div>
                <div class="col-1">
                    <label for="">OP</label>
                    <input v-model="radreply.op" type="text" class="form-control" placeholder="Tulis...">
                </div>
                <div class="col">
                    <label for="">Value</label>
                    <input v-model="radreply.value" type="text" class="form-control" placeholder="Tulis...">
                </div>
            </div>
            <br />
            <button @click="save" type="button" class="btn btn-primary">Simpan</button>
            <br />
            <br />
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
            errorList: '',
            radreplys: [],
            radreply: {
                groupname: '',
                attribute: '',
                op: '',
                value: ''
            }
          };
      },
      mounted() {
        this.radreply.groupname = this.$route.params.groupname;
        this.getRadreplys();
      },
      methods: {
        getRadreplys() {
            axios.get(`http://127.0.0.1:4211/api/v1/profile/radreply/${this.$route.params.groupname}`).then(res => {
              this.radreplys = res.data.data;
            });
        },
        save(){
            axios.post(`http://127.0.0.1:4211/api/v1/profile/radreply/${this.$route.params.groupname}`, this.radreply).then(res => {
                alert(res.data.message);
                location.reload();
            });
        },
          deleteRadreply(id) {
            if (confirm('Apakah anda ingin menghapus data ini..?')) {
              axios.delete(`http://127.0.0.1:4211/api/v1/profile/radreply/${this.$route.params.groupname}/${id}`).then(res => {
                alert(res.data.message);
                location.reload();
              });
            }
          }
      },
      components: { RouterLink }
  }
  </script>
  