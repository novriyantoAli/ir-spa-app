<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Buat Voucher</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                    {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Reseller</label>
                    <select v-model="model.voucher.id_reseller" class="form-control" id="exampleFormControlSelect1">
                        <option>--</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Produk</label>
                    <select v-model="model.voucher.id_product" class="form-control" id="exampleFormControlSelect1">
                        <option v-for="product in products" v-bind:value="product.ID" >{{ product.Name }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Jumlah Voucher</label>
                    <input type="number" v-model="model.voucher.amount" class="form-control" />
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label for="sequentially">Berurutan.?</label>
                        <input id="sequentially" type="checkbox" v-model="model.voucher.sequentially" class="form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label for="upSame">Username dan Password Sama.?</label>
                        <input id="upSame" type="checkbox" v-model="model.voucher.up_same" class="form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="">Panjang Username</label>
                    <input type="number" v-model="model.voucher.l_uname" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Panjang Password</label>
                    <input type="number" v-model="model.voucher.l_psswd" class="form-control" />
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label for="number">Kombinasi Nomor(untuk username dan password)</label>
                        <input id="number" type="checkbox" v-model="model.voucher.number" class="form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label for="lowerCase">Kombinasi Huruf Kecil(untuk username dan password)</label>
                        <input id="lowerCase" type="checkbox" v-model="model.voucher.lower_case" class="form-check-input" />
                    </div>

                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label class="form-check-label" for="upperCase">Kombinasi Huruf Besar(untuk username dan password)</label>
                        <input id="upperCase" type="checkbox" v-model="model.voucher.upper_case" class="form-check-input" />
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <label class="form-check-label" for="activeInput">Langsung Aktiv.?</label>
                        <input type="checkbox" id="activeInput" v-model="model.voucher.active" class="form-check-input" />
                    </div>
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
        name: 'buatVoucher',
        data(){
            return {
                errorList: '',
                model: {
                    voucher: {
                        id_reseller: '--',
                        id_product: 0,
                        amount: 1,
                        sequentially: false,
                        up_same: true,
                        l_uname: 6,
                        l_psswd: 6,
                        number: true,
                        lower_case: true,
                        upper_case: false,
                        active: false
                    }
                },
                products: [],
            }
        },
        mounted() {
          this.getProducts();
        },
        methods: {
            getProducts() {
                axios.get('http://127.0.0.1:4211/api/v1/product').then(res => {
                    this.products = res.data.data;
                });
            },
            save(){
                console.log(this.model.voucher);
                var mythis = this;
                axios.post('http://127.0.0.1:4211/api/v1/voucher', this.model.voucher).then(res => {
                    alert(res.data.message);
                    this.model.voucher = {
                        id_reseller: '--',
                        id_product: 0,
                        amount: 1,
                        sequentially: false,
                        up_same: true,
                        l_uname: 6,
                        l_psswd: 6,
                        number: true,
                        lower_case: true,
                        upper_case: false,
                        active: false
                    }
                    this.$router.push({ name: 'voucher' });
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
      