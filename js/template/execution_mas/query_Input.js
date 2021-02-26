const ge_query_Input = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

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

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Query${firstUpperCamelName}Input extends BaseGetRequest {
${attrText}
}
    `
    return template
}