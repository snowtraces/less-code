const ge_repository = (table) => {
    let template = `package ${base_package}.domain.repositories;

import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;

import java.util.Date;

public interface ${table.camelNameUpper}Repository {
    /**
     * 保存${table.name}
     *
     * @param vo ${table.name}
     */
    void save(${table.camelNameUpper}Vo vo);

    /**
     * 根据${table.name}标识删除${table.name}
     *
     * @param ${table.camelPk}   ${table.name}标识
     * @param modifiedAt   修改时间
     * @param hospitalSOID 医院soid
     */
    void deleteBy${table.camelPkUpper}(Long ${table.camelPk}, Date modifiedAt, Long hospitalSOID);

    /**
     * 根据主键查询${table.name}信息
     *
     * @param ${table.camelPk}    ${table.name}标识
     * @param hospitalSOIDs 医院soid
     * @return ${table.name}信息
     */
    ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long ${table.camelPk}, Long[] hospitalSOIDs);
}
    `
    return template
}