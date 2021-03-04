const ge_domainService = (table) => {
    let template = `package ${base_package}.domain.service;

import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}QueryInputVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}InputDto;
import ${base_package}.dtos.input.*;

import java.util.List;

${annotation}
public interface ${table.camelNameUpper}DomainService {

    /**
     * 保存${table.name}
     *
     * @param inputDto 入参信息
     * @return
     */
    String save${table.camelNameUpper}(${table.camelNameUpper}InputDto inputDto);

    /**
     * 根据Id删除${table.name}
     *
     * @param hospitalSOID        医院soid
     * @param ${table.camelPk} 主键标识
     * @return
     */
    String delete${table.camelNameUpper}(Long hospitalSOID, Long ${table.camelPk});

    /**
     * 根据主键查询${table.name}
     *
     * @param hospitalSOID        医院soid
     * @param ${table.camelPk} 主键标识
     * @return
     */
    ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long hospitalSOID, Long ${table.camelPk});

    /**
     * 查询${table.name}
     *
     * @param input 查询入参
     * @return
     */
    List<${table.camelNameUpper}Vo> query${table.camelNameUpper}(${table.camelNameUpper}QueryInputVo input);
}
`
    return template
}