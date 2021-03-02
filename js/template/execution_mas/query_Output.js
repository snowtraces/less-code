const ge_query_Output = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.dto.${table.lowerName};

import ${base_package}.common.dto.BaseServiceDTO;
import lombok.Data;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
public class Query${table.camelNameUpper}Output extends BaseServiceDTO {
${table.attrText}
}
    `
    return template
}