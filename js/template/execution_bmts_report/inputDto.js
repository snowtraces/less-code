const ge_inputDto = (table) => {
    let template = `package ${base_package}.dtos.criticalvalue.input;

import com.winning.base.akso.rpc.WinRpcRequest;
import ${base_package}.dtos.criticalvalue.${table.camelNameUpper}Dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "${table.camelNameUpper}InputDto",description = "${table.name}")
public class ${table.camelNameUpper}InputDto extends WinRpcRequest {

    @ApiModelProperty(value = "${table.name}")
    private ${table.camelNameUpper}Dto ${table.camelName}Dto;
}
`
    return template
}