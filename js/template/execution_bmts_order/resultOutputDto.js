const ge_resultOutputDto = (table) => {
    let template = `package ${base_package}.dtos.output.${scope.RESOURCE};

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

${annotation}
@Data
@AllArgsConstructor
@ApiModel(value = "${table.camelNameUpper}ResultOutputDto", description = "操作${table.name}信息出参")
public class ${table.camelNameUpper}ResultOutputDto {
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