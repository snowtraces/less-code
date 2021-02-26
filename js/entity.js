class Attribute {
    constructor(name, code, type, length, precision, primary, foreignKey, mandatory) {
        this.name = name
        this.type = type
        this.code = code
        this.length = length
        this.precision = precision
        this.primary = Boolean(primary)
        this.mandatory = Boolean(mandatory)
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
    constructor(name, pathMeta, template) {
        this.name = name
        this.pathMeta = pathMeta
        this.template = template
    }
}