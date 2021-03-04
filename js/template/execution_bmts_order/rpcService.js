const ge_rpcService = (table) => {
    let template = `package ${base_package}.api;

import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.tie.ApiTie;
import com.winning.base.akso.tie.Domain;
import com.winning.base.akso.tie.Ties;
import ${base_package}.constants.ExeOrdBtsApiPathConstant;
import ${base_package}.constants.ExeOrdBtsConstant;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}SaveInputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}QueryOutputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}ResultOutputDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

${annotation}
@FeignClient(ExeOrdBtsConstant.REGISTRY_SERVICE_NAME)
@ApiTie(value = Ties.BMTS, domain = Domain.EXE)
public interface ${table.camelNameUpper}RpcService {

    /**
     * 保存${table.name}
     *
     * @param inputDto ${table.name}信息
     * @return 保存结果
     */
    @PostMapping(ExeOrdBtsApiPathConstant.SAVE_${table.code}_V1)
    WinRpcResponse<${table.camelNameUpper}ResultOutputDto> save${table.camelNameUpper}(${table.camelNameUpper}SaveInputDto inputDto);

    /**
     * 删除${table.name}入参
     *
     * @param inputDto ${table.name}信息
     * @return 删除结果
     */
    @PostMapping(ExeOrdBtsApiPathConstant.DELETE_${table.code}_V1)
    WinRpcResponse<${table.camelNameUpper}ResultOutputDto> delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto inputDto);

    /**
     * 多条件查询${table.name}信息
     *
     * @param inputDto 查询入参
     * @return ${table.name}信息
     */
    @PostMapping(ExeOrdBtsApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1)
    WinRpcResponse<List<${table.camelNameUpper}QueryOutputDto>> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDto);

}
    `
    return template
}