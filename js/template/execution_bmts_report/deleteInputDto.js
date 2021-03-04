const ge_deleteInputDto = (table) => {
    let template = `package ${base_package}.dtos.criticalvalue.input;

import com.winning.base.akso.rpc.WinRpcRequest;
import ${base_package}.dtos.criticalvalue.${table.camelNameUpper}Dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

${annotation}
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "${table.camelNameUpper}DeleteInputDto",description = "删除危${table.name}入参")
public class ${table.camelNameUpper}DeleteInputDto extends WinRpcRequest {
${table.pkTextSwagger}
}
    `
    return template
}