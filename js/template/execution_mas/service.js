const ge_service = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    let template = `package ${base_package}.service.service;

import com.winning.base.akso.common.page.WinPagedList;
import ${base_package}.dto.${camelName}.*;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
public interface ${firstUpperCamelName}Service {
    /**
     * 保存${table.name}
     * @param save${firstUpperCamelName}Input
     * @return
     */
    public ${firstUpperCamelName}ResultOutput save${firstUpperCamelName}(Save${firstUpperCamelName}Input save${firstUpperCamelName}Input);

    /**
     * 删除${table.name}
     * @param delete${firstUpperCamelName}Input
     * @return
     */
    public ${firstUpperCamelName}ResultOutput delete${firstUpperCamelName}(Delete${firstUpperCamelName}Input delete${firstUpperCamelName}Input);

    /**
     * 查询${table.name}
     *
     * @param inputDO 查询入参
     * @return ${table.name}信息
     */
    WinPagedList<Query${firstUpperCamelName}Output> query${firstUpperCamelName}ByExample(Query${firstUpperCamelName}Input inputDO);
}
    `
    return template
}