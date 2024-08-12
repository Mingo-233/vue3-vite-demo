<script lang="ts" setup>
import { PdfDataHandle } from '@baoxiaohe/editor-plugins'
import info from './info.json'
import knifeDate from './knife.json'
const templateData  =info
const params={}
const pdfDataHandle = new PdfDataHandle(knifeDate,templateData,params)
window.pdfDataHandle = pdfDataHandle
console.log(pdfDataHandle);

init()
async function init(){
    const pdfList = await pdfDataHandle.getPdfDataList()
    console.log(pdfList);
    

}

</script>
<template>
  <div class="container">123</div>
</template>
<style lang="less" scoped>
.container {
}
</style>
