const ge_delete_Input = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()

    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let attrText = table.attrs.map(attr => {
        return `    /**
     * ${attr.name}
     */${attr.primary ? '\n    @Id' : ''}
    @Column(name = "${attr.code}")
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
   `
    }).join('\n')
    

    let template = `package ${base_package}.dto.${package};

import com.winning.execution.mdm.common.constants.BaseGetRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Delete${firstUpperCamelName}Input extends BaseGetRequest {
    /**
     * ${table.name}标识
     */
    @NotNull
    private Long ${pkCamelName};
}

    `
    return template
}