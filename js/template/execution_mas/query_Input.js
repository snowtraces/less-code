const ge_query_Input = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.dto.${table.lowerName};

import ${base_package}.common.constants.BaseGetRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
public class Query${table.camelNameUpper}Input extends BaseGetRequest {
${table.attrText}
}
    `
    return template
}