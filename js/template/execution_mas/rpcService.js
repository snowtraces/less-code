const ge_rpcService = (table) => {
    let base_package = 'com.winning.execution.mdm'
    let resource = 'criticalvalue'
    let package = table.code.replaceAll('_', '').toLowerCase()

    // 表名
    let camelName = $.toCamelCase(table.code)
    let firstUpperCamelName = $.firstUpperCase(camelName)

    // 主键
    let pk = table.primaryKey
    let pkCamelName = $.toCamelCase(pk)
    let pkFirstUpperCamelName = $.firstUpperCase(pkCamelName)

    let attrText = table.attrs.map(attr => {
        return `    /**
     * ${attr.name}
     */${attr.primary ? '\n    @Id' : ''}
    @Column(name = "${attr.code}")
    private ${attr.javaType} ${$.toCamelCase(attr.code)};
   `
    }).join('\n')
    
    // TODO : resource
    let template = `package ${base_package}.resource.api;

import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.tie.ApiTie;
import com.winning.base.akso.tie.Domain;
import com.winning.base.akso.tie.Ties;
import com.winning.execution.mdm.common.api.constants.ApiPathConstants;
import com.winning.execution.mdm.common.api.constants.MdmConst;
import com.winning.execution.mdm.${resource}.dto.${package}.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
@FeignClient(MdmConst.REGISTRY_SERVICE_NAME)
@ApiTie(value = Ties.MDS, domain = Domain.EXE)
public interface ${firstUpperCamelName}RpcService {

    /**
     * 保存${table.name}
     *
     * @param inputDTO ${table.name}信息
     * @return 保存结果
     */
    @PostMapping(ApiPathConstants.SAVE_${table.code})
    WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> save${firstUpperCamelName}(Save${firstUpperCamelName}InputDTO inputDTO);

    /**
     * 删除${table.name}入参
     *
     * @param inputDTO ${table.name}信息
     * @return 删除结果
     */
    @PostMapping(ApiPathConstants.DELETE_${table.code})
    WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> delete${firstUpperCamelName}(Delete${firstUpperCamelName}InputDTO inputDTO);

    /**
     * 多条件查询${table.name}信息
     *
     * @param inputDTO 查询入参
     * @return ${table.name}信息
     */
    @PostMapping(ApiPathConstants.QUERY_${table.code}_BY_EXAMPLE)
    WinRpcResponse<List<Query${firstUpperCamelName}OutputDTO>> query${firstUpperCamelName}ByExample(Query${firstUpperCamelName}InputDTO inputDTO);

    /**
     * 启用${table.name}
     *
     * @param inputDTO 启用状态入参
     */
    @PostMapping(ApiPathConstants.ENABLE_${table.code})
    WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> enable${firstUpperCamelName}(ChangeEnabledFlag${firstUpperCamelName}InputDTO inputDTO);

    /**
     * 禁用${table.name}
     *
     * @param inputDTO 禁用状态入参
     */
    @PostMapping(ApiPathConstants.DISABLE_${table.code})
    WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> disable${firstUpperCamelName}(ChangeEnabledFlag${firstUpperCamelName}InputDTO inputDTO);

}
    `
    return template
}