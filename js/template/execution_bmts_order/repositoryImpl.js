const ge_repositoryImpl = (table) => {
    let template = `package ${base_package}.persistence.repositories;

import com.winning.base.akso.utils.spring.BeanMapper;
import ${base_package}.common.valueobjects.${scope.RESOURCE}.${table.camelNameUpper}Vo;
import ${base_package}.domain.repositories.${table.camelNameUpper}Repository;
import ${base_package}.persistence.entity.${table.camelNameUpper};
import ${base_package}.persistence.repositories.jpa.${table.camelNameUpper}Jpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class ${table.camelNameUpper}RepositoryImpl implements ${table.camelNameUpper}Repository {

    @Autowired
    private ${table.camelNameUpper}Jpa ${table.camelName}Jpa;

    @Override
    public void save(${table.camelNameUpper}Vo vo) {
        ${table.camelNameUpper} ${table.camelName} = BeanMapper.map(vo, ${table.camelNameUpper}.class);
        ${table.camelName}Jpa.save(${table.camelName});
    }

    @Override
    public void deleteBy${table.camelPkUpper}(Long ${table.camelPk}, Date modifiedAt, Long hospitalSOID) {
        ${table.camelName}Jpa.deleteBy${table.camelPkUpper}(${table.camelPk}, modifiedAt, hospitalSOID);
    }

    @Override
    public ${table.camelNameUpper}Vo findBy${table.camelPkUpper}(Long ${table.camelPk}, Long[] hospitalSOIDs) {
        return ${table.camelName}Jpa.findById(${table.camelPk})
            .map(po -> BeanMapper.map(po, ${table.camelNameUpper}Vo.class))
            .orElse(null);
    }
}
    `
    return template
}