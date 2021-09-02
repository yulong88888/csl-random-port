<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="form" style="width: 400px; margin: 0 auto;">
      <el-form-item label="文件名称">
        <el-input v-model="form.filename"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select style="width: 100%" v-model="form.number" placeholder="请选择">
          <el-option
              v-for="item in form.deviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="clickRandom">Random</el-button>
      <el-button type="primary" @click="clickOT">OT</el-button>
      <el-button type="primary" @click="clickOP">OP</el-button>
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
        filename: 'default',
        number: null,
        deviceType: [{
          value: 12,
          label: '12'
        }, {
          value: 24,
          label: '24'
        }, {
          value: 48,
          label: '48'
        }, {
          value: 96,
          label: '96'
        }, {
          value: 144,
          label: '144'
        }]
      },
      tempArray: []
    }
  },
  methods: {
    clickRandom() {
      if (this.form.number === null) {
        this.$message.error("请选择设备类型")
        return
      }

      let result = ''
      this.tempArray = []

      for (let i = 0; i < this.form.number / 2; i++) {
        result += `${this.randomFilter()} ${this.randomFilter()}\n`
      }
      console.log(result)

      this.writeFile('random', result)
    },
    clickOT() {
      if (this.form.number === null) {
        this.$message.error("请选择设备类型")
        return
      }
      let result = ''
      for (let i = 0; i < this.form.number; i++) {
        result += `${i + 1} ${this.form.number + 1}\n`
        result += `${this.form.number + 1} ${i + 1}\n`
      }
      console.log(result)
      this.writeFile('ot', result)
    },
    clickOP() {
      if (this.form.number === null) {
        this.$message.error("请选择设备类型")
        return
      }
      let result = ''
      for (let i = 0; i < this.form.number; i++) {
        result += `${i + 1} ${this.form.number + 2}\n`
        result += `${this.form.number + 2} ${i + 1}\n`
      }
      console.log(result)
      this.writeFile('op', result)
    },
    randomFilter() {
      let value = this.random()
      if (this.tempArray.indexOf(value) !== -1) {
        value = this.randomFilter()
      }
      this.tempArray.push(value)
      return value
    },
    random() {
      let min = 1
      let max = this.form.number
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    writeFile(type, result) {
      let blob = new Blob([result], {type: "text/plain;charset=utf-8"});
      fileSaver.saveAs(blob, `${this.form.number}_${type}_${this.form.filename}.txt`)
    }
  }
}
</script>

<style scoped>

</style>