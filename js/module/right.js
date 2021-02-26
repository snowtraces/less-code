{
    let view = {
        el: '#right',
        template: `<div class="data-ctrl"><select class="file-name"></select></div>
        <div class="data-in">
            <textarea spellcheck="false" name="ge-result" id="ge-result"></textarea>
        </div>`,
        render(data) {
            $.el(this.el).innerHTML = $.evalTemplate(this.template, data)
        }
    }

    let model = {
        typeToFileMap: {}
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents() {
            $.bindEvent('#right > .data-ctrl > select.file-name', 'change', () => {
                let type = $.el('#right > .data-ctrl > select.file-name').value
                let file = this.model.typeToFileMap[type]
                $.el('#ge-result').value = file.template
            })

        },
        bindEventHub() {
            window.eventHub.on('onCodeReady', (fileList) => {
                // 1. 数据初始化 & 生成导航
                let typeToFileMap = {}
                $.el('#right > .data-ctrl > select.file-name').innerHTML = ''
                fileList.forEach((file, idx) => {
                    let type = file.type

                    // 导航
                    let btn = document.createElement('option')
                    btn.innerText = type
                    $.el('#right > .data-ctrl > select.file-name').append(btn)

                    // 数据初始化
                    this.model.typeToFileMap[type] = file
                })

                // 2. 默认展示第一个结果
                let file = fileList[0];
                $.el('#ge-result').value = file.template

            })
        }
    }

    controller.init(view, model)
}
