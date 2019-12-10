<template>
  <!-- 内容 -->
  <div class="container">
    <div class="el-row el-row el-row--flex el-row--justify">
      <!-- 左侧 -->
      <div class="containerLeft">
        <!-- tab栏 -->
        <tab />
        <!-- 推荐城市 -->
        <div class="recommend">
          <h4>推荐城市</h4>
          <img src="../../assets/img/hots_4.jpg" alt>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="containerRight">
        <!-- 搜索 -->
        <div class="search-box">
          <div class="search el-row--flex el-row--justify el-row--align">
            <input type="text" placeholder="请输入想去的地方，比如广州">
            <i class="el-icon-search" />
          </div>
          <!-- 推荐  -->
          <div class="search-recommend">
            推荐 :
            <span>广州</span>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="post-title el-row--flex el-row--justify el-row--align">
          <h4>推荐攻略</h4>
          <button type="button" class="el-button el-button--primary">
            <i class="el-icon-edit" />
            <span>写游记</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tab from '@/components/post/tab'
export default {
  components: {
    tab
  },
  data () {
    return {

    }
  }

}
</script>

<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .el-row {
    box-sizing: border-box;
  }
  .el-row--flex {
    display: flex;
  }
  .el-row--justify {
    justify-content: space-between;
  }
  .el-row--align {
    align-items: center;
  }
  .el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  // 左侧
  .containerLeft {

    // 推荐
    .recommend {
      margin-top: 20px;
      > h4 {
        font-weight: 400;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
      }
      > img {
        width: 100%;
        display: block;
      }
    }
  }
  // 右侧
  .containerRight {
    width: 700px;
    .search-box {
      .search {
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        border: 3px solid orange;
        > input {
          flex: 1;
          padding: 0 20px;
          line-height: 40px;
          outline: none;
          border: none;
          background: none;
        }
        > i {
          font-size: 24px;
          color: orange;
          font-weight: 700;
          margin-right: 10px;
        }
      }
      .search-recommend {
        padding: 10px 0;
        font-size: 12px;
        color: #666;
        > span {
          margin: 0 5px;
        }
      }
    }
    // 推荐攻略
    .post-title {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      position: relative;
      &::after {
          display: block;
          content: "";
          width: 72px;
          height: 2px;
          background: orange;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      > h4 {
        font-weight: 400;
        font-size: 18px;
        color: orange;
        // position: relative;

      }

      > button {
        > span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
