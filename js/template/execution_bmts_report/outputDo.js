const ge_outputDo = (table) => {
    let template = `package ${base_package}.dto;

import lombok.Data;

${annotation}
@Data
public class Query${table.shortCamelNameUpper}ByExampleOutputDO {
${table.attrText}
}
    `
    return template
}