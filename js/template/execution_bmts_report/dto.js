const ge_dto = (table) => {
    let template = `package ${base_package}.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

${annotation}
@Data
@ApiModel(value = "${table.camelNameUpper}OutputDTO", description = "${table.name}-出参")
public class ${table.camelNameUpper}OutputDTO {
${table.attrTextSwagger}
}
`
    return template
}