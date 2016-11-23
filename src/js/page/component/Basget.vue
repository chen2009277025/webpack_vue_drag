<template>
    <div class='drag-content'>
        <div class='project-content'>
            <p class="title">水果趴,喜欢谁就退拽给谁:</p>
            <Fruit v-for='pjdt in projectdatas' :fruitdata="pjdt"><p @click="handleClick" :id="pjdt.id">{{pjdt.num}}</p></Fruit>
        </div>
        <div class='people-content'>
            <div class='select-project-item' v-for='(ppdt,ppindex) in peopledata'>
                <label class='drag-people-label'>{{ppdt.name}}:</label>
                <div class="people-logo"><img :src="ppdt.img"></div>
                <div class='drag-div' @drop='drop($event)' @dragover='allowDrop($event)' :peoplename="ppdt.name">

                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .tem {
        background: #eee;
    }

    .drag-div {
        height: 150px;
        background: beige;
    }

    .title{
        font-size:18px;
        color: coral;
    }

    .people-logo{
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .people-logo img{
        width: 100%;
    }
</style>
<script>

    import Vue from 'vue'

    import DragTool_new from '../tool/DragTool';

    var dragTool = new DragTool_new({copy:true})

    import Fruit from './Fruit.vue';

    import grap from '../../../img/grap.png'
    import liulian from '../../../img/liulian.png'
    import mangguo from '../../../img/mangguo.png'
    import mugua from '../../../img/mugua.png'

    import liushishi from '../../../img/liushishi.jpg'
    import linzhiling from '../../../img/linzhiling.jpg'
    import huanbo from '../../../img/huanbo.jpg'
    import zhoujielun from '../../../img/zhoujielun.jpg'

    export default {
        components: {
            Fruit
        },
        ready: function () {
        },
        props: {
            name: {
                validator: function (val) {
                    return val == 'chen'
                }
            }
        },
        methods: {
            drop: function(ev){
                let showNotice = `要给水果?`;
                if(window.confirm(showNotice)){
                    dragTool.drop(ev,this.miniteNum);
                }
            },
            allowDrop: function(ev){
                dragTool.allowDrop(ev);
            },
            handleClick: function (ev) {
                var _slef = this;
                var target = ev.target;
                for(var i = this.projectdatas.length-1;i >= 0;--i){
                    if(target.id == this.projectdatas[i].id){
                        if(this.projectdatas[i].num >= 20){
                            window.alert("满了满了,都要溢出来了?");
                            return false;
                        }
                        this.projectdatas[i].num++;
                        return true;
                    }
                }
            },
            miniteNum:function(dragTarget){
                for(var i = this.projectdatas.length-1;i >= 0;--i){
                    if(dragTarget.id == this.projectdatas[i].id){
                        if(this.projectdatas[i].num <= 0){
                            window.alert("木有水果了,点击添加水果?");
                            return false;
                        }
                        this.projectdatas[i].num--;
                        return true;
                    }
                }
                return false;
            }
        },
        computed: {
            showTem: function () {
                return this.age % 2 == 1
            }
        },
        data() {
            return {
                projectdatas: [{
                    id: 1,
                    name: '葡萄',
                    num:12,
                    img: grap
                }, {
                    id: 2,
                    name: '芒果',
                    num:2,
                    img: mangguo
                }, {
                    id: 3,
                    name: '木瓜',
                    num:1,
                    img: mugua
                }, {
                    id: 4,
                    name: '榴莲',
                    num:2,
                    img: liulian
                }],
                peopledata: [{
                    id: 1,
                    name: '刘诗诗',
                    img:liushishi
                }, {
                    id: 2,
                    name: '周杰伦',
                    img:zhoujielun
                }, {
                    id: 3,
                    name: '黄渤 ',
                    img:huanbo
                }, {
                    id: 3,
                    name: '林志玲',
                    img:linzhiling
                }],
                age: 12
            }
        }
    };
</script>