<template>
  <ClientOnly>
    <div class="code-show">
      <div class="examples">
        <component
          v-if="dynamicComponent"
          :is="dynamicComponent"
        ></component>
      </div>
      <div class="menu">
        <div
          class="item"
          @click="handleCopy"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="复制"
            placement="top"
          >
            <svg
              t="1668405941070"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3930"
              width="32"
              height="32"
            >
              <path
                d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z"
                p-id="3931"
                fill="#707070"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <div
          class="item"
          @click="open = !open"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="open ? '收起代码' : '展开代码'"
            placement="top"
          >
            <svg
              t="1668405663556"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2694"
              width="32"
              height="32"
            >
              <path
                d="M597.333333 667.178667l180.053334-176.512L597.333333 314.154667 656.64 256 896 490.666667 656.64 725.333333zM203.946667 490.666667L384 667.178667 324.693333 725.333333 85.333333 490.666667 324.693333 256 384 314.154667z"
                p-id="2695"
                fill="#8a8a8a"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <el-collapse-transition>
          <div v-show="open">
            <div
              class="code"
              ref="codeRef"
            >
              <slot></slot>
            </div>
            <div class="close-code">
            <span
              class="text"
              @click="open = false"
            >
              收起代码
            </span>
            </div>
          </div>
        </el-collapse-transition>
      </div>

    </div>
  </ClientOnly>
</template>

<script>
export default {
  props: {
    url: ''
  },
  data() {
    return {
      open: false,
      dynamicComponent: null
    };
  },
  mounted() {
    this.dynamicComponent = this.url.replace(/\/|\.vue/g, '');
    // this.$nextTick(() => {
    //   import(`/zo-methods/zoannComponentsDoc/examples/${this.url}`).then(module => {
    //     this.dynamicComponent = module.default;
    //   });
    // });
  },
  methods: {
    copy() {
      const text = this.$refs.codeRef.textContent.replace('vue', '');
      const r = this.copyText(text);
      if (r) {
        this.$message.success('已复制');
      } else {
        this.$message.error('复制失败');
      }
    },
    handleCopy() {
      if (this.open && document.execCommand('copy')) {
        const range = document.createRange();
        range.selectNode(this.$refs.codeRef.childNodes[1].childNodes[2]); //获取复制内容的 id 选择器
        const selection = window.getSelection(); //创建 selection对象
        if (selection.rangeCount > 0) selection.removeAllRanges(); //如果页面已经有选取了的话，会自动删除这个选区，没有选区的话，会把这个选取加入选区
        selection.addRange(range); //将range对象添加到selection选区当中，会高亮文本块
        document.execCommand('copy'); //复制选中的文字到剪贴板
        selection.removeRange(range); // 移除选中的元素
        this.$message.success('已复制');
      } else {
        this.copy();
      }
    },
    copyText(value) {
      try {
        var input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', value);
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          document.body.removeChild(input);
          return true;
        }
        document.body.removeChild(input);
        return false;
      } catch (_a) {
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.code-show {
  border: 1px solid var(--code-show-border-color);
  margin: 30px 0;

  .menu {
    width: 100%;
    min-height: 40px;
    border: 1px solid #dcdfe6;
    border-top: none;
    text-align: right;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    position: sticky;
    left: 0;
    top: 63px;
    z-index: 19;
    user-select: none;

    .item {
      cursor: pointer;
      display: inline-block;
      margin: 0 5px;

      svg {
        width: 20px;
        height: 20px;
        margin: 10px 0;
      }
    }
  }

  .examples {
    border: 1px solid #dcdfe6;
    padding: 20px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .code {
    overflow: hidden;
    transition: all 0.3s;

    &.hidden {
      height: 0;
    }

    &.show {
      height: 500px;
    }
  }

  .close-code {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #999;
    position: sticky;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 19;
    background: var(--vp-nav-bg-color);

    .text {
      cursor: pointer;
    }
  }
}
</style>
