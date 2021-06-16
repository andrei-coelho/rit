<template>

    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h5>Result</h5>
                <hr class="m-0">
            </div>

            <div class="col-12 my-4" v-if="isLoading">
                <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
                </div> aguarde...
            </div>

            <div class="col-12" v-if="showHTML">
                <div class="row">
                    <div class="col-12 mt-2">
                        <p>Response:</p>
                    </div>

                    <div class="col-12">
                        <button class="btn btn-sm float-end btn-primary" @click="copy">copy</button>
                        <pre  class="prettyMarkContent prettyMarkDark" v-html="responseHTML"></pre>
                        <input id="copyEl" class="p-0" type="text" v-model="response" style="width:0px; height:0px; background-color:transparent;border:none;">
                    </div>
                </div>
            </div>

            <div class="col-12" v-if="showErrors">
                <div class="row">
                    <div class="col-12 mt-2">
                        <p class="text-danger">Error: <b>{{ codeError }}</b></p>
                    </div>
                    <div class="col-12">
                       {{ responseErros }} 
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

import prettyJSON from '../lib/prettyJSON.js'

export default {

    name:"Response",

    data(){
        return {
            showHTML: false,
            isLoading:false,
            showErrors: false,
            typeData: "text",
            responseHTML:"",
            responseErros:"",
            response:"",
            codeError:"",
            responsesHistory: []
        }
    },

    methods: {

        errors(str, parse = true, message = ""){
            this.isLoading = false;
            if(parse){
                try {
                    let obj = JSON.parse(str);
                    this.codeError = obj.code +" - "+ message;
                    str = obj.body;
                } catch(e){
                    this.codeError = e;
                }
                
            } else {
                this.codeError = message;
            }
            this.responseErros = str;
            this.showErrors = true;
            this.showHTML = false;
        },

        changeView(data){

            this.isLoading = false;

            this.response = data;
            this.responsesHistory.push(this.response);
            let res = prettyJSON(this.response);
            
            if(res){
                this.responseHTML = res;
                this.showErrors = false;
                this.showHTML = true;
            } else {
                this.errors(this.response, false, "A resposta do servidor não estpa em formato JSON")
            }

        },

        copy(){
            var copyEl = document.getElementById("copyEl");
            copyEl.select();
            document.execCommand("copy");
            alert("Texto copiado!");
        },

        loading(){
            this.showErrors = false;
            this.showHTML = false;
            this.isLoading = true;
        }

    }

}

</script>