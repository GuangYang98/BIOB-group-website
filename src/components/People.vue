<template>
  <div style="width: 100%; margin: 0 auto ">
        <!--first part-->
        <div class="context">
            <div class="openning">
                <div class="ql-editor" style="margin: 2vw;" v-html="announcement"></div>
            </div>

            <div class="page">

          <a name="current" style="position: relative; "></a><h1>Current Members</h1>
          <div class="mem" style="height: 25vw; margin: 3vw">
                  <div style="float: left">
                    <img src="../../static/PersonalPhoto.jpeg" style="height:21vw; float:left; margin-right: 3vw; border-radius: 2vw">
                    <br>
                  </div>
                  <div style="width: 60vw; float: left;">
                      <h3><b>James G. Fujimoto</b></h3>
                      <p STYLE="font-weight: bold">Professor of Electrical Engineering</p><br>
                    <p style="width: 65vw">Professor Fujimoto is a fellow of the National Academy of Engineering, National Academy of Science and American Association for the Advancement of Science.  He received the 1999 Discover Magazine Award for Technological Innovation, is co-recipient of the 2001 Rank Prize in Optoelectronics, received the 2011 Zeiss Research Award and is co-recipient of the 2012 Champalimaud Vision Award.</p>
                  </div>
          </div>

          <br>

          <div style="margin: 0vw 0vw 3vw 5vw">
          <div class="single-member effect-4" v-for="i in tab1" v-if="i.pname !== 'Fujimoto, James G.'">
            <div class="member-info">
              <h3>{{i.pname}}</h3>
              <p>{{i.ptitle}}</p>
            </div>
            <div class="member-image">
              <img v-if="i.pic===null || i.pic === ''" src="../../static/member_270x210.jpg" alt="Member">
              <img v-else :src="getImageUrl(i.pic)" alt="Member" >
            </div>
            <div class="more-info">
              <p>{{i.pintro}}</p>
              <div class="social-touch icon-colored">
                <a class="fb-touch" :href="i.flink"></a>
                <a class="tweet-touch" :href="i.tlink"></a>
                <a class="linkedin-touch" :href="i.llink"></a>
                <a class="scholar-touch" :href="i.glink"/>
                <a class="email-touch" :href="'mailto: '+i.pemail"/>
              </div>
            </div>
          </div>
          </div>

        <div id="people-part2" style="float: left">
          <h1>Collaborators</h1>
            <div class="pbitem" v-for="n in tab2">
                <h5 style="font-weight: bold"  v-if="n.ptitle == null"><a :href="n.plink"><b>{{n.pname}}</b></a></h5>
                <h5  style="font-weight: bold" v-else><a :href="n.plink"><b>{{n.pname}},{{n.ptitle}}</b></a></h5>
                <p>{{n.pintro}}</p>
              </div>
            </div>


        <!--third part-->
        <div id="people-part3" style="width:100%;">
          <h1>Alumni</h1>
                <el-row v-for="n in (Math.ceil(tab3.length/3))" no-gutters style="margin-bottom: 2vw">
                    <el-col :span="8" v-for="i in tab3.slice(n*3-3, n*3-3+((tab3.length-n*3+3 >= 3)?3:tab3.length-n*3+3))">
                        <h5 style="font-weight: bold;"><a v-if="i.plink!=null" :href="i.plink">{{i.pname}}</a>
                        <span v-else>{{i.pname}}</span></h5>
                        {{i.ptitle}}
                            <p>{{i.pintro}}</p>
                    </el-col>
                </el-row>
          </div>
        </div>
        </div>
  </div>
</template>

