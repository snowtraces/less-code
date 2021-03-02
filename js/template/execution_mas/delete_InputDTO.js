const ge_delete_InputDTO = (table) => {
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
@ApiModel(value = "Delete${table.camelNameUpper}InputDTO", description = "删除${table.name}信息入参")
public class Delete${table.camelNameUpper}InputDTO extends WinRpcRequest {
${table.pkTextSwagger}
}
    `
    return template
}