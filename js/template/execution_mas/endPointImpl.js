const ge_endPointImpl = (table) => {
    let template = `package ${base_package}.${scope.RESOURCE}.rest;

import com.winning.base.akso.common.page.WinPagedList;
import com.winning.base.akso.logging.core.WinLogger;
import com.winning.base.akso.logging.core.WinLoggerFactory;
import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.swagger.info.ApiStatus;
import com.winning.base.akso.swagger.info.WinningApiInfo;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.api.constants.ApiPathConstants;
import ${base_package}.common.constants.MdmConst;
import ${base_package}.${scope.RESOURCE}.api.${table.camelNameUpper}RpcService;
import ${base_package}.${scope.RESOURCE}.dto.${table.lowerName}.*;
import ${base_package}.service.dto.${table.lowerName}.*;
import ${base_package}.service.service.${table.camelNameUpper}Service;
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

${annotation}
// TODO apiPath
@Api(tags = "${scope.RESOURCE}-${table.name}")
@RestController
public class ${table.camelNameUpper}EndPointImpl implements ${table.camelNameUpper}RpcService {

    private static final WinLogger WINLOGGER = WinLoggerFactory.getCurrentClassLogger();

    private ${table.camelNameUpper}Service ${table.camelName}Service;

    public ${table.camelNameUpper}EndPointImpl(${table.camelNameUpper}Service ${table.camelName}Service) {
        this.${table.camelName}Service = ${table.camelName}Service;
    }

    static {
        BeanMapper.registerMapperClassType(Query${table.camelNameUpper}InputDTO.class, Query${table.camelNameUpper}Input.class);
        BeanMapper.registerMapperClassType(Query${table.camelNameUpper}OutputDTO.class, Query${table.camelNameUpper}Output.class);
        BeanMapper.registerMapperClassType(Delete${table.camelNameUpper}InputDTO.class, Delete${table.camelNameUpper}Input.class);
        BeanMapper.registerMapperClassType(Save${table.camelNameUpper}InputDTO.class, Save${table.camelNameUpper}Input.class);
    }

    @PostMapping(ApiPathConstants.SAVE_${table.code})
    @ApiOperation("保存${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0083_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> save${table.camelNameUpper}(@Validated @RequestBody Save${table.camelNameUpper}InputDTO inputDTO) {
        WINLOGGER.info("保存${table.name}接口入参：Save${table.camelNameUpper}InputDTO:{}", toJSONString(inputDTO));
        Save${table.camelNameUpper}Input inputDO = BeanMapper.map(inputDTO, Save${table.camelNameUpper}Input.class);
        ${table.camelNameUpper}ResultOutput outputDO = ${table.camelName}Service.save${table.camelNameUpper}(inputDO);
        ${table.camelNameUpper}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${table.camelNameUpper}ResultOutputDTO.class);
        WINLOGGER.info("保存${table.name}接口出参：${table.camelNameUpper}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @PostMapping(ApiPathConstants.DELETE_${table.code})
    @ApiOperation("删除${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0084_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> delete${table.camelNameUpper}(@Validated @RequestBody Delete${table.camelNameUpper}InputDTO inputDTO) {
        WINLOGGER.info("删除${table.name}接口入参：Delete${table.camelNameUpper}InputDTO:{}", toJSONString(inputDTO));
        Delete${table.camelNameUpper}Input inputDO = BeanMapper.map(inputDTO, Delete${table.camelNameUpper}Input.class);
        ${table.camelNameUpper}ResultOutput outputDO = ${table.camelName}Service.delete${table.camelNameUpper}(inputDO);
        ${table.camelNameUpper}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${table.camelNameUpper}ResultOutputDTO.class);
        WINLOGGER.info("删除${table.name}接口出参：${table.camelNameUpper}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @PostMapping(ApiPathConstants.QUERY_${table.code}_BY_EXAMPLE)
    @ApiOperation("多条件查询${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0085_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-03", updatedAt = "2020-11-03", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<List<Query${table.camelNameUpper}OutputDTO>> query${table.camelNameUpper}ByExample(@Validated @RequestBody Query${table.camelNameUpper}InputDTO inputDTO) {
        WINLOGGER.info("多条件查询${table.name}接口入参：Query${table.camelNameUpper}InputDTO:{}", toJSONString(inputDTO));
        Long count = 0L;
        List<Query${table.camelNameUpper}OutputDTO> list = new ArrayList<>();
        Query${table.camelNameUpper}Input inputDO = BeanMapper.map(inputDTO, Query${table.camelNameUpper}Input.class);
        WinPagedList<Query${table.camelNameUpper}Output> winPagedList = ${table.camelName}Service.query${table.camelNameUpper}ByExample(inputDO);
        if (ListUtil.isNotEmpty(winPagedList.getData())) {
            list = BeanMapper.mapList(winPagedList.getData(), Query${table.camelNameUpper}Output.class, Query${table.camelNameUpper}OutputDTO.class);
            count = winPagedList.getCount();
        }
        WINLOGGER.info("多条件查询${table.name}接口出参：Query${table.camelNameUpper}OutputDTO:{}", toJSONString(list));
        return new WinRpcResponse<>(list, count);
    }

    @Override
    @PostMapping(ApiPathConstants.ENABLE_${table.code})
    @ApiOperation(value = "启用${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0111_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-19", updatedAt = "2020-11-19", apiStatus = ApiStatus.IN_PROCESS)
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> enable${table.camelNameUpper}(@Validated @RequestBody ChangeEnabledFlag${table.camelNameUpper}InputDTO inputDTO) {
        WINLOGGER.info("启用${table.name}接口入参：ChangeEnabledFlag${table.camelNameUpper}InputDTO:{}", toJSONString(inputDTO));
        UpdateEnableFlag${table.camelNameUpper}Input inputDO = BeanMapper.map(inputDTO, UpdateEnableFlag${table.camelNameUpper}Input.class);
        inputDO.setEnabledFlag(MdmConst.YES_VALUE_ID);
        ${table.camelNameUpper}ResultOutput outputDO = ${table.camelName}Service.updateEnabledFlag${table.camelNameUpper}(inputDO);
        ${table.camelNameUpper}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${table.camelNameUpper}ResultOutputDTO.class);
        WINLOGGER.info("启用${table.name}接口出参：${table.camelNameUpper}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

    @Override
    @PostMapping(ApiPathConstants.DISABLE_${table.code})
    @ApiOperation(value = "停用${table.name}")
    @WinningApiInfo(id = ApiPathConstants.API_ID_1130_0112_01, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "2020-11-19", updatedAt = "2020-11-19", apiStatus = ApiStatus.IN_PROCESS)
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDTO> disable${table.camelNameUpper}(@Validated @RequestBody ChangeEnabledFlag${table.camelNameUpper}InputDTO inputDTO) {
        WINLOGGER.info("停用${table.name}接口入参：ChangeEnabledFlag${table.camelNameUpper}InputDTO:{}", toJSONString(inputDTO));
        UpdateEnableFlag${table.camelNameUpper}Input inputDO = BeanMapper.map(inputDTO, UpdateEnableFlag${table.camelNameUpper}Input.class);
        inputDO.setEnabledFlag(MdmConst.NO_VALUE_ID);
        ${table.camelNameUpper}ResultOutput outputDO = ${table.camelName}Service.updateEnabledFlag${table.camelNameUpper}(inputDO);
        ${table.camelNameUpper}ResultOutputDTO outputDTO = BeanMapper.map(outputDO, ${table.camelNameUpper}ResultOutputDTO.class);
        WINLOGGER.info("停用${table.name}接口出参：${table.camelNameUpper}ResultOutputDTO:{}", toJSONString(outputDTO));
        return new WinRpcResponse<>(outputDTO);
    }

}
    
    `
    return template
}