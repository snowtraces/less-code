const ge_endPointImpl = (table) => {
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
    let template = `package ${base_package}.resource.rest;

import com.winning.base.akso.common.page.WinPagedList;
import com.winning.base.akso.logging.core.WinLogger;
import com.winning.base.akso.logging.core.WinLoggerFactory;
import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.swagger.info.ApiStatus;
import com.winning.base.akso.swagger.info.WinningApiInfo;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.api.constants.ApiPathConstants;
import ${base_package}.common.constants.MdmConst;
import ${base_package}.${resource}.api.${firstUpperCamelName}RpcService;
import ${base_package}.${resource}.dto.${package}.*;
import ${base_package}.service.dto.${package}.*;
import ${base_package}.service.service.${firstUpperCamelName}Service;
import com.winning.pts.utils.collection.ListUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.alibaba.fastjson.JSON.toJSONString;

/**
 * @author: CHENG
 * @date: ${new Date().toLocaleDateString()}
 * @version 1.0
 */
// TODO apiPath
@Api(tags = "${resource}-${table.name}")
@RestController
public class ${firstUpperCamelName}EndPointImpl implements ${firstUpperCamelName}RpcService {

    private static final WinLogger WINLOGGER = WinLoggerFactory.getCurrentClassLogger();

    private ${firstUpperCamelName}Service ${camelName}Service;

    public ${firstUpperCamelName}EndPointImpl(${firstUpperCamelName}Service ${camelName}Service) {
        this.${camelName}Service = ${camelName}Service;
    }

    static {
        BeanMapper.registerMapperClassType(Query${firstUpperCamelName}InputDTO.class, Query${firstUpperCamelName}Input.class);
        BeanMapper.registerMapperClassType(Query${firstUpperCamelName}OutputDTO.class, Query${firstUpperCamelName}Output.class);
        BeanMapper.registerMapperClassType(Delete${firstUpperCamelName}InputDTO.class, Delete${firstUpperCamelName}Input.class);
        BeanMapper.registerMapperClassType(Save${firstUpperCamelName}InputDTO.class, Save${firstUpperCamelName}Input.class);
    }

    @PostMapping(ApiPathConstants.SAVE_${table.code})
    @ApiOperation("保存${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0083_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> save${firstUpperCamelName}(@Validated @RequestBody Save${firstUpperCamelName}InputDTO inputDTO) {
        WINLOGGER.info("保存${table.name}接口入参：Save${firstUpperCamelName}InputDTO:{}", toJSONString(inputDTO));
        Save${firstUpperCamelName}Input inputDO = BeanMapper.map(inputDTO, Save${firstUpperCamelName}Input.class);
        ${firstUpperCamelName}ResultOutput outputDO = ${camelName}Service.save${firstUpperCamelName}(inputDO);
        ${firstUpperCamelName}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${firstUpperCamelName}ResultOutputDTO.class);
        WINLOGGER.info("保存${table.name}接口出参：${firstUpperCamelName}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @PostMapping(ApiPathConstants.DELETE_${table.code})
    @ApiOperation("删除${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0084_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> delete${firstUpperCamelName}(@Validated @RequestBody Delete${firstUpperCamelName}InputDTO inputDTO) {
        WINLOGGER.info("删除${table.name}接口入参：Delete${firstUpperCamelName}InputDTO:{}", toJSONString(inputDTO));
        Delete${firstUpperCamelName}Input inputDO = BeanMapper.map(inputDTO, Delete${firstUpperCamelName}Input.class);
        ${firstUpperCamelName}ResultOutput outputDO = ${camelName}Service.delete${firstUpperCamelName}(inputDO);
        ${firstUpperCamelName}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${firstUpperCamelName}ResultOutputDTO.class);
        WINLOGGER.info("删除${table.name}接口出参：${firstUpperCamelName}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @PostMapping(ApiPathConstants.QUERY_${table.code}_BY_EXAMPLE)
    @ApiOperation("多条件查询${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0085_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<List<Query${firstUpperCamelName}OutputDTO>> query${firstUpperCamelName}ByExample(@Validated @RequestBody Query${firstUpperCamelName}InputDTO inputDTO) {
        WINLOGGER.info("多条件查询${table.name}接口入参：Query${firstUpperCamelName}InputDTO:{}", toJSONString(inputDTO));
        Long count = 0L;
        List<Query${firstUpperCamelName}OutputDTO> list = new ArrayList<>();
        Query${firstUpperCamelName}Input inputDO = BeanMapper.map(inputDTO, Query${firstUpperCamelName}Input.class);
        WinPagedList<Query${firstUpperCamelName}Output> winPagedList = ${camelName}Service.query${firstUpperCamelName}ByExample(inputDO);
        if (ListUtil.isNotEmpty(winPagedList.getData())) {
            list = BeanMapper.mapList(winPagedList.getData(), Query${firstUpperCamelName}Output.class, Query${firstUpperCamelName}OutputDTO.class);
            count = winPagedList.getCount();
        }
        WINLOGGER.info("多条件查询${table.name}接口出参：Query${firstUpperCamelName}OutputDTO:{}", toJSONString(list));
        return new WinRpcResponse<>(list, count);
    }

    @Override
    @PostMapping(ApiPathConstants.ENABLE_${table.code})
    @ApiOperation(value = "启用${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0111_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-19", updatedAt = "2020-11-19", apiStatus = ApiStatus.IN_PROCESS)
    public WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> enable${firstUpperCamelName}(@Validated @RequestBody ChangeEnabledFlag${firstUpperCamelName}InputDTO inputDTO) {
        WINLOGGER.info("启用${table.name}接口入参：ChangeEnabledFlag${firstUpperCamelName}InputDTO:{}", toJSONString(inputDTO));
        UpdateEnableFlag${firstUpperCamelName}Input inputDO = BeanMapper.map(inputDTO, UpdateEnableFlag${firstUpperCamelName}Input.class);
        inputDO.setEnabledFlag(MdmConst.YES_VALUE_ID);
        ${firstUpperCamelName}ResultOutput outputDO = ${camelName}Service.updateEnabledFlag${firstUpperCamelName}(inputDO);
        ${firstUpperCamelName}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${firstUpperCamelName}ResultOutputDTO.class);
        WINLOGGER.info("启用${table.name}接口出参：${firstUpperCamelName}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @Override
    @PostMapping(ApiPathConstants.DISABLE_${table.code})
    @ApiOperation(value = "停用${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0112_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-19", updatedAt = "2020-11-19", apiStatus = ApiStatus.IN_PROCESS)
    public WinRpcResponse<${firstUpperCamelName}ResultOutputDTO> disable${firstUpperCamelName}(@Validated @RequestBody ChangeEnabledFlag${firstUpperCamelName}InputDTO inputDTO) {
        WINLOGGER.info("停用${table.name}接口入参：ChangeEnabledFlag${firstUpperCamelName}InputDTO:{}", toJSONString(inputDTO));
        UpdateEnableFlag${firstUpperCamelName}Input inputDO = BeanMapper.map(inputDTO, UpdateEnableFlag${firstUpperCamelName}Input.class);
        inputDO.setEnabledFlag(MdmConst.NO_VALUE_ID);
        ${firstUpperCamelName}ResultOutput outputDO = ${camelName}Service.updateEnabledFlag${firstUpperCamelName}(inputDO);
        ${firstUpperCamelName}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${firstUpperCamelName}ResultOutputDTO.class);
        WINLOGGER.info("停用${table.name}接口出参：${firstUpperCamelName}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

}
    
    `
    return template
}