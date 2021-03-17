class Attribute {
    constructor(name, code, type, length, precision, primary, foreignKey, mandatory) {
        this.name = name
        this.type = type
        this.code = code
        this.length = length
        this.precision = precision
        this.primary = primary === 'TRUE'
        this.mandatory = primary === 'TRUE'

        // TODO javaType
        let javaType = null
        if (type.startsWith('numeric')) {
            javaType = 'Long'
        } else if (type.startsWith('smallint')) {
            javaType = 'Integer'
        } else if (type.includes('varchar')) {
            javaType = 'String'
        } else if (type.includes('datetime')) {
            javaType = 'Date'
        }

        if (!javaType) {
            $.errorMsg(`未知的数据类型：${type}`)
        } else {
            this.javaType = javaType
        }
    }
}

class Table {
    constructor() {
        this.name = ''
        this.code = ''
        this.id = ''
        this.attrs = []
        this.ext = {}
    }

    get primaryKey() {
        if (this.id) {
            return this.id;
        } else {
            let id = this.attrs.filter(attr => attr.primary)[0].code
            if (id) {
                this.id = id
                return id
            }
        }
        return ''
    }

    get lowerName() {
        if (this.ext.lowerName) {
            return this.ext.lowerName
        } else {
            let lowerName = this.code.replaceAll('_', '').toLowerCase()
            this.ext.lowerName = lowerName
            return lowerName
        }
    }

    get camelName() {
        if (this.ext.camelName) {
            return this.ext.camelName
        } else {
            let camelName = $.toCamelCase(this.code)
            this.ext.camelName = camelName
            return camelName
        }
    }

    get camelNameUpper() {
        if (this.ext.camelNameUpper) {
            return this.ext.camelNameUpper
        } else {
            let camelNameUpper = $.firstUpperCase($.toCamelCase(this.code))
            this.ext.camelNameUpper = camelNameUpper
            return camelNameUpper
        }
    }

    get camelPk() {
        if (this.ext.camelPk) {
            return this.ext.camelPk
        } else {
            let camelPk = $.toCamelCase(this.primaryKey)
            this.ext.camelPk = camelPk
            return camelPk
        }
    }

    get camelPkUpper() {
        if (this.ext.camelPkUpper) {
            return this.ext.camelPkUpper
        } else {
            let camelPkUpper = $.firstUpperCase($.toCamelCase(this.primaryKey))
            this.ext.camelPkUpper = camelPkUpper
            return camelPkUpper
        }
    }

    get attrTextSwagger() {
        if (this.ext.attrTextSwagger) {
            return this.ext.attrTextSwagger
        } else {
            let attrTextSwagger = this.attrs.map(attr => {
                return `    /**
     * ${attr.name}
     */
    @ApiModelProperty(value = "${attr.name}", name = "${$.toCamelCase(attr.code)}")
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
`
            }).join('\n')
            this.ext.attrTextSwagger = attrTextSwagger
            return attrTextSwagger
        }
    }

    get attrTextJpa() {
        if (this.ext.attrTextJpa) {
            return this.ext.attrTextJpa
        } else {
            let attrTextJpa = this.attrs.map(attr => {
                return `    /**
     * ${attr.name}
     */${attr.primary ? '\n    @Id' : ''}
    @Column(name = "${attr.code}")
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
`
            }).join('\n')
            this.ext.attrTextJpa = attrTextJpa
            return attrTextJpa
        }
    }

    get attrText() {
        if (this.ext.attrText) {
            return this.ext.attrText
        } else {
            let attrText = this.attrs.map(attr => {
                return `    /**
     * ${attr.name}
     */
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
`
            }).join('\n')
            this.ext.attrText = attrText
            return attrText
        }
    }

    get pkText() {
        if (this.ext.pkText) {
            return this.ext.pkText
        } else {
            let pkText = `    /**
     * ${this.name}标识
     */
    @NotNull
    private Long ${this.camelPk};
`
            this.ext.pkText = pkText
            return pkText
        }
    }

    get pkTextSwagger() {
        if (this.ext.pkTextSwagger) {
            return this.ext.pkTextSwagger
        } else {
            let pkTextSwagger = `    /**
     * ${this.name}标识
     */
    @NotNull
    @ApiModelProperty(value = "${this.name}标识", name = "${this.camelPk}", required = true)
    private Long ${this.camelPk};
`
            this.ext.pkTextSwagger = pkTextSwagger
            return pkTextSwagger
        }
    }
}

class TemplateFile {
    constructor(type, name, pathMeta, template) {
        this.type = type
        this.name = name
        this.pathMeta = pathMeta
        this.template = template
    }
}

class Other {
    constructor(fileName, content) {
        this.fileName = fileName
        this.content = content
    }
}