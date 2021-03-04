const ge_queryInputVo = (table) => {
    let template = `package ${base_package}.common.valueobjects.${scope.RESOURCE};

import com.winning.base.akso.rpc.WinRpcRequest;
import lombok.Data;
    
${annotation}
@Data
public class ${table.camelNameUpper}QueryInputVo extends WinRpcRequest {
${table.attrText}
}
`
    return template
}