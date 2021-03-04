const ge_service = (table) => {
    let template = `package ${base_package}.domain.service;

import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}SaveInputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}QueryOutputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}ResultOutputDto;

import java.util.List;

${annotation}
public interface ${table.camelNameUpper}Service {
    /**
     * 保存${table.name}
     *
     * @param saveInputDto
     * @return
     */
    ${table.camelNameUpper}ResultOutputDto save${table.camelNameUpper}(${table.camelNameUpper}SaveInputDto saveInputDto);

    /**
     * 删除${table.name}
     *
     * @param deleteInputDto
     * @return
     */
    ${table.camelNameUpper}ResultOutputDto delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto deleteInputDto);

    /**
     * 查询${table.name}
     *
     * @param inputDO 查询入参
     * @return ${table.name}信息
     */
    List<${table.camelNameUpper}QueryOutputDto> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDO);
}
    `
    return template
}