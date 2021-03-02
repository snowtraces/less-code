const ge_query_OutputDTO = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.dto.${table.lowerName};

import ${base_package}.common.dto.BaseOutputDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

${annotation}
@Data
@ApiModel(value = "Query${table.camelNameUpper}OutputDTO", description = "查询${table.name}信息出参")
public class Query${table.camelNameUpper}OutputDTO extends BaseOutputDTO {
${table.attrTextSwagger}
}
    `
    return template
}