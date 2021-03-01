const ge_query_OutputDTO = (table) => {
    let base_package = 'com.winning.execution.mdm'
    let resource = 'criticalvalue'
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
     */
    @ApiModelProperty(value = "${attr.name}", name = "${$.toCamelCase(attr.code)}")
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
   `
    }).join('\n')
    
    // TODO : resource
    let template = `package ${base_package}.resource.dto.${package};

import ${base_package}.common.dto.BaseOutputDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@Data
@ApiModel(value = "Query${firstUpperCamelName}OutputDTO", description = "查询${table.name}信息出参")
public class Query${firstUpperCamelName}OutputDTO extends BaseOutputDTO {
${attrText}
}
    `
    return template
}