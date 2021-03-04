const ge_po = (table) => {
    let template = `package ${base_package}.persistence.entity.${scope.RESOURCE};

import ${base_package}.persistence.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

${annotation}
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "${table.code}")
public class ${table.camelNameUpper} extends BaseEntity {
${table.attrTextJpa}
}
    `
    return template
}