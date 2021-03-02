const ge_rpcService = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.api;

import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.tie.ApiTie;
import com.winning.base.akso.tie.Domain;
import com.winning.base.akso.tie.Ties;
import ${base_package}.common.api.constants.ApiPathConstants;
import ${base_package}.common.api.constants.MdmConst;
import ${base_package}.${scope.RESOURCE}.dto.${table.lowerName}.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

${annotation}
@FeignClient(MdmConst.REGISTRY_SERVICE_NAME)
@ApiTie(value = Ties.MDS, domain = Domain.EXE)
public interface ${table.camelNameUpper}RpcService {

    /**
     * 保存${table.name}
     *
     * @param inputDTO ${table.name}信息
     * @return 保存结果
     */
    @PostMapping(ApiPathConstants.SAVE_${table.code})
    WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> save${table.camelNameUpper}(Save${table.camelNameUpper}InputDTO inputDTO);

    /**
     * 删除${table.name}入参
     *
     * @param inputDTO ${table.name}信息
     * @return 删除结果
     */
    @PostMapping(ApiPathConstants.DELETE_${table.code})
    WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> delete${table.camelNameUpper}(Delete${table.camelNameUpper}InputDTO inputDTO);

    /**
     * 多条件查询${table.name}信息
     *
     * @param inputDTO 查询入参
     * @return ${table.name}信息
     */
    @PostMapping(ApiPathConstants.QUERY_${table.code}_BY_EXAMPLE)
    WinRpcResponse<List<Query${table.camelNameUpper}OutputDTO>> query${table.camelNameUpper}ByExample(Query${table.camelNameUpper}InputDTO inputDTO);

    /**
     * 启用${table.name}
     *
     * @param inputDTO 启用状态入参
     */
    @PostMapping(ApiPathConstants.ENABLE_${table.code})
    WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> enable${table.camelNameUpper}(ChangeEnabledFlag${table.camelNameUpper}InputDTO inputDTO);

    /**
     * 禁用${table.name}
     *
     * @param inputDTO 禁用状态入参
     */
    @PostMapping(ApiPathConstants.DISABLE_${table.code})
    WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> disable${table.camelNameUpper}(ChangeEnabledFlag${table.camelNameUpper}InputDTO inputDTO);

}
    `
    return template
}