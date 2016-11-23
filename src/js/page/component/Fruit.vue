<template>
    <div class="select-area">
        <span class='select-item' @dragstart="drag($event)" :id="fruitdata.id" draggable='true'><img :src="fruitdata.img"><p>{{fruitdata.name}}</p></span>
        <slot></slot>
    </div>
</template>
<style>
    .select-area{
        display: inline-block;
        width: 80px;
        height: 180px;
    }
    .select-item{
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .select-item img{
        width: 100%;
    }
    .select-item p{
        text-align: center;
    }
</style>
<script>

    import DragTool_new from '../tool/DragTool'

    var dragTool = new DragTool_new({copy:true})

    export default {
        props:['fruitdata','dragstart'],
        methods:{
            handleClick:function(){
                console.log("asd");
            },
            drag:function(event){
                dragTool.drag(event);
            }
        }
    }
</script>