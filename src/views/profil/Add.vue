<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Buat Paket</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                    {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Profil</label>
                    <input type="text" v-model="model.profil.username" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Prioritas</label>
                    <input type="number" v-model="model.profil.priority" class="form-control" />
                </div>
                <div class="mb-3">
                    <button @click="save" type="button" class="btn btn-primary">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
    import axios from 'axios';
    export default {
        name: 'buatProfil',
        data(){
            return {
                errorList: '',
                model: {
                    profil: {
                        username: '',
                        priority: 1
                    }
                }
            }
        },
        methods: {
            save(){
                var mythis = this;
                axios.post('http://127.0.0.1:4211/api/v1/profile', this.model.profil).then(res => {
                    alert(res.data.message);
    
                    this.model.profil = {
                        username: '',
                        priority: 1
                    }

                    this.$router.push({ name: 'profil' });
                }).catch(function(error){
                    if(error.response){
                        if (error.response.status === 422) {
                            mythis.errorList = error.response.data.data;
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error: ", error.message);
                    }
                });
            }
        }
    }
    </script>
      