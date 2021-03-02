const ge_delete_Input = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.dto.${table.lowerName};

import com.winning.execution.mdm.common.constants.BaseGetRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Delete${table.camelNameUpper}Input extends BaseGetRequest {
${table.pkText}
}

    `
    return template
}