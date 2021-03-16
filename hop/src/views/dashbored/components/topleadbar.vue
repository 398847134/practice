<template>
  <div class="conta">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
<!--      <el-breadcrumb-item :to="{ path: '/mainpage' }">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" class="mn" @tab-click="tabClick">
      <el-tab-pane
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "topleadbar",
  data() {
    return {
      editableTabsValue: '2',
      levelList: [],
      activeIndex: '1',
      activeIndex2: '1',
      editableTabs: [
        {
          title: '首页',
          name: '1',
          content: ''
        },
        {
          title: '基础信息',
          name: '2',
          content: ''
        }
      ],
      tabIndex: 2
    };
  },
  watch: {
    $route(route) {
      this.getBreadcrumb()
    }
  },
  created(){
    this.getBreadcrumb();
  },
  methods: {
    tabClick (teb) {
      console.log(teb)
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    pathCompile (path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
        matched = [{ path: '/mainPage', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style scoped>
.mn{
  position: absolute;
  top: 40px;
  width: 100%;
  left: 200px;
}
.conta{
  height: 100px;
}
</style>
<style>
.bread{
  height: 30px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 200px;
  line-height: 50px;
  padding-left: 20px;
}
</style>
