<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="form" style="width: 400px; margin: 0 auto;">
      <el-form-item label="文件名称">
        <el-input v-model="form.filename"></el-input>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select style="width: 100%" v-model="form.index" placeholder="请选择">
          <el-option v-for="(item, index) in form.items" :key="index" :label="item" :value="index">
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
        index: null,
        items: ['12','24','48','96S','144N','144S','192','312'],
        deviceType: [{
          // 12
          value: 12,
          OT: 13,
          OP: 14
        }, {
          // 24
          value: 24,
          OT: 25,
          OP: 26
        }, {
          // 48
          value: 48,
          OT: 49,
          OP: 50
        }, {
          // 96S
          value: 96,
          OT: 107,
          OP: 108
        }, {
          // 144N
          value: 144,
          OT: 147,
          OP: 148
        }, {
          // 144S
          value: 144,
          OT: 149,
          OP: 150
        }, {
          // 192
          value: 192,
          OT: 193,
          OP: 194
        }, {
          // 312
          value: 312,
          OT: 333,
          OP: 334
        }]
      },
      tempArray: []
    }
  },
  methods: {
    clickRandom() {
      if (this.form.index === null) {
        this.$message.error("请选择设备类型")
        return
      }

      let result = ''
      this.tempArray = []
      let deviceTypeValue = this.form.deviceType[this.form.index].value

      for (let i = 0; i < deviceTypeValue / 2; i++) {
        result += `${this.randomFilter(deviceTypeValue)} ${this.randomFilter(deviceTypeValue)}\n`
      }
      console.log(result)

      this.writeFile('random', result)
    },
    clickOT() {
      if (this.form.index === null) {
        this.$message.error("请选择设备类型")
        return
      }
      let valueOT = this.form.deviceType[this.form.index].OT
      let result = ''
      for (let i = 0; i < valueOT; i++) {
        result += `${i + 1} ${valueOT}\n`
        result += `${valueOT} ${i + 1}\n`
      }
      console.log(result)
      this.writeFile('ot', result)
    },
    clickOP() {
      if (this.form.index === null) {
        this.$message.error("请选择设备类型")
        return
      }
      let valueOP = this.form.deviceType[this.form.index].OP
      let result = ''
      for (let i = 0; i < valueOP; i++) {
        result += `${i + 1} ${valueOP}\n`
        result += `${valueOP} ${i + 1}\n`
      }
      console.log(result)
      this.writeFile('op', result)
    },
    randomFilter(max) {
      let value = this.random(max)
      if (this.tempArray.indexOf(value) !== -1) {
        value = this.randomFilter(max)
      }
      this.tempArray.push(value)
      return value
    },
    random(max) {
      return Math.floor(Math.random() * max + 1);
    },
    writeFile(type, result) {
      // 根据number查找deviceType中的label
      let filename = ""
      filename = this.form.items[this.form.index]
      let blob = new Blob([result], { type: "text/plain;charset=utf-8" });
      fileSaver.saveAs(blob, `${filename}_${type}_${this.form.filename}.txt`)
    }
  }
}
</script>

<style scoped></style>