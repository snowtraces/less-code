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
        } else if (type.startsWith('nvarchar')) {
            javaType = 'String'
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
}

class TemplateFile {
    constructor(type, name, pathMeta, template) {
        this.type = type
        this.name = name
        this.pathMeta = pathMeta
        this.template = template
    }
}