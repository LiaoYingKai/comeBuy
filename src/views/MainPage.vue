<template>
<div class="mainPage">
  <nav>

    <el-row :gutter="20" class="navbar">
      <el-col :span="4">
        <img src="../assets/logo.jpg" alt="">
      </el-col>
      <el-col :span="14">
        <div class="">
          <el-menu mode="horizontal" :router="true">
            <el-submenu index="1">
              <template slot="title">買家</template>
              <el-menu-item index="watchRoom">觀看直播</el-menu-item>
              <el-menu-item index="userInfo">更新個人資訊</el-menu-item>
              <el-menu-item index="ShoppingCart">查看訂單</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">賣家</template>
              <el-menu-item index="liveRoom">開始直播</el-menu-item>
              <el-menu-item index="product">商品資訊</el-menu-item>
              <el-menu-item index="order">管理訂單</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="2"><img :src="sticker" alt=""></el-col>
      <el-col :span="2">
        <div class="">{{name}}</div>
      </el-col>
      <el-col :span="2">
        <div class="logout" @click="logout">
          登出
        </div>
      </el-col>
    </el-row>
  </nav>

  <router-view class="container"></router-view>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    test: function() {
      console.log("fuck")
    },
    logout: function() {
      console.log("fuck")
      $cookies.remove('FBtoken')
      this.$router.push('/')
    }
  },
  computed: {
    sticker: function() {
      return this.$store.getters.userInfo.avatar
    },
    name: function() {
      return this.$store.getters.userInfo.name
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
    background-color: #fff;
}
.navbar {
    max-width: 1200px;
    margin: 0 auto !important;
    height: 60px;
    display: flex;
    img {
        height: 60px;
    }
    .el-col-2 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.el-menu.el-menu--horizontal {
    border: 0;
}
.logout {
    cursor: pointer;
}
.container {
    margin-top: 20px;
    max-width: 1200px;
    margin: 0 auto !important;
}
</style>
