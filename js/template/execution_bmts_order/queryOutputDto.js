const ge_queryOutputDto = (table) => {
    let template = `package ${base_package}.dtos.output.${scope.RESOURCE};

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
    
${annotation}
@Data
@ApiModel(value = "${table.camelNameUpper}QueryOutputDto", description = "查询${table.name}信息出参")
public class ${table.camelNameUpper}QueryOutputDto {
${table.attrTextSwagger}
}
    `
    return template
}