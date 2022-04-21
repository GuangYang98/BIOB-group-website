<template>
  <div id="publication_page">
    <div class="anclink" style="position:fixed;" >
      <h1>Publications</h1>
      <Anchor show-ink style="margin-left: 3vw;">
        <AnchorLink  :href="`#`+i[year_string]"  v-for="i in tab" :key="i[year_string]" :title="i[year_string]" style="font-weight: bolder"/>
        <AnchorLink  href="#more" title="more" style="font-weight: bolder"></AnchorLink>
      </Anchor>
    </div>

    <div class="context" style="margin-top: 3vw">
      <p style="font-style: oblique; font-size: smaller">*Publication data is from <a href="https://pubmed.ncbi.nlm.nih.gov/">NIH National Library of Medicine</a>.</p><br>
      <div class="subyear"  v-for="i in tab" :key="i[year_string]" :v-if="listLoading">
        <divider style="font-weight: bolder; font-size: large"><h3 style="font-weight: bold">{{i[year_string]}}</h3></divider>
        <a :id='i[year_string]' style="position: relative; top:-10vw"></a>
        <div class="pbitem"  v-for="ii in cont[i[year_string]] " :key="ii.url">
          <img :src="ii.pic" v-if="ii.pic != null">
          <div class="pbcontend">
          <span v-if="ii.url != null && ii.url != ''"><a :href="ii.url" style="font-weight: bold">{{ii.title}} </a></span>
            <span v-else style="font-weight: bold">{{ii.title}}</span><br>
            <span>{{ii.author}}</span><br>
            <span style="font-size: smaller;">{{ii.info}}</span></div>
          </div>
<!--        <label for="toggle"></label>-->
      </div>

      <div class="subyear" >
        <divider style="font-weight: bolder; font-size: large">more publications</divider>
        <a id="more" style="position: relative; top: -10vw;"></a>
        <div class="pbitem"  v-for="ii in other" :key="ii.url">
          <img :src="ii.pic" v-if="ii.pic != null">
          <div class="pbcontend">
            <input type="checkbox" name="toggle" id="toggle" style="display: none"></input>
            <span v-if="ii.url != null && ii.url != ''"><a :href="ii.url" style="font-weight: bold">{{ii.title}} </a></span>
            <span v-else style="font-weight: bold">{{ii.title}}</span><br>
            <span>{{ii.author}}</span><br>
            <span style="font-size: smaller;">{{ii.info}}</span></div>
          <!--        <label for="toggle"></label>-->
        </div>
      </div>
    </div>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "publication",
      methods:{
        get5years(){
          return axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/publications/year`)
                  .then(response => {
                    this.tab = response.data;
                    console.log(this.tab);
                  });
        },
        getYear(year){
          return axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/publications/${year}`)
                  .then(response => {
                    this.cont[year] = response.data;
                    console.log(year, this.cont[year]);
                  });
        },
        getYearOther(){
          return axios.get(`https://www.rle.mit.edu/boib/labserver/api/table/publications/other`)
                  .then(response => {
                    this.other = response.data;
                  });
        },
      },
      mounted() {
        this.get5years().then(()=> {
          console.log(this.tab);
          this.getYear(this.tab["0"][this.year_string]).then(()=> {
            this.getYear(this.tab["1"][this.year_string]).then(() => {
              this.getYear(this.tab["2"][this.year_string]).then(() => {
                this.getYear(this.tab["3"][this.year_string]).then(() => {
                  this.getYear(this.tab["4"][this.year_string]).then(() => {
                    this.getYearOther().then(() => {
                      this.listLoading = true;
                    });
                  });
                });
              });
            });
          })



        });
      },
      data () {
        return {
          tab: {},
          cont: [],
          listLoading: false,
          year_string: 'YEAR(STR_TO_DATE(time, \"%Y %b\"))',
          other:[],
          }}
        }
</script>

<style scoped>
  #right-link a:visited, a:link{
    text-decoration: none;
    color: #475669;
  }
  #right-link a:hover, a:active{
    text-decoration: none;
    color: darkgoldenrod;
  }
  #publication_page{
    margin: 0 auto;
    width: 90%;
    position: relative;
  }
  .subyear{
    margin-bottom: 5vw;
  }
  .subyear h1{
    padding-bottom: 2px;
   border-bottom: 1px solid #CCC;
  }
  .anclink{
    float: left;
    width: 20%;
  }
  .context{
    width: 80%;
    float: right;
  }
  .pbcontend{
    display: -webkit-box;
    /*-webkit-line-clamp: 3;*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  input[name="toggle"]:checked {
  & + p {
      -webkit-line-clamp: unset;
    }
  }
  .pbitem{
    border: #1d8cb0 2px solid;
    padding: 0.5vw;
    margin-bottom: 2vw;
    border-radius: 2vw;
  }

</style>
