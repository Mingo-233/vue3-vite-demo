<template>
  <div>
    <p>1. 输入月份 <input type="text" v-model="month" /></p>
    <p>2. 点击选择excel文件</p>
    <p>3. 点处理</p>
    <input type="file" @change="handleFileUpload" />
    <button @click="processExcel">处理Excel</button>
    <!-- <button @click="download">回填</button> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { read, writeFileXLSX, writeFile, utils } from "xlsx";
let month = ref(10);
let excelData = [];
let workbook;
let collect = [];
let outputData = [];
let filterCollect = [];

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    workbook = read(data, { type: "binary" });
    console.log("SheetNames", workbook.SheetNames);

    let SheetNames = workbook.SheetNames;
    SheetNames.forEach((sheetName, index) => {
      // if (index > 1) return;
      const worksheet = workbook.Sheets[sheetName];
      let excelDataTemp = utils.sheet_to_json(worksheet, { header: 1 });
      excelData.push(excelDataTemp);
    });
    console.log(excelData);
    // const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
    // const worksheet = workbook.Sheets[sheetName];
    // excelData = utils.sheet_to_json(worksheet, { header: 1 });
  };

  reader.readAsBinaryString(file);
}

function processExcel() {
  // 在这里处理 this.excelData，它包含了从Excel文件中读取的数据
  console.log(excelData);
  let startHandlePersonName = false;

  excelData.forEach((excelDataItem) => {
    excelDataItem.forEach((item) => {
      let obj = {};
      if (startHandlePersonName) {
        let str = "";
        // 加班时间
        let overtime = 0;
        item.forEach((hour, index) => {
          // 月份修正
          const monthFix = month.value === "1" ? "12" : month.value - 1;
          if (index === 2) {
            str += `${monthFix}月26号加班${hour}小时,`;
          }
          if (index === 3) {
            str += `${monthFix}月27号加班${hour}小时,`;
          }
          if (index === 4) {
            str += `${monthFix}月28号加班${hour}小时,`;
          }
          if (index === 5) {
            str += `${monthFix}月29号加班${hour}小时,`;
          }
          if (index === 6) {
            str += `${monthFix}月30号加班${hour}小时,`;
          }
          if (index === 7) {
            str += `${monthFix}月31号加班${hour}小时,`;
          }
          if (index >= 8 && index <= 32) {
            str += `${month.value}月${index - 7}号加班${hour}小时,`;
          }
          // // 平日加班
          // if (index === 33) {
          //   if (hour) overtime = hour;
          // }
        });

        collect.forEach((item) => {
          if (item.name === startHandlePersonName) {
            item.des = str;
            // item.overtime = overtime;
          }
        });

        startHandlePersonName = false;
      }
      if (
        typeof item[1] === "string" &&
        item[1].length >= 2 &&
        item[1] !== "姓名"
      ) {
        // 工号
        obj.no = item[0];
        // 名字
        obj.name = item[1];
        // 平时加班
        obj.regularOvertime = item[34] || 0;
        // 周日加班
        obj.weekOvertime = item[35] || 0;
        // 国定加班
        obj.nationalOvertime = item[36] || 0;
        obj.totalOvertime =
          Number(obj.regularOvertime) +
          Number(obj.weekOvertime) +
          Number(obj.nationalOvertime);
        startHandlePersonName = obj.name;
      }

      if (Object.keys(obj).length) {
        collect.push(obj);
      }
    });
  });

  // 过滤出来 有加班的
  filterCollect = collect.filter((item) => !!item.totalOvertime);
  console.log(collect);
  console.log(filterCollect);
  download();
}
function download() {
  // 将数据填写到新的Excel文件中
  var newWorkbook = utils.book_new();

  filterCollect.forEach((item, index) => {
    if (!outputData[index]) {
      outputData[index] = [];
    }
    outputData[index][0] = item.no;
    outputData[index][1] = item.name;
    outputData[index][2] = item.des;
    outputData[index][3] = item.regularOvertime;
    outputData[index][4] = item.weekOvertime;
    outputData[index][5] = item.nationalOvertime;
    outputData[index][6] = item.totalOvertime;
  });

  console.log(outputData);
  outputData.unshift([
    "工号",
    "姓名",
    "详细",
    "平时加班",
    "周末加班",
    "国定加班",
    "总共加班",
  ]);

  // 创建新的Excel文件
  // var sheetName = workbook.SheetNames[0];
  // var worksheet = workbook.Sheets[sheetName];

  var newWorksheet = utils.aoa_to_sheet(outputData);
  utils.book_append_sheet(newWorkbook, newWorksheet, "新工作表名称");
  writeFile(newWorkbook, "output.xlsx");
}
</script>

<style lang="less" scoped></style>
