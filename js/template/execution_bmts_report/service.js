const ge_service = (table) => {
    let template = `package ${base_package}.domain.service;

import java.util.List;

public interface ${table.camelNameUpper}Service {

    /**
     * 保存${table.name}
     *
     * @param inputDto 保存入参
     * @return
     */
    MgtResult save${table.camelNameUpper}(${table.camelNameUpper}InputDto inputDto);

    /**
     * 删除${table.name}
     *
     * @param inputDto 删除入参
     * @return
     */
    MgtResult delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto inputDto);

    /**
     * 查询${table.name}
     *
     * @param inputDto 查询入参
     * @return
     */
    List<${table.camelNameUpper}Dto> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDto);

}
`
    return template
}