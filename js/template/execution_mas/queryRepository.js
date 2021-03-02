const ge_queryRepository = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.repository;

import com.winning.base.akso.common.page.WinPagedList;
import ${base_package}.${scope.SERVICE}.dto.${table.lowerName}.Query${table.camelNameUpper}Input;
import ${base_package}.${scope.SERVICE}.entity.${table.lowerName}.${table.camelNameUpper}PO;

${annotation}
public interface ${table.camelNameUpper}QueryRepository {
    /**
     * 查询${table.name}集合
     *
     * @param inputDO
     * @return ${table.name}列表
     */
    WinPagedList<${table.camelNameUpper}PO> queryByExample(Query${table.camelNameUpper}Input inputDO);
}
    `
    return template
}