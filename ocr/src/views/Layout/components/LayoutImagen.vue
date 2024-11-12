<template>
  <div class="layout-imagen">
    <!-- 这是图片上传和识别结果的布局结构 -->
    <div class="upload-section">
      <h2>上传图片</h2>
      <div class="upload-area" @click="selectFile" @dragover.prevent @drop.prevent="handleDrop">
        <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" multiple
          style="display: none;" />
        <p>点击或拖放图片到此区域</p>
      </div>
      <div class="preview-container">
        <div v-for="(src, index) in imageSrcList" :key="index" class="preview">
          <img :src="src" alt="Uploaded Image" />
          <button class="delete-button" @click="removeImage(index)">×</button>
          <p>{{ imageNames[index] }}</p>
        </div>
      </div>
      <div class="recognition-button-container">
        <button @click="startRecognition" :disabled="!imageSrcList.length">开始识别</button>
      </div>
    </div>

    <div class="result-section">
      <h2 class="result-title">识别结果</h2>
      <div class="result-content">
        <button class="copy-button" @click="copyToClipboard">复制</button>
        <div v-if="ocrResult">
          <!-- 添加了CSS样式, 确保文本可选 ,且保留换行符和空格 -tong -->
          <p class="result-text">{{ ocrResult }}</p>
        </div>
        <div v-else>
          <p>上传图片后显示识别结果。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageSrcList: [],
      imageNames: [],
      imageFiles: [],//用于接收原生文件对象 -tong
      ocrResult: null
    };
  },
  methods: {
    selectFile() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      files.forEach((file) => this.previewImage(file));
    },
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          this.previewImage(file);
        } else {
          alert("请上传图片文件！");
        }
      });
    },
    previewImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrcList.push(e.target.result);
        this.imageNames.push(file.name);
        this.imageFiles.push(file);
      };
      reader.readAsDataURL(file);
    },
    removeImage(index) {
      this.imageSrcList.splice(index, 1);
      this.imageNames.splice(index, 1);
      this.imageFiles.splice(index, 1);
    },
    async startRecognition() {
      if (!this.imageFiles.length) {
        alert('请先上传图片！');
        return;
      }

      this.ocrResult = '';

      try {
        //因为后端一次请求只能处理一张图片，所以需要循环处理 -tong
        for (let i = 0; i < this.imageFiles.length; i++) {
          const formData = new FormData();
          formData.append('image', this.imageFiles[i]);

          // 使用axios发送请求,并临时设置了vite代理用于避开跨域问题,后期需要修改 -tong
          const response = await axios.post('/api/ocr', {
            image: this.imageFiles[i]
          }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log('识别结果:', response.data);

          // 处理识别结果 -tong
          if (response.data.results && Array.isArray(response.data.results)) {
            const textResult = response.data.results
              .map(item => item.text)
              .join('\n');

            if (this.imageFiles.length > 1) {
              this.ocrResult += `\n=== 图片 ${i + 1}: ${this.imageNames[i]} ===\n`;
            }
            this.ocrResult += textResult + '\n\n';
          }
        }
      } catch (error) {
        console.error('识别失败:', error);
        alert('识别失败，请重试！');
      }
    },
    copyToClipboard() {
      if (this.ocrResult) {
        navigator.clipboard.writeText(this.ocrResult).then(() => {
          alert("识别结果已复制到剪贴板！");
        }).catch(err => {
          console.error("复制失败: ", err);
        });
      }
    }
  }
};
</script>

<style scoped>
.layout-imagen {
  /* 主布局容器 */
  display: flex;
  flex-direction: column;
  /* 默认垂直布局 */
  width: 100vw;
  /* 视口宽度的100% */
  height: auto;
  margin: auto;
}

.upload-section,
/* 上传图片区域 */
.result-section {
  /* 识别结果区域 */
  flex: 1;
  /* 占据父容器的一半宽度 */
  padding: 20px;
  box-sizing: border-box;
  /* 确保 padding 不影响总宽度 */
}

