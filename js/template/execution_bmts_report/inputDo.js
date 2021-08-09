const ge_inputDo = (table) => {
    let template = `package ${base_package}.dto;

import com.winning.clinical.mdm.common.dto.BaseQueryRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
public class Query${table.shortCamelNameUpper}ByExampleInputDO extends BaseQueryRequest {
${table.attrText}
}
    `
    return template
}