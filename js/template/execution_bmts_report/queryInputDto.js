const ge_queryInputDto = (table) => {
    let template = `package ${base_package}.api.dto;

import com.winning.base.akso.rpc.WinRpcRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

${annotation}
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "Query${table.shortCamelNameUpper}ByExampleInputDTO", description = "${table.name}查询-入参")
public class Query${table.shortCamelNameUpper}ByExampleInputDTO extends WinRpcRequest {
${table.attrTextSwagger}
}
`
    return template
}