.upload-section {
  /* 上传图片区域，默认在左边 */
  border-bottom: 1px solid #323030;
  /* 下边框，分隔上传和结果区域 */
  text-align: center;
  display: flex;
  flex-direction: column;
  /* 内容垂直排列 */
  align-items: center;
}

.result-section {
  /* 识别结果区域，默认在右边 */
  display: flex;
  flex-direction: column;
  /* 内容垂直排列 */
  align-items: center;
  padding: 20px;
}

/* 桌面宽度时，切换为水平布局 */
@media (min-width: 768px) {
  .layout-imagen {
    /* 主布局容器，响应式布局 */
    flex-direction: row;
    /* 大屏幕时水平布局 */
  }

  .upload-section {
    /* 上传图片区域 */
    border-right: 1px solid #323030;
    /* 桌面时添加右边框分隔 */
    border-bottom: none;
    /* 移除底部边框 */
  }
}

.upload-area {
  /* 上传图片的拖拽区域 */
  border: 1px solid #ccc;
  /* 单线边框 */
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  width: 80%;
  /* 上传区域的宽度 */
  max-width: 650px;
  /* 设置上传区域的最大宽度 */
  height: 10vh;
  /* 使用视口高度使其在不同屏幕上自适应 */
  margin: 20px 0;
  font-size: 16px;
  color: #999;
  /* 字体颜色 */
  position: relative;
  cursor: pointer;
  /* 鼠标悬停时显示为手型 */
}

.upload-area:hover {
  /* 上传区域的悬停效果 */
  border-color: #888;
  /* 鼠标悬停时改变边框颜色 */
}

input[type="file"] {
  /* 文件输入框，隐藏 */
  display: none;
  /* 隐藏文件输入框 */
}

.preview-container {
  /* 图片预览容器 */
  display: flex;
  flex-wrap: wrap;
  /* 多行显示图片 */
  gap: 10px;
  /* 图片之间的间距 */
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  /* 设置预览图片区域的最大宽度 */
  justify-content: center;
}

.preview {
  /* 单个图片预览 */
  position: relative;
  width: 80px;
  height: 120px;
  border: 1px solid #ddd;
  text-align: center;
}

.preview img {
  /* 图片预览的图片样式 */
  width: 100%;
  /* 图片宽度自适应 */
  height: calc(100% - 20px);
  /* 图片高度自适应 */
  object-fit: cover;
  /* 保持图片比例 */
}

.delete-button {
  /* 删除图片按钮 */
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 50%;
  /* 按钮圆角 */
}

.result-section {
  /* 识别结果区域 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-title {
  /* 识别结果标题 */
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  /* 与左侧标题对齐 */
}

.result-content {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  width: 80%;
  text-align: left;
  min-height: 50vh;
  /* 最小高度为 50vh */
  height: auto;
  /* 高度根据内容自动调整 */
  position: relative;
  /* 相对定位，使内部绝对定位元素基于此容器定位 */
}

.result-content p {
  font-size: 14px;
  color: #333;
  word-break: break-word;
  /* 自动换行，防止内容溢出 */
}

.copy-button {
  /* 复制按钮 */
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #A6c7e2;
  /* 按钮背景色 */
  color: #fff;
  /* 按钮文字颜色 */
  font-size: 12px;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  /* 按钮圆角 */
  cursor: pointer;
}

.recognition-button-container {
  /* 开始识别按钮容器 */
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.recognition-button-container button {
  /* 开始识别按钮 */
  background-color: #A6c7e2;
  /* 按钮背景色 */
  color: #fff;
  /* 按钮文字颜色 */
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  /* 按钮圆角 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* 平滑变色效果 */
}

.recognition-button-container button:hover {
  /* 开始识别按钮悬停效果 */
  background-color: #86b7db;
  /* 悬停时按钮颜色 */
}

.recognition-button-container button:disabled {
  /* 开始识别按钮禁用效果 */
  background-color: #cccccc;
  /* 禁用时按钮颜色 */
  cursor: not-allowed;
}

.result-text {
  white-space: pre-wrap; /* 保留换行符和空格 -tong */
  user-select: text; /* 确保文本可选 -tong */
}
</style>
