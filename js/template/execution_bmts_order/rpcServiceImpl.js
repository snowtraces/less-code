const ge_rpcServiceImpl = (table) => {
    let template = `package ${base_package}.rest;

import com.winning.base.akso.logging.core.WinLogger;
import com.winning.base.akso.logging.core.WinLoggerFactory;
import com.winning.base.akso.rpc.WinRpcResponse;
import com.winning.base.akso.swagger.info.ApiStatus;
import com.winning.base.akso.swagger.info.WinningApiInfo;
import ${base_package}.api.${table.camelNameUpper}RpcService;
import ${base_package}.constants.ExeOrdBtsApiPathConstant;
import ${base_package}.domain.service.${table.camelNameUpper}Service;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.input.${scope.RESOURCE}.${table.camelNameUpper}SaveInputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}QueryOutputDto;
import ${base_package}.dtos.output.${scope.RESOURCE}.${table.camelNameUpper}ResultOutputDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

${annotation}
@Api(tags = "${scope.RESOURCE}-${table.name}")
@RestController
public class ${table.camelNameUpper}RpcServiceImpl implements ${table.camelNameUpper}RpcService {

    private static final WinLogger WINLOGGER = WinLoggerFactory.getCurrentClassLogger();

    @Autowired
    private ${table.camelNameUpper}Service ${table.camelName}Service;

    @PostMapping(ExeOrdBtsApiPathConstant.SAVE_${table.code}_V1)
    @ApiOperation("保存${table.name}")
    @WinningApiInfo(id = ExeOrdBtsApiPathConstant.SAVE_${table.code}_V1_ID, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDto> save${table.camelNameUpper}(@Validated @RequestBody ${table.camelNameUpper}SaveInputDto inputDto) {
        ${table.camelNameUpper}ResultOutputDto outputDto = ${table.camelName}Service.save${table.camelNameUpper}(inputDto);
        return new WinRpcResponse<>(outputDto);
    }

    @PostMapping(ExeOrdBtsApiPathConstant.DELETE_${table.code}_V1)
    @ApiOperation("删除${table.name}")
    @WinningApiInfo(id = ExeOrdBtsApiPathConstant.DELETE_${table.code}_V1_ID, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<${table.camelNameUpper}ResultOutputDto> delete${table.camelNameUpper}(@Validated @RequestBody ${table.camelNameUpper}DeleteInputDto inputDto) {
        ${table.camelNameUpper}ResultOutputDto outputDto = ${table.camelName}Service.delete${table.camelNameUpper}(inputDto);
        return new WinRpcResponse<>(outputDto);
    }

    @PostMapping(ExeOrdBtsApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1)
    @ApiOperation("多条件查询${table.name}")
    @WinningApiInfo(id = ExeOrdBtsApiPathConstant.QUERY_${table.code}_BY_EXAMPLE_V1_ID, apiVersion = "v1", sinceVersion = "1.0.0", createdAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", updatedAt = "${$.dateFormat('YYYY-mm-dd', new Date())}", apiStatus = ApiStatus.IN_PROCESS)
    @Override
    public WinRpcResponse<List<${table.camelNameUpper}QueryOutputDto>> query${table.camelNameUpper}ByExample(@Validated @RequestBody ${table.camelNameUpper}QueryInputDto inputDto) {
        List<${table.camelNameUpper}QueryOutputDto> list = ${table.camelName}Service.query${table.camelNameUpper}ByExample(inputDto);
        return new WinRpcResponse<>(list);
    }

}
    
    `
    return template
}