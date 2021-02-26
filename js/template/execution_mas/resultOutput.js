const ge_resultOutput = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    
    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let template = `package ${base_package}.dto.${package};

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ${firstUpperCamelName}ResultOutput {
    /**
     * 操作结果
     */
    public Boolean operateResult;

    /**
     * 操作异常信息
     */
    public String errorMessage;

    /**
     * 危急值活动标识
     */
    private Long ${pkCamelName};
}
    `
    return template
}