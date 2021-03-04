const ge_po = (table) => {
    let template = `package ${base_package}.persistence.entity;

import ${base_package}.persistence.entity.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "${table.code}")
public class ${table.camelNameUpper} extends BaseEntity {
${table.attrTextJpa}
}
    `
    return template
}