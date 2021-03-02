const ge_save_Input = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.dto.${table.lowerName};

import com.winning.execution.mdm.common.constants.BaseGetRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
public class Save${table.camelNameUpper}Input extends BaseGetRequest {
${table.attrText}
}
    `
    return template
}