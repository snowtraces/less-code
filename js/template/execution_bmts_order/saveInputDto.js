const ge_saveInputDto = (table) => {
    let template = `package ${base_package}.dtos.input.${scope.RESOURCE};

import com.winning.base.akso.rpc.WinRpcRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
    
${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "${table.camelNameUpper}SaveInputDto", description = "保存${table.name}信息入参")
public class ${table.camelNameUpper}SaveInputDto extends WinRpcRequest {
${table.attrTextSwagger}
}
    `
    return template
}