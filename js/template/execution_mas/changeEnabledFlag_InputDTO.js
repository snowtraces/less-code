const ge_changeEnabledFlag_InputDTO = (table) => {
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

import com.winning.base.akso.rpc.WinRpcRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "ChangeEnabledFlag${firstUpperCamelName}InputDTO", description = "更改${table.name}启用状态入参")
public class ChangeEnabledFlag${firstUpperCamelName}InputDTO extends WinRpcRequest {

    /**
     * ${table.name}标识
     */
    @NotNull
    @ApiModelProperty(value = "${table.name}标识", name = "${pkCamelName}", required = true)
    private Long ${pkCamelName};
}
    `
    return template
}