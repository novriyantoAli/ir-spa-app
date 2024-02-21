<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Radcheck
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
                    <input v-model="radcheck.groupname" type="text" class="form-control" placeholder="Tulis..." readonly>
                </div>
                <div class="col">
                    <label for="">Attribute</label>
                    <input v-model="radcheck.attribute" type="text" class="form-control" placeholder="Tulis...">
                </div>
                <div class="col-1">
                    <label for="">OP</label>
                    <input v-model="radcheck.op" type="text" class="form-control" placeholder="Tulis...">
                </div>
                <div class="col">
                    <label for="">Value</label>
                    <input v-model="radcheck.value" type="text" class="form-control" placeholder="Tulis...">
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
            errorList: '',
            radchecks: [],
            radcheck: {
                groupname: '',
                attribute: '',
                op: '',
                value: ''
            }
          };
      },
      mounted() {
        this.radcheck.groupname = this.$route.params.groupname;
        this.getRadchecks();
      },
      methods: {
        getRadchecks() {
            axios.get(`http://127.0.0.1:4211/api/v1/profile/radcheck/${this.$route.params.groupname}`).then(res => {
              this.radchecks = res.data.data;
            });
        },
        save(){
            axios.post(`http://127.0.0.1:4211/api/v1/profile/radcheck/${this.$route.params.groupname}`, this.radcheck).then(res => {
                alert(res.data.message);
                location.reload();
            });
        },
          deleteRadcheck(id) {
            if (confirm('Apakah anda ingin menghapus data ini..?')) {
              axios.delete(`http://127.0.0.1:4211/api/v1/profile/radcheck/${this.$route.params.groupname}/${id}`).then(res => {
                alert(res.data.message);
                location.reload();
              });
            }
          }
      },
      components: { RouterLink }
  }
  </script>
  