const ge_repository = (table) => {
    let template = `package ${base_package}.domain.repositories;

import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}QueryInputVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;

import java.util.Date;
import java.util.List;

${annotation}
public interface ${table.camelNameUpper}Repository {
    /**
     * ${table.name} 持久化
     *
     * @param inputVo 保存入参
     * @return
     */
    Long save${table.camelNameUpper}(${table.camelNameUpper}Vo inputVo);

    /**
     * 根据${table.camelPk}删除${table.name}
     *
     * @param hospitalSOID        医院soid
     * @param modifiedAt          修改时间
     * @param ${table.camelPk} 主键标识
     * @return
     */
    Long deleteBy${table.camelPkUpper}(Long hospitalSOID, Date modifiedAt, Long ${table.camelPk});

    /**
     * 根据主键查询${table.name}
     *
     * @param hospitalSOID        医院soid
     * @param ${table.camelPk} 主键标识
     * @return
     */
    ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long hospitalSOID, Long ${table.camelPk});

    /**
     * 多条件查询
     *
     * @param input 查询条件
     * @return
     */
    List<${table.camelNameUpper}Vo> query${table.camelNameUpper}(${table.camelNameUpper}QueryInputVo input);
}
`
    return template
}