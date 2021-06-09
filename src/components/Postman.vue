<template>
    <div class="container-fluid">
        <div class="row border" style="height:102%; width: 101%; position:fixed; top: -1%">
            <div class="col-3 bg-light text-white overflow-auto p-0" style="height:100%;">
                <!-- Tab1 -->
                <DocumentMenu/>
                <Tab1 
                    :projectSlug="projectSlug"
                    @changeConfig="onChangeConfig"
                />
            </div>
            <div class="col-4 bg-secondary text-white overflow-auto" style="height:100%;" >
                <!-- Tab2 -->
                <Tab2
                    @changeVariables="onChangevariables"
                />
            </div>
            <div class="col-5 bg-dark text-white overflow-auto" style="height:100%;" >
                <!-- Tab3 -->
                
            </div>
        </div>
    </div>

</template>

<script>

import DocumentMenu from './DocumentMenu.vue'
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'

export default {

    components:{DocumentMenu, Tab1, Tab2},

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
        }
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