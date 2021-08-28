<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="form" style="width: 400px; margin: 0 auto;">
      <el-form-item label="设备类型">
        <el-input v-model="form.class"></el-input>
      </el-form-item>
      <el-form-item label="端口对数">
        <el-input v-model="form.num" type="number"></el-input>
      </el-form-item>
      <el-button type="primary" @click="click">生成随机数据</el-button>
    </el-form>
  </div>
</template>

<script>
import fileSaver from 'file-saver'

export default {
  name: "Core",
  data() {
    return {
      form: {
        class: 'default',
        num: 0,
      },
      tempArray: []
    }
  },
  methods: {
    click() {
      if (this.form.class === '') {
        this.$message.error("请输入设备类型")
        return
      }
      if (this.form.num === 0) {
        this.$message.error("请输入端口对数")
        return
      }

      let result = ''
      this.tempArray = []

      for (let i = 0; i < this.form.num; i++) {
        result += `${this.randomFilter()} ${this.randomFilter()}\n`
      }
      console.log(result)

      let blob = new Blob([result], {type: "text/plain;charset=utf-8"});
      fileSaver.saveAs(blob, `${this.form.class}_${this.form.num}.txt`)
    },
    randomFilter(){
      let value = this.random()
      if(this.tempArray.indexOf(value) !== -1){
        value = this.randomFilter()
      }
      this.tempArray.push(value)
      return value
    },
    random() {
      let min = 5001
      let max = 65535
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
}
</script>

<style scoped>

</style>