<template>
    <div class="container-fluid ">
        <div class="row">
            <div class="col-12 p-0">
                <h5>Variáveis</h5>
                <hr class="m-0">
            </div>
            <div class="col-12">
                <div class="my-2">
                    <label for="uriInput" class="form-label text-clean"><b>URI</b></label>
                    <input v-model="uri" type="text" class="form-control text-white bg-dark border-0" id="uriInput" placeholder="request.php?var=1&var=2">
                </div>
                <div class="my-2">
                    <div class="form-floating bg-dark">
                        <select v-model="method" class="form-select bg-dark text-white border-0" id="floatingSelectGrid1">
                            <option class="text-white" value="get">GET</option>
                            <option class="text-white" value="post">POST</option>
                            <option class="text-white" value="options">OPTIONS</option>
                        </select>
                        <label for="floatingSelectGrid1">Method:</label>
                    </div>
                </div>

            </div>
            <div class="col-12">
                
                <div v-if="!showFormHeader" class="w-100 mt-1 ">
                    <label class="text-clean pe-2" for="autoSizingInputGroup"><b>Headers</b></label>
                    <button @click="showForm" class="btn btn-sm btn-primary p-0 px-2 ">+</button>
                </div>
                <div v-else class="w-100 mt-1">
                    <label class="text-clean pe-2" for="autoSizingInputGroup"><b>Headers</b></label>
                    <button @click="hideForm" class="btn btn-sm btn-danger text-white p-0 px-2 ">-</button>
                </div>

            </div>

            <div class="col-12 mt-2">
                
                <div v-if="showFormHeader" class="input-group">
                    <input type="text" v-model="headerNew.key" class="form-control bg-dark text-white" placeholder="key">
                    <input type="text" v-model="headerNew.val" class="form-control bg-dark text-white" placeholder="value">
                    <button @click="addHeader" class="btn btn-primary">add</button>
                </div>
                
            </div>

            <div class="col-12 mt-2">

                <div v-for="(el, index) in headers" :key="index" class="bg-dark px-3 py-1 my-1">
                    <button
                        @click="removeElement(index)"            
                        class="btn btn-sm btn-danger p-0 px-1 text-white float-end" 
                    >X</button>
                    <p class="p-0 w-100"><b>{{ el.key }}:</b> {{ el.val }}</p>
                </div>
                
            </div>

            <div class="col-12">
                <div class="form-floating">
                    <textarea v-model="body" class="form-control bg-dark text-white" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                    <label for="floatingTextarea2">Body (JSON)</label>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {

    name:"Variables",

    data(){
        return {
            headers:[],
            headerNew:{
                key:"",
                val:""
            },
            uri:"",
            method:"get",
            body:"",
            showFormHeader:false
        }
    },

    methods: {

        removeElement(index){
            this.headers.splice(index, 1);
        },

        hideForm(){
            this.showFormHeader = false;
        },

        showForm(){
            this.showFormHeader = true;
        },

        addHeader(){
            if(this.headerNew.key != "" && this.headerNew.val != ""){
                this.headers.push({key:this.headerNew.key, val:this.headerNew.val})
                this.headerNew.key = "";
                this.headerNew.val = "";
                this.showFormHeader = false;
            }
        },

        getObject(){
            var body = "";
            if(this.body.trim() != ""){
                try {
                    body = JSON.parse(this.body);
                } catch (e) {
                    return false;
                }
            } 
            return {
                headers:this.headers,
                uri:this.uri,
                method:this.method,
                body:body
            }
        }

    }

}

</script>