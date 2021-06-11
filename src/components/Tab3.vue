<template>

    <div class="container-fluid">
        <div class="row">

            <div class="col-12">
                <h5>Response</h5>
                <hr class="m-0">
            </div>

            <div class="col-12" v-if="showHTML">
                <button class="btn btn-sm float-end btn-primary" @click="copy">copy</button>
                <pre  class="prettyMarkContent prettyMarkDark" v-html="responseHTML"></pre>
                <input id="copyEl" class="p-0" type="text" v-model="response" style="width:0px; height:0px; background-color:transparent;border:none;">
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
            typeData: "text",
            responseHTML:"",
            response:"",
            responsesHistory: []
        }
    },

    methods: {
        changeView(data){

            this.response = data;
            this.responsesHistory.push(this.response);
            this.responseHTML = prettyJSON(this.response);
            this.showHTML = true;

        },

        copy(){
            var copyEl = document.getElementById("copyEl");
            copyEl.select();
            document.execCommand("copy");
            alert("Texto copiado!");
        }

    }

}

</script>