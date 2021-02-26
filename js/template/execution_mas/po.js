const ge_po = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    let attrText = table.attrs.map(attr => {
        return `        /**
        * ${attr.name}
        */
       @Id
       @Column(name = "${attr.code}")
       private Long ${$.toCamelCase(attr.code)};
   `
    }).join('\n')
    

    let template = `package ${base_package}.entity.${package};

import ${base_package}.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "${table.code}")
public class ${firstUpperCamelName}PO extends BaseEntity {
${attrText}
}
    `
    return template
}