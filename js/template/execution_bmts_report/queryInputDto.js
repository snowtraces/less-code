const ge_queryInputDto = (table) => {
    let template = `package ${base_package}.dtos.criticalvalue.input;

import com.winning.base.akso.rpc.WinRpcRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

${annotation}
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "${table.camelNameUpper}QueryInputDto", description = "危急值-${table.name}")
public class ${table.camelNameUpper}QueryInputDto extends WinRpcRequest {
${table.attrTextSwagger}
}
`
    return template
}