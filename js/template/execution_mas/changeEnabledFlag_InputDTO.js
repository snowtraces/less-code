const ge_changeEnabledFlag_InputDTO = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.dto.${table.lowerName};

import com.winning.base.akso.rpc.WinRpcRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "ChangeEnabledFlag${table.camelNameUpper}InputDTO", description = "更改${table.name}启用状态入参")
public class ChangeEnabledFlag${table.camelNameUpper}InputDTO extends WinRpcRequest {
${table.pkTextSwagger}
}
    `
    return template
}