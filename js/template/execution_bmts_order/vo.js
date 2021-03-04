const ge_vo = (table) => {
    let template = `package ${base_package}.common.valueobjects.${scope.RESOURCE};

import ${base_package}.common.valueobjects.base.BaseVo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

${annotation}
@EqualsAndHashCode(callSuper = true)
@Data
public class ${table.camelNameUpper}Vo extends BaseVo implements Serializable {
${table.attrText}
}
    
    `
    return template
}