const ge_rpcServiceImpl = (table) => {
    let template = `package ${base_package}.rest;

import com.alibaba.fastjson.JSON;
import com.winning.base.akso.logging.core.WinLogger;
import com.winning.base.akso.logging.core.WinLoggerFactory;
import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.rpc.rest.annotation.WinPostMapping;
import com.winning.base.akso.swagger.info.ApiStatus;
import com.winning.base.akso.swagger.info.WinningApiInfo;
import ${base_package}.api.${table.camelNameUpper}RpcService;
import ${base_package}.common.constants.ErrorConstant;
import ${base_package}.constants.ApiPathConstant;
import ${base_package}.domain.service.${table.camelNameUpper}Service;
import ${base_package}.dtos.criticalvalue.${table.camelNameUpper}Dto;
import ${base_package}.dtos.criticalvalue.input.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.criticalvalue.input.${table.camelNameUpper}InputDto;
import ${base_package}.dtos.criticalvalue.input.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.output.MgtResult;
import com.winning.pts.exception.WinningRuntimeException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

${annotation}
@RestController
@Api(value = "执行域接口", tags = {"${table.name}管理"})
public class ${table.camelNameUpper}RpcServiceImpl implements ${table.camelNameUpper}RpcService {

    private static WinLogger log = WinLoggerFactory.getCurrentClassLogger();

    @Autowired
    private ${table.camelNameUpper}Service ${table.camelName}Service;

    @Override
    @WinningApiInfo(id =  ApiPathConstant.SAVE_${table.code}_V1_ID,
        apiVersion = "v1",
        sinceVersion = "1.0.0",
        createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        apiStatus = ApiStatus.DONE)
    @ApiOperation(nickname =  ApiPathConstant.SAVE_${table.code}_V1_ID, value = "保存${table.name}", notes = "该接口用于${table.name} ")
    @ApiResponses({
        @ApiResponse(code = 400, message = "请检查请求参数。"),
        @ApiResponse(code = 404, message = "请求地址不存在。")
    })
    @WinPostMapping(value = ApiPathConstant.SAVE_${table.code}_V1)
    public WinRpcResponse<MgtResult> save${table.camelNameUpper}(@RequestBody ${table.camelNameUpper}InputDto inputDto) {
        log.info("保存${table.name}接口inputParam：{}", JSON.toJSONStringWithDateFormat(inputDto, JSON.DEFFAULT_DATE_FORMAT));
        MgtResult result = ${table.camelName}Service.save${table.camelNameUpper}(inputDto);
        if (result.isMgtSuccess()) {
            return new WinRpcResponse<>(result);
        } else {
            return new WinRpcResponse<>(
                new WinningRuntimeException(ErrorConstant.EXECUTION_INSERT_ERROR_CODE, result.getResultStr()));
        }
    }

    @Override
    @WinningApiInfo(id = ApiPathConstant.DELETE_${table.code}_V1_ID,
        apiVersion = "v1",
        sinceVersion = "1.0.0",
        createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        apiStatus = ApiStatus.DONE)
    @ApiOperation(nickname = ApiPathConstant.DELETE_${table.code}_V1_ID, value = "删除${table.name}", notes = "按id删除${table.name}")
    @ApiResponses({
        @ApiResponse(code = 400, message = "请检查请求参数。"),
        @ApiResponse(code = 404, message = "请求地址不存在。")
    })
    @WinPostMapping(value = ApiPathConstant.DELETE_${table.code}_V1)
    public WinRpcResponse<MgtResult> delete${table.camelNameUpper}(@RequestBody ${table.camelNameUpper}DeleteInputDto inputDto) {
        log.info("删除${table.name}接口inputParam：{}", JSON.toJSONStringWithDateFormat(inputDto, JSON.DEFFAULT_DATE_FORMAT));
        MgtResult result = ${table.camelName}Service.delete${table.camelNameUpper}(inputDto);
        if (result.isMgtSuccess()) {
            return new WinRpcResponse<>(result);
        } else {
            return new WinRpcResponse<>(
                new WinningRuntimeException(ErrorConstant.EXECUTION_INSERT_ERROR_CODE, result.getResultStr()));
        }
    }

    @Override
    @WinningApiInfo(id = ApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1_ID,
        apiVersion = "v1",
        sinceVersion = "1.0.1",
        createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}",
        apiStatus = ApiStatus.DONE)
    @ApiOperation(nickname = ApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1_ID, value = "查询${table.name}", notes = "多条件查询${table.name}")
    @ApiResponses({
        @ApiResponse(code = 400, message = "请检查请求参数。"),
        @ApiResponse(code = 404, message = "请求地址不存在。")
    })
    @WinPostMapping(value = ApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1)
    public WinRpcResponse<List<${table.camelNameUpper}Dto>> query${table.camelNameUpper}ByExample(@RequestBody ${table.camelNameUpper}QueryInputDto inputDto) {
        log.info("查询${table.name}入参inputParam：{}", JSON.toJSONString(inputDto));
        List<${table.camelNameUpper}Dto> out;
        try {
            out = ${table.camelName}Service.query${table.camelNameUpper}ByExample(inputDto);
        } catch (WinningRuntimeException ex) {
            return new WinRpcResponse<>(ex);
        }
        return new WinRpcResponse<>(out);
    }
}
`
    return template
}