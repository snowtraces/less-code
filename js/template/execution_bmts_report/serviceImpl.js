const ge_serviceImpl = (table) => {
    let template = `package ${base_package}.domain.service.impl;

import com.winning.base.akso.duid.DuidAbility;
import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}QueryInputVo;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.domain.service.*;
import ${base_package}.dtos.${scope.RESOURCE}.${table.camelNameUpper}Dto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}DeleteInputDto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}InputDto;
import ${base_package}.dtos.${scope.RESOURCE}.input.${table.camelNameUpper}QueryInputDto;
import ${base_package}.dtos.output.MgtResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

${annotation}
@Service
public class ${table.camelNameUpper}ServiceImpl implements ${table.camelNameUpper}Service {

    @Autowired
    private DuidAbility duidAbility;

    @Autowired
    private ${table.camelNameUpper}DomainService ${table.camelName}DomainService;

    /**
     * 实体对应表名，用于生成uuid
     */
    private static final String ${table.code}_TABLE_NAME = "${table.code}";

    @Override
    public MgtResult save${table.camelNameUpper}(${table.camelNameUpper}InputDto inputDto) {
        ${table.camelNameUpper}Dto ${table.camelName}Dto = inputDto.get${table.camelNameUpper}Dto();
        if (${table.camelName}Dto.get${table.camelPkUpper}() == null) {
            inputDto.get${table.camelNameUpper}Dto().set${table.camelPkUpper}(duidAbility.getUID(${table.code}_TABLE_NAME));
        }
        try {
            String result = ${table.camelName}DomainService.save${table.camelNameUpper}(inputDto);
            return new MgtResult(true, result);
        } catch (Exception e) {
            return new MgtResult(false, e.getMessage());
        }
    }

    @Override
    public MgtResult delete${table.camelNameUpper}(${table.camelNameUpper}DeleteInputDto inputDto) {
        try {
            String result = ${table.camelName}DomainService.delete${table.camelNameUpper}(inputDto.getHospitalSOID(), inputDto.get${table.camelPkUpper}());
            return new MgtResult(true, result);
        } catch (Exception e) {
            return new MgtResult(false, e.getMessage());
        }
    }

    @Override
    public List<${table.camelNameUpper}Dto> query${table.camelNameUpper}ByExample(${table.camelNameUpper}QueryInputDto inputDto) {
        ${table.camelNameUpper}QueryInputVo vo = BeanMapper.map(inputDto, ${table.camelNameUpper}QueryInputVo.class, false);
        List<${table.camelNameUpper}Vo> voList = ${table.camelName}DomainService.query${table.camelNameUpper}(vo);
        return BeanMapper.mapList(voList, ${table.camelNameUpper}Vo.class, ${table.camelNameUpper}Dto.class);
    }

}
`
    return template
}