<script setup lang="ts">

const videoEl = ref()
const open = () => {
    console.log(videoEl.value)
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        console.log(stream)
        videoEl.value.srcObject = stream
        videoEl.value.play()
        takePicture()
    }).catch((err) => {
        console.error(`An error occurred: ${err}`);
    })
}

const canvas = ref()
const takePicture = () => {
    const context = canvas.value.getContext('2d')
    context.drawImage(videoEl.value, 0, 0, 400, 200)
    // const data = canvas.toDataURL("image/png")
    // photo.setAttribute("src", data)
}
</script>

<template>
    <el-card class="wat-card">
        <canvas ref="canvas" width="400" height="200"></canvas>
        <video ref="videoEl" id="video">视频流目前不可用</video>
        <el-button type="primary" @click="open">调用摄像头</el-button>
    </el-card>
</template>
