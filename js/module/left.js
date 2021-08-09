{
    let view = {
        el: '#left',
        template: `<div class="data-ctrl">
        <button id="do-ge">生成</button>
    </div>
    <div class="data-in">
        <textarea spellcheck="false" name="sql-ddl" id="sql-ddl" wrap="off"></textarea>
    </div>`,
        render(data) {
            $.el(this.el).innerHTML = $.evalTemplate(this.template, data)
        }
    }

    let model = {
        cache_key: {
            KEY_SQL_DDL: 'SQL_DDL'
        },
        template: {
            path: config.path,
            needs: config.needs
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventHub()
            this.loadCache()
            this.loadTemplate()
        },
        bindEvents() {
            $.bindEvent("#do-ge", "click", () => {
                // 1. 读取源文件
                let text = $.el("#sql-ddl").value
                this.pushCache(text)

                // 2. 解析为table
                let table = this.parseText(text)
                log(table)

                // 3. 生成模板代码
                let fileList = this.table2TemplateCode(table)
                log(fileList)

                // 4. 杂项生成
                let others = this.geOthers(table)
                others.forEach(other => {
                    log(other.fileName)
                    log(other.content)
                })

                // 5. bat脚本
                let basePath = `C:/Users/snow/code/winning/6.0/winning-bmts-execution-report`
                let packagePath = `/src/main/java/com/winning/bmts/execution/report`
                let bat = `
@echo off
xcopy /S api "${basePath}/api${packagePath}/api"
xcopy /S dtos "${basePath}/api${packagePath}/dtos"
xcopy /S common "${basePath}/common${packagePath}/common"
xcopy /S domain "${basePath}/domain${packagePath}/domain"
xcopy /S persistence "${basePath}/persistence${packagePath}/persistence"
@REM xcopy /S rest "${basePath}/rest${packagePath}/rest
@echo on
                `
                let batFile = new TemplateFile('bat', 'copy.bat', [], bat)
                fileList.push(batFile)

                // 6. 触发事件
                window.eventHub.emit('onCodeReady', fileList)

            })
        },
        bindEventHub() {
        },
        ge() {
            let col = [
                { idx: 0, pos: -1 },
                { idx: 1, pos: 5, fun: (item) => item.innerText === '是' ? 'TRUE' : 'FALSE' },
                { idx: 2, pos: 0, fun: (item) => item.innerText },
                { idx: 3, pos: 1, fun: (item) => item.innerText },
                { idx: 4, pos: 2, fun: (item) => item.innerText },
                { idx: 5, pos: 3, fun: (item) => item.innerText },
                { idx: 6, pos: 4, fun: (item) => item.innerText },
                { idx: 7, pos: 7, fun: (item) => item.innerText === '是' ? 'TRUE' : 'FALSE' },
            ]

            // name, code, type, length, precision, primary, foreignKey, mandatory
            // 0      1     2      3        4          5        6          7
            let data = []
            let rawArray = Array.from(document.querySelectorAll('#dynamicDataDiv > div'))
                .map(d => Array.from(d.querySelectorAll('div')))
                .map((x, idx) => {
                    if (col[idx] && col[idx].pos !== -1) {
                        x.map((item, i) => {
                            data[i] = (data[i] || [null, null, null, null, null, null, null, null])
                            data[i][col[idx].pos] = (col[idx].fun)(item)
                        })
                    }
                })
            console.log(data)

            console.log(
                '-- pdm\n' +
                data[0][0].substring(0, data[0][0].length - 2) + '\t' +  data[0][1].substring(0, data[0][1].length - 3) + '\n' +
                data.filter(line => !['IS_DEL', 'HOSPITAL_SOID', 'CREATED_AT', 'MODIFIED_AT'].includes(line[1]))
                .map(line => line.join('\t')).join('\n')
            )
        },
        geOthers(table) {
            let others = []

            // 1. 表名静态变量
            others.push(new Other(
                'TableNameConst.java',
                `public static final String ${table.code} = "${table.code}";`
            ))

            // 2. api路径
            let apis = { save: '保存', delete: '删除', by_example: '多条件查询' }
            others.push(new Other(
                'ApiPathConstants.java',
                `${Object.keys(apis).map(apiCode => `/**
 * ${apis[apiCode]}${table.name}
 */
public static final String ${apiCode === 'by_example' ? 'QUERY_' : ''}${apiCode.toUpperCase()}_${table.code}_V1 = "/api/v1/execution/${table.code.toLowerCase()}/${apiCode}";
public static final String ${apiCode === 'by_example' ? 'QUERY_' : ''}${apiCode.toUpperCase()}_${table.code}_V1_ID = "2130-xxxx-01";
                    `).join('\n')
                }`
            ))

            return others
        },
        table2TemplateCode(table) {
            let fileList = []
            this.model.template.needs.forEach(need => {
                let fun = eval(`ge_${need}`)
                let pathMeta = this.getPathFromGeFun(fun, table)
                let template = fun(table)
                let fileName = this.fileNameConverter(need, table)
                fileList.push(new TemplateFile(
                    need,
                    fileName,
                    pathMeta,
                    template))
            })
            return fileList
        },
        getPathFromGeFun(fun, table) {
            let funString = fun.toString();
            let funLines = funString.split('\n')
            let packageLine = funLines.filter(line => line.trim().startsWith('let template = `package '))[0]
            // let template = `package ${base_package}.repository;
            let path = packageLine.trim().replace('let template = `package ${base_package}.', '');
            let pathMeta = this.singleCharSplit(path, '.', ['{', '}'])
            pathMeta = pathMeta.map(meta => {
                if (meta.endsWith(';')) {
                    meta = meta.substring(0, meta.length - 1)
                }
                if (meta.startsWith('${')) {
                    meta = meta.substring(2, meta.length - 1)
                    // meta 模板转对应的值
                    meta = this.templateConverter(meta, table)
                }
                return meta
            })

            return pathMeta
        },
        templateConverter(_name, table) {
            let converter = {
                package: (table) => table.lowerName
            }

            if (converter[_name]) {
                return converter[_name](table)
            } else {
                let nameMeta = _name.split('.')
                if (nameMeta[0] === 'table') {
                    return table[nameMeta[1]]
                }

                let result = null
                nameMeta.forEach(meta => {
                    result = result ? result[meta] : config[meta]
                })
                return result
            }
        },
        singleCharSplit(inString, dimiter, blockChars) {
            let resultArray = [];
            if (!inString) {
                return resultArray;
            }
            let inBlock = false;
            let lastChar = ''
            let cache = []
            for (let c of inString) {
                if (blockChars && blockChars.includes(c)) {
                    inBlock = !inBlock;
                }

                if (inBlock) {
                    // 在块内，直接跳过
                    cache.push(c);
                } else {
                    if (c === dimiter) {
                        // 分隔符
                        if ('\\' === lastChar) {
                            // 被转义
                            cache.push(c);
                        } else {
                            // 分割
                            if (cache.length) {
                                resultArray.push(cache.join(''));
                                cache = [];
                            }
                        }
                    } else {
                        // 普通字符
                        cache.push(c);
                    }
                }

                lastChar = c;
            }
            if (cache.length) {
                resultArray.push(cache.join(''))
            }

            return resultArray;
        },
        fileNameConverter(_name, table) {
            // 1. 首字母大写
            _name = $.firstUpperCase(_name)

            // 2. 文件名规则
            let fileName = ''
            if (!_name.includes('_')) {
                fileName = `${$.firstUpperCase($.toCamelCase(table.code))}${_name === 'Po' ? '' : _name}.java`
            } else {
                let nameMeta = _name.split('_')
                fileName = `${nameMeta[0]}${$.firstUpperCase($.toCamelCase(table.code))}${nameMeta[1]}.java`
            }

            return fileName
        },
        parseText(text) {
            let type = text.split('\n')[0].trim().substring(3)
            let parser = null
            if (type === 'ddl') {
                parser = this.parseSqlDdl
            } else if (type === 'pdm') {
                parser = this.parsePdmText
            }
            if (!parser) {
                $.errorMsg('无效的格式')
                return
            }
            return parser(text)
        },
        parsePdmText(pdmText) {
            // -- pdm
            // 危急值活动 CRITICAL_VALUE_ACTIVITY 
            // 危急值活动标识	CV_ACTIVITY_ID	numeric(19,0)	19		TRUE	FALSE	TRUE
            // 危急值流程标识	CV_PROCESS_ID	numeric(19,0)	19		FALSE	TRUE	TRUE
            // 危急值活动代码	CV_ACTIVITY_CODE	numeric(19,0)	19		FALSE	FALSE	FALSE
            // 业务事件标识	BIZ_EVENT_ID	numeric(19,0)	19		FALSE	FALSE	FALSE
            // 启用标志	ENABLED_FLAG	numeric(19,0)	19		FALSE	FALSE	FALSE
            // 排序序号	SEQ_NO	smallint			FALSE	FALSE	FALSE
            let table = new Table()

            let lines = pdmText.split('\n')

            lines.forEach((line, idx) => {
                let _line = line.trim()
                if (idx === 1) {
                    // 第一行，表名
                    let tableMeta = _line.split('\t')
                    table.name = tableMeta[0]
                    table.code = tableMeta[1]
                } else if (idx > 1) {
                    let meta = _line.split('\t')
                    let attr = new Attribute(...meta)
                    table.attrs.push(attr)
                }
            });
            return table
        },
        parseSqlDdl(sqlDdl) {
            // create table EXEMDM.CRITICAL_VALUE_ACTIVITY (
            //     CV_ACTIVITY_ID       numeric(19,0)        not null,
            //     CV_PROCESS_ID        numeric(19,0)        not null,
            //     CV_ACTIVITY_CODE     numeric(19,0)        null,
            //     BIZ_EVENT_ID         numeric(19,0)        null,
            //     ENABLED_FLAG         numeric(19,0)        null,
            //     SEQ_NO               smallint             null,
            //     HOSPITAL_SOID        numeric(19,0)        not null,
            //     IS_DEL               smallint             not null,
            //     CREATED_AT           datetime             not null,
            //     MODIFIED_AT          datetime             null,
            //     constraint PK_CRITICAL_VALUE_ACTIVITY primary key (CV_ACTIVITY_ID)
            //  )
            result = {}

            let lines = sqlDdl.split('\n')
            lines.forEach(line => {
                let _line = line.trim()
                if (_line.toUpperCase().startsWith('CREATE TABLE')) {
                    // 创建表
                    let tableName = _line.replace(/create\s+table\s+(\w+\.)?([\w_]+)\s*\(\s*$/ig, '$2')
                    result.tableName = tableName

                    onAttr = true;
                } else if (_line.startsWith(')')) {
                    onAttr = false
                    log('识别完成')
                }
            });

            return result
        },
        loadCache() {
            let sqlDdlCache = localStorage.getItem(this.model.cache_key.KEY_SQL_DDL)
            if (sqlDdlCache) {
                $.el("#sql-ddl").value = sqlDdlCache
            }
        },
        loadTemplate() {
            // 加载模板
            let jsList = this.model.template.needs.map(need => `${this.model.template.path}${need}.js`)
            syncLoad(jsList, loadScript)
        },
        pushCache(cache) {
            localStorage.setItem(this.model.cache_key.KEY_SQL_DDL, cache)
        }
    }

    controller.init(view, model)
}
