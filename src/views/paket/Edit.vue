<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Ubah Paket</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                    {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Nama</label>
                    <input type="text" v-model="model.paket.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Satuan</label>
                    <input type="text" v-model="model.paket.val_unit" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Nilai</label>
                    <input type="number" v-model="model.paket.val_val" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Harga</label>
                    <input type="number" v-model="model.paket.price" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Profil</label>
                    <input type="text" v-model="model.paket.profile" class="form-control" />
                </div>
                <div class="mb-3">
                    <button @click="update" type="button" class="btn btn-primary">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    </template>
    <script>
    import axios from 'axios';
    export default {
        name: 'buatPaket',
        data(){
            return {
                errorList: '',
                id : '',
                model: {
                    paket: {
                        name: '',
                        val_unit: '',
                        val_val: 0,
                        price: 0,
                        profile: ''
                    }
                }
            }
        },
        mounted(){
            this.getDetail(this.$route.params.id);
            this.id = this.$route.params.id;
        },
        methods: {
            getDetail(id){
                axios.get('http://127.0.0.1:4211/api/v1/product/' + id + '/detail').then(res => {
                    console.log(res.data.data[0]);
                    this.model.paket = res.data.data[0];
                }).catch(function(error){
                    if(error.response){
                        if (error.response.status === 422) {
                            alert(error.response.data.message);
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error: ", error.message);
                    }
                });
            },
            update(id){
                var mythis = this;
                axios.put('http://127.0.0.1:4211/api/v1/product/' + id, this.model.paket).then(res => {
                    console.log(res);
    
                    alert(res.data.message);
    
                    this.model.paket = {
                        name: '',
                        val_unit: '',
                        val_val: 0,
                        price: 0,
                        profile: ''
                    }
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