<script>
    import axios from "axios";


    export default {
        name: "People",
      data () {
        return {
            announcement:'',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            tab1: [],
            tab2: [],
            tab3: [],
        }
      },
      mounted() {
        document.documentElement.scrollTop = document.body.scrollTop = 0
        this.getPeople1();
        this.getPeople2();
        this.getPeople3();
        this.getAnnounce();
      },
      methods: {
          getAnnounce() {
              axios.get(`https://www.rle.mit.edu/boib/labserver/api/cont/Announcement`)
                  .then(response => {
                      this.announcement = response.data;
                      console.log(this.news);
                  })
          },
        getImageUrl(item) {
          var url = "https://www.rle.mit.edu/boib/labserver/api/" + item + '?t='+(+new Date());
          return url;
        },
        getPeople1(){
          axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/people/1`)
                  .then(response => {
                    this.tab1 = response.data;
                    console.log(this.tab1);
                  })
        },
        getPeople2(){
          axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/people/2`)
                  .then(response => {
                    this.tab2 = response.data;
                    console.log(this.tab2);
                  })
        },
        getPeople3(){
          axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/people/3`)
                  .then(response => {
                    this.tab3 = response.data;
                    console.log(this.tab3);
                    console.log(this.tab3.length);
                  })
        },
      }
    }
</script>

<style scoped>
  #people-part2, #people-part3{
    width: 90%;
  }

  #people-part2 {
    padding-top: 5vw;
    width: 100%;
    padding-bottom: 5vw;
  }
  #right-link ul{
    padding-inline-start: 0;
    list-style-type:circle;
    font-size: 20px;
    font-weight: bold;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  #right-link li{
    line-height: 1.5em;
  }
  #right-link a:visited, a:link{
    text-decoration: none;
    color: #475669;
}
  #right-link a:hover, a:active{
    text-decoration: none;
    color: darkgoldenrod;
  }
  .card{
    transition: 0.3s ;
    border-radius: 10px;
    border: 1px solid #475669 ;
    float: left;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
  }
  .card:hover{
    box-shadow: 0 6px 6px rgba(0, 0, 0, .4);
    border-color: #eee;
    transition: all .2s ease-in-out;
  }
#alumni-card{

}

  /*= effect-4 css =*/
  .effect-4{max-height: 25.9vw; min-height: 25.9vw ; overflow: hidden;}
  .effect-4 h3{line-height: 3.5vw;}
  .effect-4 .member-image{position: absolute; width: 100%; transition: 0.4s;}
  .effect-4 .member-image img{width: 100%;}
  .effect-4 .more-info{height: 0; transition: 0.4s; overflow: hidden; z-index: 9; position: relative; background-color: #fff;}
  .effect-4:hover .more-info{height: 20vw; transition: 0.4s;}
  /*= effect-4 css end =*/

  @media only screen and (max-width: 980px){
    .row{width: 100%; margin: 110px 0;}
    .team-members{text-align: center;}
    .single-member{float: none; display: inline-block; vertical-align: bottom;}
  }


.single-member{width: 25vw; float: left; background-color: #fff; text-align: center; position: relative; margin-right: 30px; margin-left: 0; margin-bottom: 30px;border-radius: 20px; text-overflow: ellipsis}
.member-image img{max-width: 100%; vertical-align: middle;}
.social-touch a{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px; background-image: url("../../static/social-icons.png"); background-repeat: no-repeat; opacity: 0.3; transition: 0.3s;}
.social-touch a:hover{opacity: 1; transition: 0.3s;}
.fb-touch{background-position: 0 0;}
.tweet-touch{background-position: -35px 0;}
.linkedin-touch{background-position: -71px 0;}
.scholar-touch{background-position: -106px 0;}
.email-touch{background-position: -141px 0;}
.icon-colored .fb-touch{background-position: 0 -27px;}
.icon-colored .tweet-touch{background-position: -35px -27px;}
.icon-colored .linkedin-touch{background-position: -71px -27px;}
.icon-colored .scholar-touch{background-position: -106px -27px;}
.icon-colored .email-touch{background-position: -141px -27px;}
.timeline1 li {
  transition: all 200ms ease-in;
}
  .pbitem {
      border: #1d8cb0 1px solid;
      padding: 5px;
      margin-bottom: 20px;
      border-radius: 20px;
      float: left;
      width :100%
  }
  .pbitem2{
      padding: 5px;
      border-radius: 20px;
      float: left;
      width: 33%;
      height: auto;
      overflow: hidden;
      margin-bottom: 2vw;
  }
  .three-line{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
  }
  .openning{
      width: 90%;
      border: 4px dotted white;
      padding: 10px;
      border-radius: 20px;
      margin: 20px auto;
  }
    .page{
        margin: 0 auto;
        width: 90%;
    }

</style>

