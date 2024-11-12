<template>
  <footer class="app_footer">
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>精准识别</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>高效处理</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>兼容多格式</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">联系我们</a>
            <a href="javascript:;">隐私权政策</a>
            <a href="javascript:;">隐私设置</a>
            <a href="javascript:;">使用条款</a>
            <a href="javascript:;">法律声明</a>
          </p>
          <p>CopyRight © PIKA OCR</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .extra {
      background-color: #c0d6ea;
  }

  .slogan {
      height: 100px;
      line-height: 58px;
      padding: 60px 100px;
      border-bottom: 1px solid #434343;
      display: flex;
      justify-content: space-between;

      a {
          height: 58px;
          line-height: 50px;
          color: #fff;
          font-size: 28px;

          i {
              font-size: 50px;
              vertical-align: middle;
              margin-right: 10px;
              font-weight: 100;
          }

          span {
              vertical-align: middle;
              text-shadow: 0 0 1px #333;
          }
      }
  }

  .copyright {
      height: 150px;
      padding-top: 40px;
      text-align: center;
      color: #999;
      font-size: 15px;

      p {
          line-height: 1;
          margin-bottom: 20px;
      }

      a {
          color: #999;
          line-height: 1;
          padding: 0 10px;
          border-right: 1px solid #999;

          &:last-child {
              border-right: none;
          }
      }
  }
}
</style>
