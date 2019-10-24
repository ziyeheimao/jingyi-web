<template>
  <!-- 背景装饰 -->
  <section class="bgi" id="bgi">
    <div class="ferrisWheel">
      <div class="clockwise"></div>
      <div class="antiClockwise"></div>
      <div class="antiClockwise"></div>
    </div>
    <div class="antiClockwise middle"></div>
    <div class="antiClockwise rightBottom"></div>
    <div class="antiClockwise rightTop"></div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
/* 摩天轮动画 */
@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes antiClockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* 顺时针动画 */
.clockwise {
  /* 动画名 */
  animation-name: clockwise;
  /* 播放周期 */
  animation-duration: 150000ms;
  /* 播放曲线 */
  animation-timing-function: linear;
  /* 播放前延时 */
  /* animation-delay:5s; */
  /* 播放次数 */
  animation-iteration-count: infinite;
}

/* 逆时针动画 */
.antiClockwise {
  animation-name: antiClockwise;
  /* 播放周期 */
  animation-duration: 60000ms;
  /* 播放曲线 */
  animation-timing-function: linear;
  /* 播放前延时 */
  /* animation-delay:5s; */
  /* 播放次数 */
  animation-iteration-count: infinite;
}

/* 整体层级 */
section.bgi {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgb(243, 243,243);
}

/* 左下角大轮子动画样式调用 */
.ferrisWheel {
  width: 160%;
  height: 160%;
  position: absolute;
  bottom: -69%;
  left: -75%;
  z-index: -1;
}
.ferrisWheel > div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
.ferrisWheel > div:nth-child(1) {
  background: url(../assets/bgi/FerriSwheel1300.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.ferrisWheel > div:nth-child(2) {
  background: url(../assets/bgi/FerriSwheel1300px1.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.ferrisWheel > div:nth-child(3) {
  background: url(../assets/bgi/FerriSwheel1300px2.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

/* 右部中间轮子 */
.middle {
  width: 45%;
  height: 45%;
  position: absolute;
  bottom: 35%;
  right: 10%;
  z-index: -1;
  background: url(../assets/bgi/356px.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

/* 右上角轮子 */
.rightTop {
  width: 40%;
  height: 40%;
  position: absolute;
  top: -15%;
  right: -20%;
  z-index: -1;
  background: url(../assets/bgi/310px.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

/* 右下角轮子 */
.rightBottom {
  width: 30%;
  height: 30%;
  position: absolute;
  bottom: -12%;
  right: -15%;
  z-index: -1;
  background: url(../assets/bgi/500px.svg) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
