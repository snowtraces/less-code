const ge_service = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.service.service;

import com.winning.base.akso.common.page.WinPagedList;
import ${base_package}.${scope.SERVICE}.dto.${table.camelName}.*;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
public interface ${table.camelNameUpper}Service {
    /**
     * 保存${table.name}
     * @param save${table.camelNameUpper}Input
     * @return
     */
    public ${table.camelNameUpper}ResultOutput save${table.camelNameUpper}(Save${table.camelNameUpper}Input save${table.camelNameUpper}Input);

    /**
     * 删除${table.name}
     * @param delete${table.camelNameUpper}Input
     * @return
     */
    public ${table.camelNameUpper}ResultOutput delete${table.camelNameUpper}(Delete${table.camelNameUpper}Input delete${table.camelNameUpper}Input);

    /**
     * 查询${table.name}
     *
     * @param inputDO 查询入参
     * @return ${table.name}信息
     */
    WinPagedList<Query${table.camelNameUpper}Output> query${table.camelNameUpper}ByExample(Query${table.camelNameUpper}Input inputDO);
}
    `
    return template
}