const ge_rpcService = (table) => {
    let template = `package ${base_package}.api;

import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.tie.ApiTie;
import com.winning.base.akso.tie.Domain;
import com.winning.base.akso.tie.Ties;
import ${base_package}.constants.ApiPathConstant;
import ${base_package}.constants.ExeRptConstant;
import ${base_package}.dtos.${scope.RESOURCE}.${table.camelNameUpper}Dto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}InputDto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.output.MgtResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

${annotation}
@FeignClient(ExeRptConstant.REGISTRY_SERVICE_NAME)
@ApiTie(value= Ties.BMTS,domain = Domain.EXE)
public interface ${table.camelNameUpper}RpcService {

    /**
     * 保存${table.name}
     * @param inputDto
     * @return
     */
    @PostMapping(value = ApiPathConstant.SAVE_${table.code}_V1)
    WinRpcResponse<MgtResult> save${table.camelNameUpper}(${table.camelNameUpper}InputDto inputDto);

    /**
     * 删除${table.name}
     * @param inputDto
     * @return
     */
    @PostMapping(value = ApiPathConstant.DELETE_${table.code}_V1)
    WinRpcResponse<MgtResult> delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto inputDto);

    /**
     * 多条件查询${table.name}
     * @param inputDto
     * @return
     */
    @PostMapping(value = ApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1)
    WinRpcResponse<List<${table.camelNameUpper}Dto>> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDto);
}
    `
    return template
}