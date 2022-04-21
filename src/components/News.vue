<template>
  <div id="newscontent" >

    <h1 style="margin-top: 3vw;">News</h1>


      <card class="inword" v-for="i in news" :key="i" style="border: #1d8cb0 2px solid; border-radius: 2vw ">


        <div v-if="i.plink !=null">
          <p style="font-weight: bold">{{i.time}}</p>
          <img style="float: right; width: 15vw" :src="i.plink">
            <p v-if="i.tlink!=null"><a :href="i.tlink" style="font-weight: bold;">{{i.title}}</a></p>
            <p v-else>{{i.title}}</p>
            <p v-if="i.intro!=null" >{{i.intro}}</p>


        </div>

        <div v-else >
          <p style="font-weight: bold">{{i.time}}</p>
          <p v-if="i.tlink!=null"><a :href="i.tlink" style=" font-weight: bold;">{{i.title}}</a></p>
          <p v-else>{{i.title}}</p>

          <p v-if="i.intro!=null && i.intro!=''" >{{i.intro}}</p>
        </div>


        <iframe v-if="i.vlink!=null" style="width:56vw; height:31.5vw" :src="i.vlink" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </card>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "News",
      mounted() {
        this.getNews();
      },
      methods: {
        getNews() {
          axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/news`)
                  .then(response => {
                    this.news = response.data;
                    console.log(this.news);
                  })
        }
      },
      data () {
        return {
            news:'',
            list: ['https://www.youtube.com/embed/jXkxpGyKuXM?enablejsapi=1&amp']
        };
      }}
</script>

<style>
#newscontent{
  width: 90%;
  margin: 0 auto;
}
.inword{
    padding: 1vw;
    margin: 2vw;
}

</style>
