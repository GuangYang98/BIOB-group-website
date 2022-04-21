<template>
    <div>
        <div class="research-header">
            <img v-bind:src="group.length>0?group[picIndex].pic:null" style="width: 100%; height:20vw">
        </div>

        <div style="text-align: center;">
            <Tabs v-model="groupTab" @on-click="setNextTab" style="top:0; margin-bottom: 0;">
                <TabPane label="Optical Coherence Tomography" name="name1" ></TabPane>
                <TabPane label="Ophthalmology" name="name2" ></TabPane>
                <TabPane label="Endoscopy" name="name3" ></TabPane>
                <TabPane label="Nonlinear Microscopy" name="name4" ></TabPane>
            </Tabs>
        </div>


        <div class="research-content">
            <div style="margin: 10px auto; width: 100%; padding-top: 90px; padding-bottom: 100px;">
                <div style="margin: 0 10vw;" class="ql-editor" v-html="cont"></div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "Research",
        inject: ['reload'],
        data () {
            return {
                // content: "",
                // Ophthalmologycontent: "",
                // Endoscopycontent:"",
                // Microscopycontent :"",
                picIndex: 0,
                cont: "",
                tab: "",
                group: [],
                groupTab: "",
            }
        },
        methods: {
            setGroupTab: function (name) {
                if (name === "OCT") {
                    this.picIndex = 0;
                    this.cont = this.content;
                    this.groupTab = "name1";
                } else if (name === "Ophthalmology") {
                    this.picIndex = 2;
                    this.cont = this.Ophthalmologycontent;
                    this.groupTab = "name2";
                } else if (name === "Endoscopy") {
                    this.picIndex = 3;
                    this.cont = this.Endoscopycontent;
                    this.groupTab = "name3";
                } else if (name === "Microscopy") {
                    this.picIndex = 1;
                    this.cont = this.Microscopycontent;
                    this.groupTab = "name4";
                }
                //console.log(this.cont);
            },
            setNextTab: function (name) {
                if (name === "name1") {
                    this.$router.push('../Research?=OCT');
                } else if (name === "name2") {
                    this.$router.push('../Research?=Ophthalmology');
                } else if (name === "name3") {
                    this.$router.push('../Research?=Endoscopy');
                } else if (name === "name4") {
                    this.$router.push('../Research?=Microscopy');
                }
                this.reload();
                //console.log(this.cont);
            },
            getImageUrl(item) {
                var url = "https://www.rle.mit.edu/boib/labserver/api/" + item + '?t='+(+new Date());
                return url;
            },
        },
        mounted() {
            // 获取 被访问时的 url
            let place = location.href;
            // 获取该url  = 后面的数字 （id）
            try {
                this.tab = place.split('?')[1].split("=")[1];
            } catch(e) {
                this.tab = "OCT"
            }
            axios.post("https://www.rle.mit.edu/boib/labserver/api/table/record");
            this.setGroupTab(this.tab);
            axios.get("https://www.rle.mit.edu/boib/labserver/api/table/group").then((res)=> {
                this.group = res.data;
                axios.get("https://www.rle.mit.edu/boib/labserver/api/cont/OCT").then((res) => {
                    this.content = res.data;
                    axios.get("https://www.rle.mit.edu/boib/labserver/api/cont/Ophthalmology").then((res) => {
                        this.Ophthalmologycontent = res.data;
                        axios.get("https://www.rle.mit.edu/boib/labserver/api/cont/Endoscopy").then((res) => {
                            this.Endoscopycontent = res.data;
                            axios.get("https://www.rle.mit.edu/boib/labserver/api/cont/Microscopy").then((res) => {
                                this.Microscopycontent = res.data;
                                this.setGroupTab(this.tab);
                            })
                        })
                    })
                })
            })
        }
    }
</script>

<style>
    p{
        line-height: 1.75;
        font-size: 1em;
    }
    .research-header{
        width: 100%;
        height: 20vw;
        top: ;
        left: 0;
    }
    .research-content{
        background-color: rgba(255,255,255,0.3);
        margin-top: -30px;
    }

    .ivu-tabs-nav-container{
        font-size:1vw!important;
    }

    .ivu-tabs-nav-warp {
        text-align: center;
    }

    .ivu-tabs-nav-scroll {
        display: inline-block;
    }
    tabpane{
        margin-bottom: 0;
    }

</style>
