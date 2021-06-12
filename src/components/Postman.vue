<template>
    <div class="container-fluid">
        <div class="row border" style="height:102%; width: 101%; position:fixed; top: -1%;">
            <div class="col-3 bg-light text-white overflow-auto p-0" style="height:100%; padding: 1%;">
                <!-- Tab1 -->
                <DocumentMenu/>
                <Tab1 
                    :projectSlug="projectSlug"
                    @changeConfig="onChangeConfig"
                    @play="onPlay"
                />
            </div>
            <div class="col-4 bg-secondary text-white overflow-auto" style="height:100%; padding: 1%;" >
                <!-- Tab2 -->
                <Tab2 ref="Variables"/>
            </div>
            <div class="col-5 bg-dark text-white overflow-auto" style="height:100%;  padding: 1%;" >
                <!-- Tab3 -->
                <Tab3 ref="Response"/>
            </div>
        </div>
    </div>

</template>

<script>

import DocumentMenu from './DocumentMenu.vue'
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'
import Tab3 from './Tab3.vue'

export default {

    components:{DocumentMenu, Tab1, Tab2, Tab3},

    data(){
        return {
            projectSlug:"hunter",
            objBase:{},
            variables:{}
        }
    },

    methods: {

        onChangeConfig(obj){
            this.objBase = obj;
        },

        onChangevariables(obj){
            this.variables = obj;
        },

        onPlay(obj){
            this.objBase = obj;
            this.variables = this.$refs['Variables'].getObject();
            this.run();
        },

        run(){
            
            var obj = this.objBase;
            var variables = this.variables; 

            var headers = new Headers();
            
            if(obj.headers){
                Object.keys(obj.headers).forEach(item => {
                    headers.append(item, obj.headers[item]);
                })
            }
            
            variables.headers.forEach(item => {
                headers.append(item.key, item.val);
            })
            
            var init = {
                method:variables.method,
                headers:headers
            };

            if(variables.method != 'get'){
                init['body'] = variables.body
            }

            var request = obj.base_url+variables.uri;

            fetch(request, init)
            .then(response => response.text())
            .then(data => {
                this.$refs['Response'].changeView(data)
            })
            .catch(err => console.log(err));

        },

    }

}

</script>

<style>

body::-webkit-scrollbar {
  width: 11px;
}
body {
  scrollbar-width: thin;
  scrollbar-color: #403B4F #2D2839;
}
body::-webkit-scrollbar-track {
  background: #2D2839;
}
body::-webkit-scrollbar-thumb {
  background-color: #403B4F ;
  border-radius: 6px;
  border: 3px solid #2D2839;
}
</style>