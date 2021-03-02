const ge_resultOutputDTO = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.dto.${table.lowerName};

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

${annotation}
@Data
@ApiModel(value = "${table.camelNameUpper}ResultOutputDTO", description = "操作${table.name}信息出参")
public class ${table.camelNameUpper}ResultOutputDTO {
    @ApiModelProperty(value = "操作结果")
    public Boolean operateResult;

    @ApiModelProperty(value = "错误提示信息")
    public String errorMessage;

    @ApiModelProperty(value = "${table.name}标识")
    private Long ${table.camelPk};
}
    
    `
    return template
}