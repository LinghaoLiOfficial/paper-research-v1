<template>
    <div class=" h-full w-full flex flex-col">
        <vue-markdown-editor
        v-model="editor"
        height="100%"
        :disabled-menus="[]"
        @upload-image="onUploadImage"
        ></vue-markdown-editor>
    </div>
</template>
  
<script>
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import axios from 'axios'

VueMarkdownEditor.use(vuepressTheme, { Prism, extend(md) {} });

export default {
    data() {
      return {
        editor: '',
      }
    },
    components: { VueMarkdownEditor },
    mounted() {
        document.querySelector('.v-md-editor').style.height = document.body.offsetHeight - 50 + 'px'
    },
    methods: {
         // 上传图片
        onUploadImage(event, insertImage, files) {
            console.log("1");
            const file = files[0],
                  path = process.env.VUE_APP_BASE_API,
                  index = path.lastIndexOf("\/")
            let param = new FormData()
            param.append('image', file)
            const config = { headers: {
              'Content-Type': 'multipart/form-data',
            } }
            axios.post(`${path}doc/uploadfile/`, param, config).then(r => {
                if(r.data.code == 200) {
                  const last = path.slice(0, index)
                  insertImage({
                      url: last + r.data.data.url,
                      desc: files[0].name
                  })
                }
            }).catch(e => {
                this.Toast(2, '图片上传出了点小问题，请稍后重试')
            })
        }
    }
};
</script>
<style>
    .vuepress-markdown-body h1{ font-size: 28px; }
    .vuepress-markdown-body h2{ font-size: 26px; }
    .vuepress-markdown-body h3{ font-size: 24px; }
    .vuepress-markdown-body h4{ font-size: 22px; }
    .vuepress-markdown-body h5{ font-size: 20px; }
    .vuepress-markdown-body:not(.custom){padding: 5px 10px!important;}
</style>