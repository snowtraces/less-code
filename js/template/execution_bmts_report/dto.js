const ge_dto = (table) => {
    let template = `package ${base_package}.dtos.criticalvalue;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

${annotation}
@Data
@ApiModel(value = "${table.camelNameUpper}Dto", description = "危急值-危急值报告操作记录")
public class ${table.camelNameUpper}Dto {
${table.attrTextSwagger}
}
`
    return template
}