const ge_resultOutput = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.dto.${table.lowerName};

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ${table.camelNameUpper}ResultOutput {
    /**
     * 操作结果
     */
    public Boolean operateResult;

    /**
     * 操作异常信息
     */
    public String errorMessage;

    /**
     * ${table.name}标识
     */
    private Long ${table.camelPk};
}
    `
    return template
}