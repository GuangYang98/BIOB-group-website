<template>
  <div>
      <div style="width: 100%; display: block">
          <div style="width: 50%; float:left; margin-top:3.5vw;">
              <div  style="display: block; text-align: center">
                  <img style="width: 30vw;" src="../../static/1580800817485591111.png"/><img src="../../static/EECS_LOGO.png" style="width: 10vw;"><br>
                  Biomedical Optical Imaging and Biophotonics Group<br><br>
                  <strong style="font-size: large">Principle Investigator James G. Fujimoto</strong> <br><br>
                  <hr style="background-color: #f2b77b; width: 15vw; height: 5px; margin:5px auto"> <br>
              </div>
              <div style="display: block; margin: 0vw 5vw 0vw 5vw;">
                  <p style="float: left;">{{tab[0].intro}}</p>
              </div>
          </div>
          <div style="width: 50%; float:left; margin-top: 1vw;" >
              <iframe style="width: 100%; height: 400px"  src="https://www.youtube.com/embed/oPv095on5qg?wmode=opaque&autohide=1&autoplay=1&volume=0&vol=0&mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>

      <div style=" margin:5vw auto; text-align: center; width: 100%; display: block; float: left;" id="mainresarch">
          <h1 style="text-align: center;"><strong>Research</strong></h1>
          <hr style="background-color: #f2b77b; width: 15vw; height: 5px; margin:5px auto">
          <div class = "Circle item" data-aos="fade-right" data-aos-offset="200">
              <a @click="$router.push('../Research?=Ophthalmology')"><img src="../../static/Ophthalmology.png">
                  <h2>Ophthalmology</h2>
                  <div class="mask"><before></before><after></after><p class="circlecontent">{{tab[2].intro}}</p><br><el-button  round>More</el-button></div></a>
          </div>
          <div class = "Circle item">
              <a @click="$router.push('../Research?=Endoscopy')"><img src="../../static/Endoscopic.png">
                  <h2>Endoscopy</h2>
                  <div class="mask"><before></before><after></after><p class="circlecontent">{{tab[3].intro}}</p><br><el-button  round>More</el-button> </div></a>
          </div>
          <div class = "Circle item" data-aos="fade-left" data-aos-offset="0">
              <a @click="$router.push('../Research?=Microscopy')"><img src="../../static/Microscopy.png" title="Microscopy">
                  <h2>Nonlinear Microscopy</h2>
                  <div class="mask"><before></before><after></after><p class="circlecontent">{{tab[1].intro}}</p><br><el-button  round>More</el-button></div></a>
          </div>
      </div>

      <div class="container-right" >
          <h1 style="text-align: center;"><strong>History of Optical Coherence Tomography</strong></h1>
          <hr style="background-color: #f2b77b; width: 15vw; height: 5px; margin:30px auto">
          <div class="timeline">
            <div class="swiper-slide" v-for="item in steps">
              <div class="timestamp">
              <span class="date">{{item.dateLabel}}</span>
              </div>
              <div class="status">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
      </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import AOS from 'aos'

  AOS.init({
      duration: 1200,
  });

  export default {
      name: "home",
      data() {
        return {
          tab:[],
          items: [
            {url: require('../../static/logo.png')},
            {url: "/static/WechatIMG25913.jpeg"},
            {url: "../../static/WechatIMG25917.jpeg"}
          ],
          steps : [
            {dateLabel: '1990', title: 'Invented Invented Optical Coherence Tomography(OCT)'},
            {dateLabel: 'Same-time', title: 'Founded a startup, LightLab Imaging'},
            {dateLabel: 'Later', title: 'Commercialize development and applications of OCT'},
            {dateLabel: 'Then', title: 'Working with New England Eye Center in Ophthalmology clinical study by OCT'},
            {dateLabel: 'Today', title: 'more than 20 companies develop OCT'}
          ]
        }
      },
      mounted() {
        this.getGroup();
      },
      methods: {
        getGroup(){
          axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/group`)
                  .then(response => {
                    this.tab = response.data;
          })
        },
    }
    }
</script>

<style>
    .main{
        padding: 90px 0 100px;
        height: auto;
        z-index: 0;
    }
    .container-right{
        width: 100%;
        margin: 0 auto;
        line-height: 1.75;
        float: left;
    }
    .Circle img {
        height: 350px;
        float: left;
        padding: 20px 1px;
    }
    .Circle{
        display: inline-block;
        position: relative;
    }
    .mask{
         position: absolute;
         height: 310px;
         width: 310px;
         top: 20px;
         left: 2px;
         border-radius: 149px;
         background: rgba(255,255,255,.8);
         opacity: 0;
         text-overflow: ellipsis;
     }
    .Circle a:hover .mask {
        transition: all .6s ease-in-out;
        clip-path: circle(75%);
        opacity: 1;
    }
    @media only screen and (max-width: 980px){
        .row{width: 100%; margin: 110px 0;}
        .team-members{text-align: center;}
        .single-member{float: none; display: inline-block; vertical-align: bottom;}
    }

    .timeline {
        margin: 5vw auto;
        width: 80vw;
        list-style-type: none;
        display: flex;
        padding: 0;
        text-align: center;
    }
    .timeline li {
        transition: all 200ms ease-in;
    }
    .timestamp {
        width: 15vw;
        margin-bottom: 20px;
        display: flex;
        font-size: 1.5vw;
        flex-direction: column;
        align-items: center;
    }
    .status {
        padding: 0 1vw;
        display: flex;
        justify-content: center;
        border-top: 4px solid #3e70ff;
        position: relative;
        transition: all 200ms ease-in ;
    }

    .status span {
        font-weight: 100;
        padding-top: 20px;
        font-size: 1vw;
    }
    .status span:before {
        content: '';
        width: 25px;
        height: 25px;
        background-color: #e8eeff;
        border-radius: 25px;
        border: 4px solid #3e70ff;
        position: absolute;
        top: -15px;
        left: 42%;
        transition: all 200ms ease-in;
    }
    .swiper-slide {
        width: 200px;
        text-align: center;
    }
    .swiper-slide:nth-child(2n) {
        width: 40%;
    }
    .swiper-slide:nth-child(3n) {
        width: 20%;
    }
    #mainresarch{
        background-color: rgba(255,255,255,0.4);
    }
    .circlecontent{
        height: 200px;
        width: 300px;
        text-align: center;
    }
    before {
        float: left;
        width: 50%; height: 100%;
        shape-outside: radial-gradient(farthest-side ellipse at right, transparent 100%, red);
    }
    after {
        float: right;
        width: 50%; height: 100%;
        shape-outside: radial-gradient(farthest-side ellipse at left, transparent 100%, red);
    }

</style>
