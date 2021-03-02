const ge_query_InputDTO = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.dto.${table.lowerName};

import com.winning.base.akso.rpc.WinRpcQueryRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "Query${table.camelNameUpper}InputDTO", description = "查询${table.name}信息入参")
public class Query${table.camelNameUpper}InputDTO extends WinRpcQueryRequest {
${table.attrTextSwagger}
}
    `
    return template
}