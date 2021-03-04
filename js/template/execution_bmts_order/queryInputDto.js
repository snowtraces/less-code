const ge_queryInputDto = (table) => {
    let template = `package ${base_package}.dtos.input.${scope.RESOURCE};
    
import com.winning.base.akso.rpc.WinRpcQueryRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "${table.camelNameUpper}QueryInputDto", description = "查询${table.name}信息入参")
public class ${table.camelNameUpper}QueryInputDto extends WinRpcQueryRequest {
${table.attrTextSwagger}
}
    `
    return template
}