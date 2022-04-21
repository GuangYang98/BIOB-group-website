<template>
  <div id="interiorcontent">
    <div>
      <h1></h1>
    </div>
    <div id="contact-left">
      <div >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><b>Principle Professor</b></span>
          </div>
          <div class="text">
            <strong>James G. Fujimoto</strong><br>
            Room 36-361<br>
            Massachusetts Institute of Technology<br>
            77 Massachusetts Avenue.<br>
            Cambridge, MA 02139<br>
            jgfuji-at-mit-dot-edu<br><br>
            <strong>TEL: </strong>617-dot-253-dot-8528<br>
            <strong>FAX: </strong>617-dot-253-dot-9611
          </div>
        </el-card>
      </div>


      <div >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><b>Administrative Assistant</b></span>
          </div>
          <div class="text">
            <strong>Dorothy A. Fleischer</strong><br>
            Room 36-345<br>
            77 Massachusetts Avenue<br>
            Cambridge, MA 02139<br>
            dotf@mit.edu<br><br>
            <strong>TEL: </strong>617.253.1570<br>
            <strong>TAX: </strong>617.253.9611<br>
          </div>
        </el-card>
      </div>
    </div>
    <div id = "contact-right">
      <iframe style="border: 0; width:60vw; height:45vw" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2948.117453203168!2d-71.0920689!3d42.3613361!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370abdb5abad9%3A0xf77ea85672e15a0!2s50+Vassar+St!5e0!3m2!1sen!2sus!4v1401482223663"  frameborder="0">
      </iframe>
      <div id="location">
        <span>Location</span>
      </div>
      <div class="text">
        <a href="http://whereis.mit.edu/?go=36"><strong>Building 36-345</strong></a><br>
        Massachusetts Institute of Technology<br>
        77 Massachusetts Avenue.<br>
        Cambridge, MA 02139<br>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "Contact"
  }

</script>

<style>
  #interiorcontent {
    margin: 1vw auto 0 auto;
  }
  #contact-left{
    float: left;
    margin-left: 3vw;
  }
  #contact-right{
    float: right;
    padding-top: 1vw;
    margin-right: 3vw;
  }
  .box-card {
    width: 30vw;
    padding-bottom: 1vw;
    background-color: transparent;
    border: #1d8cb0 3px solid;
    border-radius: 2vw;
    margin: 1vw 3vw 5vw auto;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    margin-bottom: -1.5vw;
  }
  /*#card span{*/
  /*  font-size: 18px;*/
  /*  font-weight: bold;*/
  /*}*/
  #location{
    margin-top: 2vw;
  }
</style>
