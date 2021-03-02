const ge_save_InputDTO = (table) => {
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
@ApiModel(value = "Save${table.camelNameUpper}InputDTO", description = "保存${table.name}信息入参")
public class Save${table.camelNameUpper}InputDTO extends WinRpcRequest {
${table.attrTextSwagger}
}
    
    `
    return template
}