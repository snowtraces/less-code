const ge_repository = (table) => {
    let template = `package ${base_package}.${scope.SERVICE}.repository;

import ${base_package}.entity.${table.lowerName}.${table.camelNameUpper}PO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface ${table.camelNameUpper}Repository extends JpaRepository<${table.camelNameUpper}PO, Long> {
    /**
     * 根据${table.name}标识删除${table.name}
     *
     * @param ${table.camelPk} ${table.name}标识
     * @param modifiedAt           修改时间
     * @param hospitalSOID         医院soid
     */
    @Modifying
    @Transactional(rollbackFor = Exception.class)
    @Query("update ${table.camelNameUpper}PO a set a.isDel = 1 , a.modifiedAt = :modifiedAt where a.${table.camelPk} = :${table.camelPk} and a.isDel = 0 and a.hospitalSOID = :hospitalSOID")
    void deleteBy${table.camelPkUpper}(@Param("${table.camelPk}") Long ${table.camelPk}, @Param("modifiedAt") Date modifiedAt, @Param("hospitalSOID") Long hospitalSOID);

    /**
     * 根据主键查询${table.name}信息
     *
     * @param ${table.camelPk} ${table.name}标识
     * @param hospitalSOIDs        医院soid
     * @return ${table.name}信息
     */
    @Query(value = "select a from ${table.camelNameUpper}PO a  " +
            "  where a.${table.camelPk} = :${table.camelPk}" +
            " and a.hospitalSOID in :hospitalSOIDs " +
            " and a.isDel=0")
    ${table.camelNameUpper}PO findBy${table.camelPkUpper}(@Param("${table.camelPk}") Long ${table.camelPk}, @Param("hospitalSOIDs") Long[] hospitalSOIDs);

    /**
     * 修改${table.name}的启用状态
     *
     * @param ${table.camelPk} ${table.name}标识
     * @param enabledFlag   启用标志
     * @param modifiedAt    修改时间
     * @param hospitalSOIDs 医院信息标识集合
     */
    @Transactional(rollbackFor = Exception.class)
    @Modifying
    @Query(value = "update ${table.camelNameUpper}PO a set a.enabledFlag = :enabledFlag , a.modifiedAt =:modifiedAt " +
        " where a.${table.camelPk} = :${table.camelPk} " +
        " and a.hospitalSOID in :hospitalSOIDs ")
    void updateEnableFlag(@Param("${table.camelPk}") Long ${table.camelPk}, @Param("enabledFlag") Long enabledFlag, @Param("modifiedAt") Date modifiedAt, @Param("hospitalSOIDs") Long[] hospitalSOIDs);

    /**
     * TODO 查询最大排序序号
     *
     * @param hospitalSOIDs    医院soid
     * @param xxx ${table.name}代码
     * @return 序号
     */
    @Query(value = "select a.seqNo from ${table.camelNameUpper}PO a  " +
        "  where a.hospitalSOID in :hospitalSOIDs " +
        " and a.isDel=0 " +
        " and a.xxx = :xxx" +
        " order by a.seqNo desc ")
    List<Integer> findSeqNo(@Param("xxx") Long xxx, @Param("hospitalSOIDs") Long[] hospitalSOIDs);

}
    `
    return template
}