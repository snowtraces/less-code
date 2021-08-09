const ge_po = (table) => {
    let template = `package ${base_package}.entity.${scope.RESOURCE};

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
public class ${table.camelNameUpper}Entity extends BaseEntity {
${table.attrTextJpa}
}
    `
    return template
}