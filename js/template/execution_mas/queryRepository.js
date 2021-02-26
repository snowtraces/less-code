const ge_queryRepository = (table) => {
    let base_package = 'com.winning.execution.mdm.service'
    let package = table.code.replaceAll('_', '').toLowerCase()
    
    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let template = `package ${base_package}.repository;

import com.winning.base.akso.common.page.WinPagedList;
import ${base_package}.dto.${package}.Query${firstUpperCamelName}Input;
import ${base_package}.entity.${package}.${firstUpperCamelName}PO;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
public interface ${firstUpperCamelName}QueryRepository {
    /**
     * 查询${table.name}集合
     *
     * @param inputDO
     * @return ${table.name}列表
     */
    WinPagedList<${firstUpperCamelName}PO> queryByExample(Query${firstUpperCamelName}Input inputDO);
}
    `
    return template
}