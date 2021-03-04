const ge_deleteInputDto = (table) => {
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
@ApiModel(value = "${table.camelNameUpper}DeleteInputDto", description = "删除${table.name}信息入参")
public class ${table.camelNameUpper}DeleteInputDto extends WinRpcRequest {
${table.pkTextSwagger}
}
    `
    return template
}