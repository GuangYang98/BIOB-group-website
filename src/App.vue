<template>
<div id = "body">
    <canvas id="nokey"></canvas>
      <div  id = "title">
          <div id = "titlecontent">
              <a @click="$router.push('Home')" style="float: left; font-weight: bolder"> <img src="../static/homelogo.png" style="height: 2.4vw"></a>
                  <a class="first2 hvr-underline-from-center" style="top:0.3vw" v-for="item in nav" :key="item.id" @click="jump(item.name)">{{item.name}}</a>
              </div>
      </div>
<div>
    <div style="height: 3vw"></div>
    <transition name="fade" mode="out-in">
        <router-view v-if="isRouterAlive"> </router-view>
    </transition>
</div>

    
    <!--footer-->
    <div id="footer">
      <div id="footerinterior">
          <div id="footerleftnav">
            <ul class="menu" id="nav">
              <div class="menu-main-site-menu-container">
                <ul id="menu-main-site-menu-1" class="menu">
                    <li><a @click="$router.push('/')">Home</a></li>
                  <li v-for="item in nav" :key="item.id" ><a @click="jump(item.name)">{{item.name}}</a></li>
              </ul>
              </div>
            </ul>
          </div>

        <div id="footerright">
            <p style="font-size: 10px; padding-top: 0">
                Copyright &copy; 2020 Massachusetts Institute of Technology <br>
                Icons made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </p>
        </div>
        <div id="logobox">
          <a href="https://www.rle.mit.edu/"><img src="../static/RLE_LOGO.png" height="30px" alt="Research Laboratory of Electronics at MIT"  align="absmiddle"></a>
          <a href="http://spie.org/x13196.xml"><img src="../static/SPIE-BiOS-logo.png" height="30px" alt="BiOS SPIE"  align="absmiddle" hspace="60"></a>
          <a href="http://www.octnews.org/"><img src="../static/OCTNews_LOGO.png" height="30px" alt="OCT News"  align="absmiddle" hspace="60"></a>
          <a href="http://www.eecs.mit.edu/"><img src="../static/EECS_LOGO.png" height="30px" alt="EECS"  align="absmiddle" hspace="60"></a>
          <a href="http://web.mit.edu/"><img src="../static/MIT_LOGO.png" height="30px" alt="MIT" align="absmiddle"></a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
  name: "app",
    provide(){
        return{
            reload:this.reload
        }
    },
    methods: {
        jump(link) {
            if (link !== 'Login') {
                this.$router.push(link);
            } else {
                window.open("https://www.rle.mit.edu/boib/labserver/backend/")
            }
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
        handleSelect(key, keyPath) {
          consolo.log(key, keyPath)
        }
    },
        mounted(){
            var canvas = document.getElementById('nokey'),
                can_w = parseInt(canvas.getAttribute('width')),
                can_h = parseInt(canvas.getAttribute('height')),
                ctx = canvas.getContext('2d');

            var ball = {
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    r: 0,
                    alpha: 1,
                    phase: 0
                },

                ball_color = {
                    r: 231,
                    g:228,
                    b: 147,
                },
                R = 3,
                balls = [],
                alpha_f = 0.03,
                alpha_phase = 0,

// Line
                link_line_width = 0.8,
                dis_limit = 260,
                add_mouse_point = true,
                mouse_in = false,
                mouse_ball = {
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    r: 0,
                    type: 'mouse'
                };


            // Random speed
            function getRandomSpeed(pos){
                var  min = -1,
                    max = 1;
                switch(pos){
                    case 'top':
                        return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
                        break;
                    case 'right':
                        return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
                        break;
                    case 'bottom':
                        return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
                        break;
                    case 'left':
                        return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
                        break;
                    default:
                        return;
                        break;
                }
            }
            function randomArrayItem(arr){
                return arr[Math.floor(Math.random() * arr.length)];
            }
            function randomNumFrom(min, max){
                return Math.random()*(max - min) + min;
            }
            // Random Ball
            function getRandomBall(){
                var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
                switch(pos){
                    case 'top':
                        return {
                            x: randomSidePos(can_w),
                            y: -R,
                            vx: getRandomSpeed('top')[0],
                            vy: getRandomSpeed('top')[1],
                            r: R,
                            alpha: 1,
                            phase: randomNumFrom(0, 10)
                        }
                        break;
                    case 'right':
                        return {
                            x: can_w + R,
                            y: randomSidePos(can_h),
                            vx: getRandomSpeed('right')[0],
                            vy: getRandomSpeed('right')[1],
                            r: R,
                            alpha: 1,
                            phase: randomNumFrom(0, 10)
                        }
                        break;
                    case 'bottom':
                        return {
                            x: randomSidePos(can_w),
                            y: can_h + R,
                            vx: getRandomSpeed('bottom')[0],
                            vy: getRandomSpeed('bottom')[1],
                            r: R,
                            alpha: 1,
                            phase: randomNumFrom(0, 10)
                        }
                        break;
                    case 'left':
                        return {
                            x: -R,
                            y: randomSidePos(can_h),
                            vx: getRandomSpeed('left')[0],
                            vy: getRandomSpeed('left')[1],
                            r: R,
                            alpha: 1,
                            phase: randomNumFrom(0, 10)
                        }
                        break;
                }
            }
            function randomSidePos(length){
                return Math.ceil(Math.random() * length);
            }

            // Draw Ball
            function renderBalls(){
                Array.prototype.forEach.call(balls, function(b){
                    if(!b.hasOwnProperty('type')){
                        ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
                        ctx.beginPath();
                        ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.fill();
                    }
                });
            }

            // Update balls
            function updateBalls(){
                var new_balls = [];
                Array.prototype.forEach.call(balls, function(b){
                    b.x += b.vx;
                    b.y += b.vy;

                    if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
                        new_balls.push(b);
                    }

                    // alpha change
                    b.phase += alpha_f;
                    b.alpha = Math.abs(Math.cos(b.phase));
                    // console.log(b.alpha);
                });

                balls = new_balls.slice(0);
            }

            // Draw lines
            function renderLines(){
                var fraction, alpha;
                for (var i = 0; i < balls.length; i++) {
                    for (var j = i + 1; j < balls.length; j++) {

                        fraction = getDisOf(balls[i], balls[j]) / dis_limit;

                        if(fraction < 1){
                            alpha = (1 - fraction).toString();

                            ctx.strokeStyle = 'rgba(147, 147, 231,'+alpha+')';
                            ctx.lineWidth = link_line_width;

                            ctx.beginPath();
                            ctx.moveTo(balls[i].x, balls[i].y);
                            ctx.lineTo(balls[j].x, balls[j].y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }

            // calculate distance between two points
            function getDisOf(b1, b2){
                var  delta_x = Math.abs(b1.x - b2.x),
                    delta_y = Math.abs(b1.y - b2.y);

                return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
            }

            // add balls if there a little balls
            function addBallIfy(){
                if(balls.length < 40){
                    balls.push(getRandomBall());
                }
            }

            // Render
            function render(){
                ctx.clearRect(0, 0, can_w, can_h);

                renderBalls();

                renderLines();

                updateBalls();

                addBallIfy();

                window.requestAnimationFrame(render);
            }

            // Init Balls
            function initBalls(num){
                for(var i = 1; i <= num; i++){
                    balls.push({
                        x: randomSidePos(can_w),
                        y: randomSidePos(can_h),
                        vx: getRandomSpeed('top')[0],
                        vy: getRandomSpeed('top')[1],
                        r: R,
                        alpha: 1,
                        phase: randomNumFrom(0, 10)
                    });
                }
            }
            // Init Canvas
            function initCanvas(){
                canvas.setAttribute('width', window.innerWidth);
                canvas.setAttribute('height', window.innerHeight);

                can_w = parseInt(canvas.getAttribute('width'));
                can_h = parseInt(canvas.getAttribute('height'));
            }
            window.addEventListener('resize', function(e){
                console.log('Window Resize...');
                initCanvas();
            });

            function goMovie(){
                initCanvas();
                initBalls(40);
                window.requestAnimationFrame(render);
            }
            goMovie();

            // Mouse effect
            document.addEventListener('mouseenter', function(){
                console.log('mouseenter');
                mouse_in = true;
                balls.push(mouse_ball);
            });
            document.addEventListener('mouseleave', function(){
                console.log('mouseleave');
                mouse_in = false;
                var new_balls = [];
                Array.prototype.forEach.call(balls, function(b){
                    if(!b.hasOwnProperty('type')){
                        new_balls.push(b);
                    }
                });
                balls = new_balls.slice(0);
            });
            document.addEventListener('mousemove', function(e){
                var e = e || document.event;
                mouse_ball.x = e.clientX;
                mouse_ball.y = e.clientY;
                 //console.log(mouse_ball);
            });

            
        },
  data() {
    return {
        isRouterAlive:true,
        nav: [
          {name:'Home'},
        {id: 0, name: 'Research'},
        {id: 1, name: 'Publication'},
        {id: 2, name: 'People'},
        {id: 3, name: 'News'},
        {id: 4, name: 'Contact'},
        {id: 5, name: 'Login'}
        ]
    }
  }
}
</script>

<style>
    canvas{
        /*background: linear-gradient(98deg, #7ff0b9, #3167c4);*/
        background: linear-gradient(98deg, #43c6ac, #f8ffae);
        position: fixed;
        z-index: -5;
        overflow: hidden;
        display: inline-block;
        top:0px;
    }
    #body{
        opacity: 1;
    }
    *{
        margin: 0;
        padding: 0;
    }

  #footer {
    float: left;
    width: 100%;
    padding: 20px 0px;
    font-size: 15px;
    font-weight: 300;
  }
  #footer a{
      color: black;
  }
  #footer a:hover {
    //color: #FE5308;
      //color:#f2b77b;
    text-decoration: none;
  }

  #footerinterior {
    width: 980px;
    margin: 100px auto 0px auto;
    border-top: 3px solid #1d8cb0;
    padding-top: 5px;
  }
  #footerleftnav {
    float: left;
  }
  #footerleftnav ul {
    padding-inline-start: 0px;
    list-style-type: none;
  }
  #footerleftnav li {
    float: left;
    padding-right: 5px;
  }
  #footerleftnav li:after {
    content: " • ";
    padding: 0 5px;
  }
  #footerleftnav li:last-child:after {
    content: " ";
  }
  #logobox {
    padding-top: 10px;
    clear: both;
    text-align: center;
  }
  #logobox img{
      text-align: center;
      margin: 0 30px;
  }

  #footerright{
      text-align: center;
      width: 100%;
      margin: 0;
  }
  p, h3, h5, h1{
    font-family: Roboto, sans-serif ;
      color: black
  }
    h1 {font-size: 2vw; font-weight: normal; margin: 1vw 0 0;}
    h3 {font-size: 1.8vw; font-weight: normal; margin: 1vw 0 0;}
    h5 {font-size: 1.5vw; font-weight: 300; margin: 0 0 5px; line-height: 1.5vw;}
    p {font-size: 1.3vw; font-weight: 300; line-height: 1.75; padding: 0 5px; margin-bottom: 1vw; }

    body {
        margin: 0;
    font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
        color: black;
}

    .first2{
        font-weight: bolder;
        float: left;
        margin-inline-start: 3vw;

    }


    #titlecontent a{
        color:  #005f6b;
        font-size: 1.2vw;
        margin-top: 0.3vw;
    }

    #title{
        width: 100vw;
        position: fixed;
        top:0;
        background-color: rgba(255,255,255,0.3);
        z-index: 5;
        text-align: right;
        height: 3vw;
    }

    #titlecontent{
        width: 90vw;
        height: 2.5vw;
        padding-right: 10vw;
        padding-left: 8vw;
        display: inline-block;
        text-align: right;
    }

</style>

